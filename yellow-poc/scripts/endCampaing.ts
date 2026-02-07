import {createCloseAppSessionMessage, createECDSAMessageSigner, RPCAppSessionAllocation} from "@erc7824/nitrolite";
import {Client} from "yellow-ts";
import {createWalletClient, http} from "viem";
import {mnemonicToAccount} from "viem/accounts";
import {chain, YELLOW_NETWORK_TESNET_URL} from "@/config/constants";
import {authenticateWallet} from "@/lib/auth";
import 'dotenv/config';


export async function endCampaing(appSessionId: `0x${string}`,
                                  finalAllocations: RPCAppSessionAllocation[],
                                  sessionData?: string){

  try {
    const yellow = new Client({
      url: YELLOW_NETWORK_TESNET_URL,
    });
    await yellow.connect();
    console.log('Connected to Yellow clearnet sandbox');
    const walletClient = createWalletClient({
      account: mnemonicToAccount(process.env.WALLET_2_SEED_PHRASE as string),
      chain: chain,
      transport: http(),
    });
    const sessionKey = await authenticateWallet(yellow, walletClient);
    const messageSigner = createECDSAMessageSigner(sessionKey.privateKey);
    const partnerAddress = walletClient.account?.address as `0x${string}`;
    console.log('Partner (Wallet):', partnerAddress);
    console.log('Creating close session message...');
    const closeMessage = await createCloseAppSessionMessage(
      messageSigner, // La primera firma (puede ser cualquier participante)
      {
        app_session_id: appSessionId,
        allocations: finalAllocations,
        session_data: sessionData || JSON.stringify({
          closed_at: Date.now(),
          reason: "session_completed"
        })
      }
    );
    const response = await yellow.sendMessage(closeMessage);

    if (response.method === 'error') {
      throw new Error(`Close session failed: ${response.params.error}`);
    }

    console.log('Session closed successfully!');
    console.log('Response:', response);

    await yellow.disconnect();

    return {
      appSessionId: response.params.app_session_id,
      status: response.params.status,
      version: response.params.version,
      success: true
    };
  }catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to redistribute funds: ${errorMessage}`);
  }
}