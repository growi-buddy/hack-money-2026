// crea la session con todas las wallets necesarias
import {UserSession, Config, publicClient, fetchConfig} from "@/scripts/userSession";
import {
  createAppSessionMessage,
  createECDSAMessageSigner,
  RPCAppDefinition,
  RPCAppSessionAllocation, RPCProtocolVersion
} from "@erc7824/nitrolite";
import {ASSET, YELLOW_NETWORK_TESNET_URL} from "@/config/constants";
import {Client} from "yellow-ts";
import 'dotenv/config';

//pasar todas las wallets incluyendo las del user que paga, el mismo siempre en el indice 0
export async function startSession(influencers: `0x${string}`[], amount: string) {
  try {
    const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
    if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY env var required");
    const mainUserSigner = createECDSAMessageSigner(PRIVATE_KEY);
    const config = await fetchConfig(mainUserSigner);
    const growi = new UserSession('Growi', PRIVATE_KEY, config);
    await growi.authenticate(amount);
    const yellow = new Client({
      url: YELLOW_NETWORK_TESNET_URL,
    });
    await yellow.connect();
    console.log('Connected to Yellow clearnet sandbox');
    const weights: number[] = []
    for (let i = 0; i < influencers.length; i++) {
      if (i == 0) {
        weights.push(100);
      }
      weights.push(0);
    }
    const appDefinition: RPCAppDefinition = {
      protocol: RPCProtocolVersion.NitroRPC_0_4,
      participants: influencers,
      weights: weights,
      quorum: 100,
      challenge: 0,
      nonce: Date.now(),
      application: 'Test app',
    };

    const allocations: RPCAppSessionAllocation[] = [];
    let influencer: RPCAppSessionAllocation;
    for (let i = 0; i < influencers.length; i++) {
      if (i === 0) {
        allocations.push({
          participant: influencers[i],
          asset: ASSET,
          amount: amount
        });
      } else {
        allocations.push({
          participant: influencers[i],
          asset: ASSET,
          amount: '0'
        });
      }
    }

    console.log('Creating app session (using Wallet 0 as primary)...');
    const sessionMessage = await createAppSessionMessage(
      growi.sessionSigner,
      {definition: appDefinition, allocations}
    );
    const sessionResponse = await yellow.sendMessage(sessionMessage);
    console.log('Session message sent');
    console.log('Session response:', sessionResponse);

    if (sessionResponse.method === 'error') {
      console.error('Error creating session:', sessionResponse.params.error);
      process.exit(1);
    }
    if (!sessionResponse.params?.appSessionId) {
      console.error('No appSessionId in response');
      console.log('Full response:', JSON.stringify(sessionResponse, null, 2));
      process.exit(1);
    }
    console.log('Session created! ID:', sessionResponse.params.appSessionId);

    return {
      appSessionId: sessionResponse.params.appSessionId,
      success: true,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Something wrong: ${errorMessage}`);
  }
}