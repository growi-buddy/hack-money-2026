/**
 * Script para probar la escritura de text records en ENS
 * Ejecutar con: pnpm test:records
 */

// Cargar variables de entorno
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });
dotenv.config({ path: resolve(__dirname, "../.env.local") });

async function main() {
  console.log("\n🧪 Testing ENS text records...\n");

  // Importar dinámicamente después de cargar env vars
  const { createCampaignOnEns } = await import("../lib/ensWriter.js");
  const { account } = await import("../lib/chain/clients.js");
  const { ENS_ROOT_NAME } = await import("../lib/chain/config.js");

  console.log("📋 Configuration:");
  console.log("  Root ENS:", ENS_ROOT_NAME);
  console.log("  Account:", account.address);
  console.log("");

  // Generar un código de prueba único
  const testCode = `REC${Date.now().toString().slice(-6)}`;
  
  console.log("🔨 Creating campaign with text records:", testCode);
  console.log("");

  try {
    const result = await createCampaignOnEns({
      code: testCode,
      termsURI: "ipfs://QmTest123456789abcdef",
      termsHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      yellowChannelId: "yellow-channel-test",
    });

    console.log("\n✅ Campaign created with text records!");
    console.log("  FQDN:", result.fqdn);
    console.log("  Node:", result.node);
    console.log("  Transactions:", result.txHashes.length);
    result.txHashes.forEach((hash, i) => {
      console.log(`    ${i + 1}. ${hash}`);
    });
    console.log("");

    console.log("🎉 Test passed!\n");
    console.log("📝 View on Etherscan:");
    result.txHashes.forEach((hash) => {
      console.log(`  https://sepolia.etherscan.io/tx/${hash}`);
    });
    console.log("");
  } catch (error: any) {
    console.error("\n❌ Test failed:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
