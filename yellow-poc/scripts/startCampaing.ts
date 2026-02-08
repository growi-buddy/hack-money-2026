/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createECDSAMessageSigner,
  createCreateChannelMessage,
  createResizeChannelMessage,
  createGetChannelsMessage, State
} from '@erc7824/nitrolite';
import 'dotenv/config';
import { UserSession, fetchConfig } from "@/scripts/userSession";
import { Hex } from "viem";
import { YTEST_USD_FOR_SEPOLIA, chain } from "@/config/constants";

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY env var required");
const mainUserSigner = createECDSAMessageSigner(PRIVATE_KEY);
const config = await fetchConfig(mainUserSigner);
export async function startCampaing(amountToFund: bigint) {

  const growi = new UserSession('Growi', PRIVATE_KEY, config);
  await growi.authenticate(amountToFund);
  const TOKEN_ADDRESS = YTEST_USD_FOR_SEPOLIA;
  const l1Balance = await growi.getOnChainBalanceL1(TOKEN_ADDRESS);
  if (l1Balance > 0n) {// Note: In a real app we would wait for 12 blocks. Here we just submit.
    try {
      const txHash = await growi.client.deposit(TOKEN_ADDRESS, amountToFund);
      console.log(`[Growi] Deposit Tx Submitted: ${txHash} (Might take time to index)`);
    } catch (e: any) {
      throw new Error("Error could not deposit", e);
      console.error(`[Growi] Deposit Failed (likely gas/allowance):`, e.message);
    }
  } else {
    throw new Error("There is no money in the Growi Scrow  No L1 Funds");
  }

  // Check if WS is still alive, if not reconnect
  if (growi.ws.readyState > 1) {
    console.log(`[Growi] WS connection lost (State: ${growi.ws.readyState}), reconnecting...`);
    growi.reconnect();
    await growi.authenticate(amountToFund);
  }

  const ws = growi.ws;
  console.log(`[Growi] WS State: ${ws.readyState} (1=OPEN)`);

  const sessionSigner = growi.sessionSigner;
  return new Promise<{ yellowChannelId: string, success: boolean, error: string | null }>((resolve, reject) => { // ARREGLANDO RETURN - tipo de retorno correcto
    let createdChannelId = "";
    let isCreatingChannel = false;

    ws.on('close', (code, reason) => {
      console.log(`[Growi] WS Closed: ${code} ${reason}`);
    });
    ws.on('error', (err) => {
      console.error(`[Growi] WS Error:`, err);
      reject(err);
    });

    ws.on('message', async (data) => {
      const msg = JSON.parse(data.toString());
      console.log(`[Growi] DATA`, data);
      const type = msg.res ? msg.res[1] : '';
      console.log(`[Growi] Received Msg Type: ${type}`);
      if (type === 'error') {
        console.error('[Growi] Received Error:', JSON.stringify(msg.res[2], null, 2));
        resolve({
          yellowChannelId: createdChannelId,
          success: false,
          error: JSON.stringify(msg.res[2])
        });
      }
      if (type === 'channels' || type === 'get_channels') {
        if (isCreatingChannel) return;
        isCreatingChannel = true;

        const token = YTEST_USD_FOR_SEPOLIA; // ytest.usd

        // Check if an open channel exists
        const channels = msg.res[2].channels || [];
        const existingOpenChannel = channels.find((c: any) => c.status === 'open' && c.token.toLowerCase() === token.toLowerCase());

        if (existingOpenChannel) {
          createdChannelId = existingOpenChannel.channel_id;
          console.log(`[Growi] Found existing open channel: ${createdChannelId}`);

          // Get broker address from channel data
          const channelData = await growi.client.getChannelData(createdChannelId as Hex);
          const participants = channelData.channel.participants;
          // Broker is the participant that is NOT the user
          const brokerAddress = participants.find((p: string) => p.toLowerCase() !== growi.account.address.toLowerCase());

          if (!brokerAddress) throw new Error("Could not find broker address in channel participants");

          console.log(`[Growi] Derived Broker Address: ${brokerAddress}`);
          console.log('[Growi] Proceeding to fund unified balance (Custody -> Channel -> Broker)...');

          await triggerResize(growi, createdChannelId, amountToFund, false, brokerAddress);
        } else {
          console.log(`[growi] Creating new channel...`);
          const createMsg = await createCreateChannelMessage(sessionSigner, { chain_id: chain.id, token });
          ws.send(createMsg);
        }
      }
      // Handle Create Channel
      if (type === 'create_channel') {
        const { channel_id, channel, state, server_signature } = msg.res[2];
        createdChannelId = channel_id;
        console.log('\n🆔 ========== CHANNEL CREATED ==========');
        console.log('Channel ID:', createdChannelId);
        console.log('=========================================\n');
        console.log(`[Growi] Channel prepared: ${channel_id} (Ver: ${state.version})`);
        const unsignedInitialState = {
          intent: state.intent,
          version: BigInt(state.version),
          data: state.state_data,
          allocations: state.allocations.map((a: any) => ({
            destination: a.destination, token: a.token, amount: BigInt(0)
          })),
        };
        const res = await growi.client.createChannel({ channel, unsignedInitialState, serverSignature: server_signature });
        const txHash = typeof res === 'string' ? res : res.txHash;
        console.log(`[growi] Channel created on-chain: ${txHash}`);

        const participants = channel.participants;
        const brokerAddress = participants.find((p: string) => p.toLowerCase() !== growi.account.address.toLowerCase());

        if (!brokerAddress) throw new Error("Could not find broker address in channel participants");

        console.log(`[Growi] Derived Broker Address: ${brokerAddress}`);

        await triggerResize(growi, channel_id, amountToFund, false, brokerAddress);
      }

      // Handle Resize
      if (type === 'resize_channel') {
        const { channel_id, state, server_signature } = msg.res[2];
        console.log(`[growi] Resizing channel...`);
        const resizeState = {
          intent: state.intent,
          version: BigInt(state.version),
          data: state.state_data || state.data,
          allocations: state.allocations.map((a: any) => ({
            destination: a.destination, token: a.token, amount: BigInt(a.amount || 0),
          })),
          channelId: channel_id,
          serverSignature: server_signature,
        };
        console.log(`[growi] Skipping intermediate on-chain resize (Optimistic)`);
        const previousState = await growi.client.getChannelData(channel_id as Hex);
        console.log({
          previousState,
        })
        const resize = await growi.client.resizeChannel({ resizeState, proofStates: [previousState.lastValidState as State] });
        console.log(`Resize successful!`);
        console.log(`   Resize channel tx hash: ${resize.txHash}`);

        resolve({
          yellowChannelId: createdChannelId,
          success: true,
          error: null
        });
      }

    });
    createGetChannelsMessage(growi.sessionSigner, growi.account.address)
      .then(m => {
        console.log('[Growi] Sending GetChannels message...');
        if (ws.readyState === 1) { // OPEN
          ws.send(m);
        } else {
          console.error(`[Growi] WS Not Open (State: ${ws.readyState}). Unable to send.`);
          reject(new Error("WebSocket not open"));
        }
      })
      .catch(err => {
        console.error('[growi] createGetChannelsMessage failed:', err);
        reject(err);
      });
  });
}

async function triggerResize(growi: UserSession, channelId: string, amount: bigint, skip: boolean, brokerAddress?: string) {
  if (skip) return;
  console.log('[Growi] Waiting 25s for Node to index new channel...');
  await new Promise(r => setTimeout(r, 25000));

  const destination = brokerAddress || growi.account.address;
  console.log(`[Growi] Allocating funds to: ${destination}`);

  const msg = await createResizeChannelMessage(growi.sessionSigner, {
    channel_id: channelId as `0x${string}`,
    resize_amount: amount, // Moves units from Custody Contract -> Channel
    allocate_amount: amount, // Allocates units within channel to destination
    funds_destination: destination as `0x${string}`,
  });
  growi.ws.send(msg);
}

async function main() {
  const result = await startCampaing(2n); // ⚠️ FALTA el await aquí!

  console.log('\n========== FINAL RESULT ==========');
  console.log('Channel ID:', result.yellowChannelId);
  console.log('Success:', result.success);
  console.log('==================================\n');

  process.exit(0);
}

main().catch(console.error);