/**
 * Script para firmar mensajes con wallet de test
 * Uso: node scripts/sign-message.js <messageHash> <privateKey>
 */

const { privateKeyToAccount } = require("viem/accounts");

async function main() {
  const messageHash = process.argv[2];
  const privateKey = process.argv[3];

  if (!messageHash || !privateKey) {
    console.error("Usage: node scripts/sign-message.js <messageHash> <privateKey>");
    console.error("Example: node scripts/sign-message.js 0x1234... 0xabcd...");
    process.exit(1);
  }

  try {
    const account = privateKeyToAccount(privateKey);

    console.log("Wallet:", account.address);
    console.log("Message:", messageHash);

    const signature = await account.signMessage({
      message: { raw: messageHash },
    });

    console.log("\n=== SIGNATURE ===");
    console.log(signature);
    console.log("================\n");
    console.log("Copy this signature to Postman variable 'userSig'");
  } catch (error) {
    console.error("Error signing message:", error.message);
    process.exit(1);
  }
}

main();
