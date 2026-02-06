/**
 * Script para probar verificación completa
 * 
 * Simula el flujo de la página /verify:
 * 1. Lee payoutRoot desde ENS
 * 2. Obtiene proof desde API
 * 3. Verifica localmente
 */

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const CAMPAIGN_CODE = process.env.CAMPAIGN_CODE || "nike26";
const WALLET = process.env.WALLET || "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const ENS_ROOT_NAME = process.env.NEXT_PUBLIC_ENS_ROOT_NAME || "growi.eth";

async function main() {
  console.log("🔍 Testing full verification flow...\n");
  console.log("Campaign:", CAMPAIGN_CODE);
  console.log("Wallet:", WALLET);
  console.log("");

  try {
    // 1. Construir FQDN
    const fqdn = `${CAMPAIGN_CODE.toLowerCase()}.${ENS_ROOT_NAME}`;
    console.log(`📍 FQDN: ${fqdn}\n`);

    // 2. Leer payoutRoot desde ENS
    console.log("📖 Reading payoutRoot from ENS...");
    const ensResponse = await fetch(
      `${BASE_URL}/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:payoutRoot`
    );

    if (!ensResponse.ok) {
      throw new Error("Failed to read payoutRoot from ENS");
    }

    const ensData = await ensResponse.json();
    const payoutRootFromEns = ensData.value;

    if (!payoutRootFromEns) {
      throw new Error("Campaign not finalized (no payoutRoot in ENS)");
    }

    console.log(`✅ Payout root from ENS: ${payoutRootFromEns}\n`);

    // 3. Obtener proof desde API
    console.log("🔐 Fetching proof from API...");
    const proofResponse = await fetch(
      `${BASE_URL}/api/ens/campaigns/${CAMPAIGN_CODE}/proof?wallet=${encodeURIComponent(WALLET)}`
    );

    if (!proofResponse.ok) {
      const proofError = await proofResponse.json();
      throw new Error(proofError.details || "Failed to get proof");
    }

    const proofData = await proofResponse.json();
    console.log(`✅ Proof received (${proofData.proof.length} elements)`);
    console.log(`   Amount: ${proofData.amountMicros} micros`);
    console.log(`   Root from API: ${proofData.payoutRoot}\n`);

    // 4. Verificar consistencia de roots
    if (payoutRootFromEns !== proofData.payoutRoot) {
      console.log("⚠️  WARNING: Roots don't match!");
      console.log(`   ENS:  ${payoutRootFromEns}`);
      console.log(`   API:  ${proofData.payoutRoot}\n`);
    }

    // 5. Normalizar wallet
    const normalizedWallet = WALLET.toLowerCase();

    // 6. Verificar proof
    console.log("🔍 Verifying proof...");
    const verified = StandardMerkleTree.verify(
      payoutRootFromEns, // Use ENS as source of truth
      ["address", "uint256"],
      [normalizedWallet, proofData.amountMicros],
      proofData.proof
    );

    console.log("");
    console.log("=".repeat(50));
    if (verified) {
      console.log("✅ VERIFICATION SUCCESSFUL!");
      console.log("=".repeat(50));
      console.log("");
      console.log("The payout is valid and verifiable on-chain.");
      console.log(`Wallet ${normalizedWallet} is entitled to ${proofData.amountMicros} micros.`);
    } else {
      console.log("❌ VERIFICATION FAILED!");
      console.log("=".repeat(50));
      console.log("");
      console.log("The proof does not match the on-chain root.");
      process.exit(1);
    }

    // 7. Leer datos adicionales
    console.log("");
    console.log("📊 Additional data from ENS:");
    
    const [settlementResponse, termsResponse] = await Promise.all([
      fetch(`${BASE_URL}/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:settlementTx`),
      fetch(`${BASE_URL}/api/ens/text?name=${encodeURIComponent(fqdn)}&key=growi:termsHash`),
    ]);

    const settlementData = await settlementResponse.json();
    const termsData = await termsResponse.json();

    console.log(`   Settlement Tx: ${settlementData.value || "N/A"}`);
    console.log(`   Terms Hash:    ${termsData.value || "N/A"}`);

  } catch (error) {
    console.error("");
    console.error("❌ Error during verification:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
