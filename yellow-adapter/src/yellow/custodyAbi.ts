/**
 * Minimal Custody Contract ABI
 * Solo lo necesario para create() y close()
 */

export const CUSTODY_ABI = [
  {
    name: "create",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "channel",
        type: "tuple",
        components: [
          { name: "chainId", type: "uint256" },
          { name: "participants", type: "address[]" },
          { name: "challenge", type: "uint48" },
          { name: "nonce", type: "uint256" },
          { name: "asset", type: "address" },
        ],
      },
      {
        name: "state",
        type: "tuple",
        components: [
          { name: "version", type: "uint256" },
          { name: "intent", type: "uint8" },
          {
            name: "allocations",
            type: "tuple[]",
            components: [
              { name: "destination", type: "address" },
              { name: "amount", type: "uint256" },
            ],
          },
          { name: "data", type: "bytes" },
        ],
      },
      { name: "signatures", type: "bytes[]" },
    ],
    outputs: [],
  },
  {
    name: "close",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "channel",
        type: "tuple",
        components: [
          { name: "chainId", type: "uint256" },
          { name: "participants", type: "address[]" },
          { name: "challenge", type: "uint48" },
          { name: "nonce", type: "uint256" },
          { name: "asset", type: "address" },
        ],
      },
      {
        name: "state",
        type: "tuple",
        components: [
          { name: "version", type: "uint256" },
          { name: "intent", type: "uint8" },
          {
            name: "allocations",
            type: "tuple[]",
            components: [
              { name: "destination", type: "address" },
              { name: "amount", type: "uint256" },
            ],
          },
          { name: "data", type: "bytes" },
        ],
      },
      { name: "signatures", type: "bytes[]" },
    ],
    outputs: [],
  },
] as const;

/**
 * Channel structure type
 */
export interface Channel {
  chainId: bigint;
  participants: `0x${string}`[];
  challenge: bigint;
  nonce: bigint;
  asset: `0x${string}`;
}

/**
 * Allocation structure type
 */
export interface Allocation {
  destination: `0x${string}`;
  amount: bigint;
}

/**
 * State structure type
 */
export interface State {
  version: bigint;
  intent: number; // 0=INITIALIZE, 1=DEPOSIT, 2=OPERATE, 3=FINALIZE
  allocations: Allocation[];
  data: `0x${string}`;
}

/**
 * Intent enum
 */
export enum Intent {
  INITIALIZE = 0,
  DEPOSIT = 1,
  OPERATE = 2,
  FINALIZE = 3,
}
