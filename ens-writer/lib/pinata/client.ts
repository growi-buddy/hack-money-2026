/**
 * Pinata Client (Server-Only)
 * 
 * Cliente configurado para subir archivos a IPFS via Pinata.
 */

import { PinataSDK } from "pinata";

// Validar que la variable de entorno exista
function getPinataJWT(): string {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) {
    throw new Error(
      "Missing PINATA_JWT: Asegúrate de tener PINATA_JWT en tu archivo .env"
    );
  }
  return jwt;
}

/**
 * Cliente Pinata singleton
 */
export const pinata = new PinataSDK({
  pinataJwt: getPinataJWT(),
});

/**
 * Test de conexión con Pinata
 */
export async function testPinataConnection(): Promise<boolean> {
  try {
    // Test de autenticación oficial del SDK
    const result = await pinata.testAuthentication();
    console.log("[Pinata] Authentication successful:", result);
    return true;
  } catch (error) {
    console.error("[Pinata] Connection test failed:", error);
    return false;
  }
}
