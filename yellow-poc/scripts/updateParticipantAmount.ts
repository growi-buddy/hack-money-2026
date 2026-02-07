import {
  createECDSAMessageSigner,
  createSubmitAppStateMessage,
  RPCAppSessionAllocation,
  RPCAppStateIntent
} from "@erc7824/nitrolite";
import {Client} from "yellow-ts";
import {createWalletClient, http} from "viem";
import {mnemonicToAccount} from "viem/accounts";
import {authenticateWallet} from "@/lib/auth";
import {chain} from "@/config/constants";
import 'dotenv/config';

export async function updateParticipantAmount(  appSessionId: `0x${string}`,
                                                currentVersion: number,
                                                allocations: RPCAppSessionAllocation[]){
  try {
    const yellow = new Client({
      url: 'wss://clearnet-sandbox.yellow.com/ws',
    });
    await yellow.connect();
    console.log('🔌 Connected to Yellow clearnet sandbox');

    const walletClient = createWalletClient({
      account: mnemonicToAccount(process.env.WALLET_2_SEED_PHRASE as string),
      chain: chain,
      transport: http(),
    });
    const sessionKey = await authenticateWallet(yellow, walletClient);
    const messageSigner = createECDSAMessageSigner(sessionKey.privateKey);
    const partnerAddress = walletClient.account?.address as `0x${string}`;
    console.log('👛 Partner (Wallet):', partnerAddress);

    const stateUpdateMessage = await createSubmitAppStateMessage(messageSigner, {
      app_session_id: appSessionId,
      intent: RPCAppStateIntent.Operate,
      version: currentVersion,
      allocations: allocations,
      session_data: JSON.stringify({
        timestamp: Date.now(),
        action: "redistribute_funds"
      })
    });
    const response = await yellow.sendMessage(stateUpdateMessage);

    console.log('State updated!', response);

    if (response.method === 'error') {
      throw new Error(`State update failed: ${response.params.error}`);
    }
    await yellow.disconnect();

    return {
      appSessionId: response.params.app_session_id,
      version: response.params.version,
      status: response.params.status,
      success: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to redistribute funds: ${errorMessage}`);
  }
}