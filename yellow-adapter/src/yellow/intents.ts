/**
 * Intent types for user actions
 */

/**
 * Transaction Intent (EVM)
 * Lo que el usuario debe enviar on-chain
 */
export interface TxIntentEvm {
  chainId: number;
  to: `0x${string}`;
  data: `0x${string}`;
  value: string; // hex string
  description: string;
  estimatedGas?: string;
}

/**
 * Sign Intent
 * Lo que el usuario debe firmar off-chain
 */
export interface SignIntent {
  kind: "EIP191_PERSONAL_SIGN" | "EIP712_TYPED_DATA";
  wallet: `0x${string}`;
  chainId: number;
  messageToSign: string; // hex string or JSON
  description: string;
  metadata?: {
    channelId?: string;
    version?: number;
    intent?: string;
  };
}

/**
 * Prepare Close Response
 */
export interface PrepareCloseResponse {
  signIntent: SignIntent;
  serverPart: {
    packedState: `0x${string}`;
    state: {
      version: number;
      intent: number;
      allocations: Array<{
        destination: string;
        amount: string;
      }>;
      data: string;
    };
    clearnodeSig: `0x${string}`;
    channelId: string;
  };
}

/**
 * Close Intent Response
 */
export interface CloseIntentResponse {
  txIntent: TxIntentEvm;
  debug: {
    packedState: string;
    intent: number;
    version: number;
    channelId: string;
    signatures: string[];
  };
}
