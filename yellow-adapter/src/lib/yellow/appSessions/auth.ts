/**
 * Yellow Network Authentication
 * Usa el SDK de @erc7824/nitrolite para autenticación correcta
 * Docs: https://docs.yellow.org/docs/protocol/off-chain/authentication
 */

import { PrivateKeyAccount } from 'viem';
import WebSocket from 'ws';
import { createAuthRequestMessage, createAuthVerifyMessageFromChallenge } from '@erc7824/nitrolite';

/**
 * Autentica con Yellow Network usando el main wallet
 * 
 * Flow:
 * 1. auth_request - Envía dirección del wallet (SDK genera el mensaje correcto)
 * 2. Recibe challenge del servidor
 * 3. auth_verify - Firma challenge y envía (SDK genera el mensaje correcto)
 * 4. Retorna el wallet autenticado para firmar mensajes
 */
export async function authenticateWithYellow(
  ws: WebSocket,
  mainWallet: PrivateKeyAccount,
  messageHandlers: Map<number | string, (response: unknown) => void>
): Promise<PrivateKeyAccount> {
  console.log('[Auth] 🔐 Starting authentication...');
  console.log('[Auth] Main wallet:', mainWallet.address);

  // Generar session key
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { privateKeyToAccount, generatePrivateKey } = require('viem/accounts');
  const sessionKeyPk = generatePrivateKey();
  const sessionKey = privateKeyToAccount(sessionKeyPk) as PrivateKeyAccount;
  console.log('[Auth] Generated session key:', sessionKey.address);

  // Step 1: Crear mensaje de auth_request usando el SDK v0.4.0
  console.log('[Auth] Creating auth_request with SDK v0.4.0...');
  
  // MessageSigner para firmar los mensajes con session key
  const requestMessageSigner = async (payload: unknown) => {
    console.log('[Auth] Signing auth_request payload...');
    const payloadString = JSON.stringify(payload);
    return await sessionKey.signMessage({ message: payloadString });
  };
  
  // API v0.4.0: primer argumento es el objeto completo, segundo es messageSigner
  const authRequestMessage = await createAuthRequestMessage({
    address: mainWallet.address,
    session_key: sessionKey.address,
    application: 'growi-campaign-manager',
    expires_at: (Math.floor(Date.now() / 1000) + 86400).toString(),
    scope: 'console',
    allowances: [],
    messageSigner: requestMessageSigner
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  
  console.log('[Auth] Auth request message created');
  console.log('[Auth] Message preview:', authRequestMessage.substring(0, 200) + '...');

  const authRequestParsed = JSON.parse(authRequestMessage);
  const authRequestId = authRequestParsed.req?.[0];

  if (!authRequestId) {
    throw new Error('Failed to extract auth request ID from SDK message');
  }

  // Normalizar ID a número
  const normalizedAuthRequestId = typeof authRequestId === 'string' ? parseInt(authRequestId, 10) : authRequestId;

  console.log('[Auth] Auth request ID:', normalizedAuthRequestId, '(type:', typeof normalizedAuthRequestId, ')');
  console.log('[Auth] Registering handler for ID:', normalizedAuthRequestId);
  console.log('[Auth] Sending auth_request...');

  const challengeResponse = await new Promise<{ res?: [number | string, string, unknown, number] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      console.error('[Auth] ❌ Timeout waiting for auth_request response');
      console.error('[Auth] Expected ID:', normalizedAuthRequestId);
      console.error('[Auth] Registered handlers:', Array.from(messageHandlers.keys()));
      messageHandlers.delete(normalizedAuthRequestId);
      reject(new Error(`Auth request timeout (ID: ${normalizedAuthRequestId})`));
    }, 30000);

    messageHandlers.set(normalizedAuthRequestId, (response) => {
      console.log('[Auth] ✅ Handler called for ID:', normalizedAuthRequestId);
      console.log('[Auth] Response received:', JSON.stringify(response, null, 2));
      clearTimeout(timeout);
      resolve(response as { res?: [number | string, string, unknown, number] });
    });

    ws.send(authRequestMessage);
    console.log('[Auth] Message sent to WebSocket');
  });

  console.log('[Auth] Auth request response:', JSON.stringify(challengeResponse, null, 2));

  if (challengeResponse.res?.[1] === 'error') {
    throw new Error(`auth_request failed: ${JSON.stringify(challengeResponse.res[2])}`);
  }

  // Step 2: Extraer challenge
  let challenge: string | undefined;
  const challengeData = challengeResponse.res?.[2];
  
  if (challengeData && typeof challengeData === 'object') {
    challenge = (challengeData as { challenge_message?: string }).challenge_message;
  } else if (typeof challengeData === 'string') {
    challenge = challengeData;
  }
  
  if (!challenge) {
    console.error('[Auth] ❌ Challenge data:', challengeData);
    throw new Error('No challenge received from Yellow Network');
  }

  console.log('[Auth] ✅ Received challenge');
  console.log('[Auth] Challenge:', challenge.substring(0, 50) + '...');

  // Step 3: Crear mensaje auth_verify usando el SDK
  console.log('[Auth] Creating auth_verify with SDK...');
  
  // MessageSigner para auth_verify (usa session key)
  const verifyMessageSigner = async (payload: unknown) => {
    console.log('[Auth] Signing verify payload with session key...');
    const payloadString = JSON.stringify(payload);
    return await sessionKey.signMessage({ message: payloadString });
  };
  
  const authVerifyMessage = await createAuthVerifyMessageFromChallenge(
    verifyMessageSigner,
    mainWallet.address,
    challenge as any // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  
  console.log('[Auth] Auth verify message created');
  
  const authVerifyParsed = JSON.parse(authVerifyMessage);
  const authVerifyId = authVerifyParsed.req?.[0];

  if (!authVerifyId) {
    throw new Error('Failed to extract auth verify ID from SDK message');
  }

  // Normalizar ID a número
  const normalizedAuthVerifyId = typeof authVerifyId === 'string' ? parseInt(authVerifyId, 10) : authVerifyId;

  console.log('[Auth] Auth verify ID:', normalizedAuthVerifyId, '(original:', authVerifyId, ')');
  console.log('[Auth] Sending auth_verify...');

  const verifyResponse = await new Promise<{ res?: [number | string, string, unknown, number] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      messageHandlers.delete(normalizedAuthVerifyId);
      reject(new Error(`Auth verify timeout (ID: ${normalizedAuthVerifyId})`));
    }, 30000);

    messageHandlers.set(normalizedAuthVerifyId, (response) => {
      clearTimeout(timeout);
      resolve(response as { res?: [number | string, string, unknown, number] });
    });

    ws.send(authVerifyMessage);
  });

  console.log('[Auth] Auth verify response:', JSON.stringify(verifyResponse, null, 2));

  if (verifyResponse.res?.[1] === 'error') {
    throw new Error(`auth_verify failed: ${JSON.stringify(verifyResponse.res[2])}`);
  }

  console.log('[Auth] ✅ Authentication successful!');
  
  // Retornar el session key que ahora está autenticado
  return sessionKey;
}
