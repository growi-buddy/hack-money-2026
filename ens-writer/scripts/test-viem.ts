/**
 * Script para probar la configuración de viem
 * Ejecutar con: pnpm tsx scripts/test-viem.ts
 */

// Cargar variables de entorno ANTES de cualquier otro import
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env primero
dotenv.config({ path: resolve(__dirname, "../.env") });
// Cargar .env.local (sobrescribe .env si existe)
dotenv.config({ path: resolve(__dirname, "../.env.local") });

console.log("🔧 Environment variables loaded");
console.log("  ENS_WRITER_PRIVATE_KEY:", process.env.ENS_WRITER_PRIVATE_KEY ? "✓ Set" : "✗ Missing");
console.log("  RPC_URL:", process.env.RPC_URL ? "✓ Set" : "✗ Missing");
console.log("  CHAIN_ID:", process.env.CHAIN_ID ? "✓ Set" : "✗ Missing");
console.log("  ENS_ROOT_NAME:", process.env.ENS_ROOT_NAME ? "✓ Set" : "✗ Missing");
console.log("");

async function main() {
  // Usar dynamic imports para cargar DESPUÉS de configurar las env vars
  const { account, publicClient, walletClient } = await import("../lib/chain/clients.js");
  const { CHAIN_ID, ENS_ROOT_NAME, RPC_URL } = await import("../lib/chain/config.js");
  console.log("\n🔍 Testing viem configuration...\n");

  // 1. Mostrar configuración
  console.log("📋 Configuration:");
  console.log("  Chain ID:", CHAIN_ID);
  console.log("  RPC URL:", RPC_URL);
  console.log("  ENS Root:", ENS_ROOT_NAME);
  console.log("  Account:", account.address);
  console.log("");

  // 2. Probar public client
  try {
    console.log("🔍 Testing public client...");
    const blockNumber = await publicClient.getBlockNumber();
    console.log("  ✅ Current block:", blockNumber);
    
    const balance = await publicClient.getBalance({ address: account.address });
    console.log("  ✅ Account balance:", balance.toString(), "wei");
    console.log("");
  } catch (error) {
    console.error("  ❌ Public client error:", error);
    process.exit(1);
  }

  // 3. Verificar que el account esté configurado
  console.log("✅ Wallet client configured");
  console.log("  Address:", walletClient.account.address);
  console.log("");

  console.log("🎉 All checks passed!\n");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
