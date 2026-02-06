/**
 * Script para verificar proof de Merkle tree
 * 
 * Uso:
 *   pnpm tsx scripts/verify-proof.ts
 * 
 * O con parámetros:
 *   pnpm tsx scripts/verify-proof.ts \
 *     --root 0x... \
 *     --wallet 0x... \
 *     --amount 12000000 \
 *     --proof '["0x...","0x..."]'
 */

import { verifyPayoutProof, verifyPayoutProofDetailed } from "../lib/merkle/verifyProof";

// Ejemplo real de la campaña NIKE26
const EXAMPLE_PROOF = {
  root: "0x5d412b94644b290e6b90884392b91f744c6be67906ff46863377ea84a83ba913",
  wallet: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amountMicros: "12000000",
  proof: [
    "0xc8a22cc436dbf514a0fb209da74c4bbf27372c27971b7469c9d607855aaedcaf",
    "0xfbeb5854e19558ba2a07381793700b99276cbdf96b8edfb5024bbb2ce5b3a863",
  ],
};

async function main() {
  console.log("🔍 Verificando proof de Merkle tree...\n");

  // Verificación simple
  console.log("=== Verificación Simple ===");
  const isValid = verifyPayoutProof(EXAMPLE_PROOF);
  console.log(`Resultado: ${isValid ? "✅ VÁLIDA" : "❌ INVÁLIDA"}\n`);

  // Verificación detallada
  console.log("=== Verificación Detallada ===");
  const detailed = verifyPayoutProofDetailed(EXAMPLE_PROOF);

  console.log(`Wallet:        ${EXAMPLE_PROOF.wallet}`);
  console.log(`Amount:        ${EXAMPLE_PROOF.amountMicros} micros`);
  console.log(`Leaf Hash:     ${detailed.leafHash}`);
  console.log(`\nPasos de verificación:`);
  detailed.steps.forEach((step, i) => {
    if (i === 0) {
      console.log(`  ${i}. Leaf:     ${step}`);
    } else {
      console.log(`  ${i}. Step ${i}:   ${step}`);
    }
  });
  console.log(`\nRoot esperado: ${detailed.expectedRoot}`);
  console.log(`Root calculado: ${detailed.computedRoot}`);
  console.log(`\nResultado: ${detailed.valid ? "✅ VÁLIDA" : "❌ INVÁLIDA"}`);

  // Exit code basado en resultado
  process.exit(isValid ? 0 : 1);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
