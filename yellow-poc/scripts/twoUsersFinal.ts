import { Client } from "yellow-ts";
import { authenticateWallet } from "@/lib/auth";
import {
  createAppSessionMessage,
  createCloseAppSessionMessage,
  createECDSAMessageSigner,
  createSubmitAppStateMessage,
  RPCAppDefinition,
  RPCAppSessionAllocation,
  RPCData, RPCProtocolVersion,
  RPCResponse
} from "@erc7824/nitrolite";
import { createWalletClient, http, WalletClient } from "viem";
import { sepolia } from "viem/chains";
import { mnemonicToAccount } from "viem/accounts";

export async function main() {

  // ============================================================================
  // STEP 1: Connect to Yellow Network
  // ============================================================================
  // Establish WebSocket connection to the Yellow clearnet endpoint
  const yellow = new Client({
    url: 'wss://clearnet-sandbox.yellow.com/ws',
  });
  await yellow.connect();
  console.log('🔌 Connected to Yellow clearnet sandbox');

  // ============================================================================
  // STEP 2: Set Up Both Participants' Wallets
  // ============================================================================
  // Create wallet clients for both participants from their seed phrases
  // In a real application, each participant would control their own wallet
  const walletClient = createWalletClient({
    account: mnemonicToAccount(process.env.SEED_PHRASE as string),
    chain: sepolia,
    transport: http(),
  });
  const wallet2Client = createWalletClient({
    account: mnemonicToAccount(process.env.WALLET_2_SEED_PHRASE as string),
    chain: sepolia,
    transport: http(),
  });

  // ============================================================================
  // STEP 3: Authenticate Both Participants
  // ============================================================================
  // Each participant must authenticate to create a session key for signing messages
  const sessionKey = await authenticateWallet(yellow, walletClient as WalletClient);
  const messageSigner = createECDSAMessageSigner(sessionKey.privateKey);
  const sessionKey2 = await authenticateWallet(yellow, wallet2Client);
  const messageSigner2 = createECDSAMessageSigner(sessionKey2.privateKey);
  // Extract participant addresses for use in app definition
  const userAddress = walletClient.account?.address as `0x${string}`;
  const partnerAddress = wallet2Client.account?.address as `0x${string}`;
  console.log('👛 User (Wallet 1):', userAddress);
  console.log('👛 Partner (Wallet 2):', partnerAddress);

  // ============================================================================
  // STEP 4: Define Application Configuration
  // ============================================================================
  // The app definition specifies:
  // - participants: Array of participant addresses
  // - weights: Voting weights for each participant (50/50 here)
  // - quorum: Percentage required for decisions (100 = unanimous)
  // - challenge: Challenge period in seconds (0 = no challenge period)
  // - nonce: Unique identifier for this app instance
  const appDefinition: RPCAppDefinition = {
    protocol: RPCProtocolVersion.NitroRPC_0_4,
    participants: [partnerAddress, userAddress],
    weights: [50, 50],
    quorum: 100,
    challenge: 0,
    nonce: Date.now(),
    application: 'Test app',
  };

  // ============================================================================
  // STEP 5: Set Initial Allocations
  // ============================================================================
  // Define how much of each asset each participant starts with
  // In this example: userAddress gets 0.01 USDC, partnerAddress gets 0
  const allocations = [
    { participant: partnerAddress, asset: 'ytest.usd', amount: '0.01' }, // ← Wallet 2
    { participant: userAddress, asset: 'ytest.usd', amount: '0.00' }     // ← Wallet 1
  ] as RPCAppSessionAllocation[];

  // ============================================================================
  // STEP 6: Create and Submit App Session
  // ============================================================================
  // Create the session message signed by the first participant
  // Una app session message ss el mensaje que dice:
  // "Arranquemos esta app entre estas wallets, con estos balances iniciales y estas reglas."
  console.log('📝 Creating app session (using Wallet 2 as primary)...');
  const sessionMessage = await createAppSessionMessage(
    messageSigner2, // ← Usar Wallet 2
    { definition: appDefinition, allocations }
  );
  // Submit the session creation request to Yellow
  const sessionResponse = await yellow.sendMessage(sessionMessage);
  console.log('✅ Session message sent');
  console.log('🆔 Session response:', sessionResponse);
  if (sessionResponse.method === 'error') {
    console.error('❌ Error creating session:', sessionResponse.params.error);
    process.exit(1);
  }
  if (!sessionResponse.params?.appSessionId) {
    console.error('❌ No appSessionId in response');
    console.log('Full response:', JSON.stringify(sessionResponse, null, 2));
    process.exit(1);
  }
  console.log('✅ Session created! ID:', sessionResponse.params.appSessionId);

  // ============================================================================
  // STEP 7: Update Session State (Transfer Between Participants)
  // ============================================================================
  // Create new allocations that represent a state change
  // Here we're transferring the full 0.01 USDC from user to partner
  // This demonstrates off-chain state updates without on-chain transactions
  const finalAllocations = [
    { participant: partnerAddress, asset: 'ytest.usd', amount: '0.00' }, // ← Wallet 2 se queda en 0
    { participant: userAddress, asset: 'ytest.usd', amount: '0.01' }     // ← Wallet 1 recibe
  ] as RPCAppSessionAllocation[];
  console.log('📊 Submitting state update (transfer from Wallet 2 to Wallet 1)...');
  // Submit the updated state to Yellow
  const submitAppStateMessage = await createSubmitAppStateMessage(
    messageSigner2, // ← Usar Wallet 2
    {
      app_session_id: sessionResponse.params.appSessionId,
      allocations: finalAllocations,
      version: 2
    },

  );
  const submitAppStateMessageJson = JSON.parse(submitAppStateMessage);
  console.log('📊 Submit app state message:', submitAppStateMessageJson);
  //await yellow.sendMessage(JSON.stringify(submitAppStateMessageJson)) // esto es necesario? A PARTIR DE ACA
  //ENVIAMOS EL MENSAJE PARA EL CAMBIO DE ESTADO, QUE DEBE SER FIRMADO POR LA OTRA WALLET IGUALMENTE
  //PASO OMITIDO EN EL EJEMPLO DE GITHUB
  const signedSubmitAppStateMessageJson = await messageSigner(
    submitAppStateMessageJson.req as RPCData
  );
  submitAppStateMessageJson.sig.push(signedSubmitAppStateMessageJson);
  const submitResponse = await yellow.sendMessage(JSON.stringify(submitAppStateMessageJson));
  if (submitResponse.method === 'error') {
    console.error('❌ Falló', submitResponse.params.error);
  } else {
    console.log('✅ Éxito - la transferencia se ejecutó', submitResponse.params.appSessionId);
  }

  // ============================================================================
  // STEP 8: Close Session with Multi-Party Signatures
  // ============================================================================
  // Create the close session message (signed by first participant)
  console.log('🔒 Closing session...');
  const closeSessionMessage = await createCloseAppSessionMessage(
    messageSigner2,
    {
      app_session_id: sessionResponse.params.appSessionId,
      allocations: finalAllocations,
    }
  );
  // Parse the message to add additional signatures
  const closeSessionMessageJson = JSON.parse(closeSessionMessage);

  // Wallet 1 firma como segundo participante
  // ============================================================================
  // STEP 9: Collect Second Participant's Signature
  // ============================================================================
  // In a multi-party session, all participants must sign the close message
  // Here we're signing with the second participant's session key
  const signedCloseSessionMessageSignature1 = await messageSigner(
    closeSessionMessageJson.req as RPCData
  );
  console.log('✍️ Wallet 1 signed close message');
  // Add the second signature to the message
  // Both signatures are required because quorum is 100%
  closeSessionMessageJson.sig.push(signedCloseSessionMessageSignature1);
  const queryMessage = JSON.stringify({
    req: [Date.now(), 'get_app_sessions', { app_session_id: sessionResponse.params.appSessionId }, Date.now()],
    sig: []
  });
  const queryResponse = await yellow.sendMessage(queryMessage);
  console.log('🔍 QUERY RESPONSE:');
  console.log(JSON.stringify(queryResponse, null, 2));
  // Esto te mostrará los balances actuales de cada participante

  // ============================================================================
  // STEP 10: Submit Close Request
  // ============================================================================
  // Send the fully-signed close message to finalize the session
  const closeSessionResponse = await yellow.sendMessage(
    JSON.stringify(closeSessionMessageJson)
  );

  if (closeSessionResponse.method === 'error') {
    console.error('❌ Error closing session:', closeSessionResponse.params.error);
  } else {
    console.log('Session closed successfully!');
    console.log('Final state:', closeSessionResponse);
  }

  await yellow.disconnect();
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Error:', error.message || error);
  process.exitCode = 1;
});