/**
 * Script para probar la creación de subdominios ENS
 * Ejecutar con: pnpm test:subname
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
  console.log("\n🧪 Testing ENS subname creation...\n");

  // Importar dinámicamente después de cargar env vars
  const { ensureCampaignSubname } = await import("../lib/ens/subnames.js");
  const { account } = await import("../lib/chain/clients.js");
  const { ENS_ROOT_NAME } = await import("../lib/chain/config.js");

  console.log("📋 Configuration:");
  console.log("  Root ENS:", ENS_ROOT_NAME);
  console.log("  Account:", account.address);
  console.log("");

  // Generar un código de prueba único
  const testCode = `TEST${Date.now().toString().slice(-6)}`;
  
  console.log("🔨 Creating test subname:", testCode);
  console.log("");

  try {
    const result = await ensureCampaignSubname({ code: testCode });

    console.log("\n✅ Subname creation successful!");
    console.log("  FQDN:", result.fqdn);
    console.log("  Node:", result.node);
    console.log("");

    // Intentar crear de nuevo para probar idempotencia
    console.log("🔄 Testing idempotency (creating again)...");
    console.log("");

    const result2 = await ensureCampaignSubname({ code: testCode });

    console.log("\n✅ Idempotency test passed!");
    console.log("  FQDN:", result2.fqdn);
    console.log("  Node:", result2.node);
    console.log("");

    console.log("🎉 All tests passed!\n");
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
