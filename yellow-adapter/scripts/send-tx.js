/**
 * Script para enviar transacciones con wallet de test
 * Uso: node scripts/send-tx.js <to> <data> <privateKey> <rpcUrl>
 */

const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { baseSepolia } = require("viem/chains");

async function main() {
  const to = process.argv[2];
  const data = process.argv[3];
  const privateKey = process.argv[4];
  const rpcUrl = process.argv[5] || "https://sepolia.base.org";

  if (!to || !data || !privateKey) {
    console.error("Usage: node scripts/send-tx.js <to> <data> <privateKey> [rpcUrl]");
    console.error("Example: node scripts/send-tx.js 0x1234... 0xabcd... 0xkey...");
    process.exit(1);
  }

  try {
    const account = privateKeyToAccount(privateKey);

    console.log("From:", account.address);
    console.log("To:", to);
    console.log("Data:", data.slice(0, 66) + "...");
    console.log("RPC:", rpcUrl);

    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: http(rpcUrl),
      account,
    });

    console.log("\nSending transaction...");

    const txHash = await walletClient.sendTransaction({
      to,
      data,
      value: 0n,
    });

    console.log("\n=== TRANSACTION SENT ===");
    console.log("TX Hash:", txHash);
    console.log("Explorer:", `https://sepolia.basescan.org/tx/${txHash}`);
    console.log("=======================\n");
  } catch (error) {
    console.error("Error sending transaction:", error.message);
    process.exit(1);
  }
}

main();
