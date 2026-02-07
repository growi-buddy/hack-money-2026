import { base } from "viem/chains";

export const chain = base;
export const CHAIN_ID = chain.id
export const USDC_TOKEN_BASE = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
export const USDC_DECIMALS = 6;
export const CUSTODY_CONTRACT_ADDRESS_FOR_BASE = "0x490fb189DdE3a01B00be9BA5F41e3447FbC838b6";
export const ADJUDICATOR_ADDRESS_FOR_BASE = "0x7de4A0736Cf5740fD3Ca2F2e9cc85c9AC223eF0C";
export const CUSTODY_CONTRACT_ADDRESS_TESNET = "0x019B65A265EB3363822f2752141b3dF16131b262";// CREO QUE PARA BASE SEPOLIA
export const ADJUDICATOR_ADDRESS_TESNET = "0x7c7ccbc98469190849BCC6c926307794fDfB11F2";// CREO QUE PARA BASE SEPOLIA
export const YELLOW_NETWORK_MAIN_URL = "wss://clearnet.yellow.com/ws";
export const YELLOW_NETWORK_TESNET_URL = "wss://clearnet-sandbox.yellow.com/ws";
export const ASSET = 'ytest.usd'

