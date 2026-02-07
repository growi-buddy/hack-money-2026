import {UserSession,fetchConfig} from "@/scripts/userSession";
import {createECDSAMessageSigner} from "@erc7824/nitrolite";
import { config } from 'dotenv';
config();
import{YTEST_USD_FOR_SEPOLIA} from "@/config/constants";

async function main() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
  const TOKEN_ADDRESS = YTEST_USD_FOR_SEPOLIA; // ytest.usd
  const mainUserSigner = createECDSAMessageSigner(PRIVATE_KEY);
  console.log('Fetching config...');
  const config = await fetchConfig(mainUserSigner);
  const growi = new UserSession("growi", PRIVATE_KEY, config);
  await growi.authenticate(10000n);
  const growiInitial = await growi.getOffChainBalance();
  const growiInitialCustody = await growi.getCustodyBalance(TOKEN_ADDRESS);
  const l1Balance = await growi.getOnChainBalanceL1(TOKEN_ADDRESS);
  console.log(`[Growi] L1 Token Balance: ${l1Balance} units`);
  console.log(`[Growi] Initial Balance (Custody): ${growiInitialCustody} (Raw Units verification)`);
  console.log(`[Growi] Initial Balance (Unified): ${growiInitial} ytest.usd`);
}

main().catch(console.error);