/**
 * On-Chain Channel Service
 * Implementa state channels reales con Yellow Network
 */

import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  parseUnits,
  type Address,
  type Hash,
  encodeAbiParameters,
  parseAbiParameters,
  keccak256,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';

// Types
export enum StateIntent {
  INITIALIZE = 0,
  OPERATE = 1,
  RESIZE = 2,
  FINALIZE = 3,
}

export interface Allocation {
  destination: Address;
  token: Address;
  amount: bigint;
}

export interface State {
  intent: StateIntent;
  version: bigint;
  data: `0x${string}`;
  allocations: Allocation[];
  sigs: `0x${string}`[];
}

export interface Channel {
  chainId: bigint;
  participants: Address[];
  adjudicator: Address;
  challenge: bigint;
  nonce: bigint;
}

export interface ChannelConfig {
  custodyAddress: Address;
  adjudicatorAddress: Address;
  usdcAddress: Address;
  rpcUrl: string;
  chainId: number;
}

/**
 * Calcula el channelId
 */
export function calculateChannelId(channel: Channel): `0x${string}` {
  const encoded = encodeAbiParameters(
    parseAbiParameters('address[], address, uint256, uint256, uint256'),
    [
      channel.participants,
      channel.adjudicator,
      channel.challenge,
      channel.nonce,
      channel.chainId,
    ]
  );
  return keccak256(encoded);
}

/**
 * Empaqueta un estado para firmar
 */
export function packState(channelId: `0x${string}`, state: State): `0x${string}` {
  const allocationsEncoded = encodeAbiParameters(
    parseAbiParameters('(address destination, address token, uint256 amount)[]'),
    [state.allocations as any]
  );

  const packed = encodeAbiParameters(
    parseAbiParameters('bytes32, uint8, uint256, bytes, bytes'),
    [
      channelId,
      state.intent,
      state.version,
      state.data,
      allocationsEncoded,
    ]
  );

  return keccak256(packed);
}

/**
 * Service para manejar canales on-chain
 */
export class OnChainChannelService {
  private config: ChannelConfig;
  private judgeAccount: any;
  private feeAddress: `0x${string}`;

  constructor(
    config: ChannelConfig,
    judgePk: `0x${string}`,
    feeAddress: `0x${string}`
  ) {
    this.config = config;
    this.judgeAccount = privateKeyToAccount(judgePk);
    this.feeAddress = feeAddress;
  }

  /**
   * Crea un public client
   */
  createPublicClient() {
    return createPublicClient({
      chain: baseSepolia,
      transport: http(this.config.rpcUrl),
    });
  }

  /**
   * Crea un wallet client para un usuario
   */
  createWalletClient(privateKey: `0x${string}`) {
    return createWalletClient({
      chain: baseSepolia,
      transport: http(this.config.rpcUrl),
      account: privateKeyToAccount(privateKey),
    });
  }

  /**
   * Firma un estado con EIP-712
   */
  async signState(
    channelId: `0x${string}`,
    state: State,
    signer: any // WalletClient account
  ): Promise<`0x${string}`> {
    return await signer.signTypedData({
      domain: {
        name: 'Nitrolite:Custody',
        version: '0.3.0',
        chainId: this.config.chainId,
        verifyingContract: this.config.custodyAddress,
      },
      types: {
        AllowStateHash: [
          { name: 'channelId', type: 'bytes32' },
          { name: 'intent', type: 'uint8' },
          { name: 'version', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          { name: 'allocations', type: 'Allocation[]' },
        ],
        Allocation: [
          { name: 'destination', type: 'address' },
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
      },
      primaryType: 'AllowStateHash',
      message: {
        channelId,
        intent: state.intent,
        version: state.version,
        data: state.data,
        allocations: state.allocations as any,
      },
    });
  }

  /**
   * Crea un canal on-chain
   */
  async createChannel(
    managerAddress: Address,
    influencerAddress: Address,
    initialBudgetUsdc: string
  ): Promise<{
    channelId: `0x${string}`;
    channel: Channel;
    initialState: State;
    txHash: Hash;
  }> {
    const publicClient = this.createPublicClient();
    
    // 1. Configurar canal
    const channel: Channel = {
      chainId: BigInt(this.config.chainId),
      participants: [
        managerAddress,
        influencerAddress,
        this.judgeAccount.address,
        this.feeAddress,
      ],
      adjudicator: this.config.adjudicatorAddress,
      challenge: BigInt(3600), // 1 hora
      nonce: BigInt(Date.now()),
    };

    const channelId = calculateChannelId(channel);

    // 2. Estado inicial con allocations
    const budget = BigInt(initialBudgetUsdc);
    const initialState: State = {
      intent: StateIntent.INITIALIZE,
      version: BigInt(0),
      data: '0x',
      allocations: [
        {
          destination: managerAddress,
          token: this.config.usdcAddress,
          amount: budget,
        },
        {
          destination: influencerAddress,
          token: this.config.usdcAddress,
          amount: BigInt(0),
        },
        {
          destination: this.judgeAccount.address,
          token: this.config.usdcAddress,
          amount: BigInt(0),
        },
        {
          destination: this.feeAddress,
          token: this.config.usdcAddress,
          amount: BigInt(0),
        },
      ],
      sigs: [],
    };

    // 3. Firmar con Judge (Growi platform)
    const judgeSig = await this.signState(channelId, initialState, this.judgeAccount);
    initialState.sigs = [
      '0x', // Manager debe firmar desde frontend
      '0x', // Influencer debe firmar desde frontend
      judgeSig,
      '0x', // Fee no necesita firmar para INITIALIZE
    ];

    return {
      channelId,
      channel,
      initialState,
      txHash: '0x' as Hash, // Se completa cuando Manager firma y envía TX
    };
  }

  /**
   * Aplica un payout off-chain (OPERATE)
   */
  async applyPayoutOffChain(
    channelId: `0x${string}`,
    currentState: State,
    earnedUsdc: bigint,
    feeBps: number
  ): Promise<State> {
    // Calcular fee
    const fee = (earnedUsdc * BigInt(feeBps)) / BigInt(10000);
    const total = earnedUsdc + fee;

    // Validar balance de manager
    const managerBalance = currentState.allocations[0].amount;
    if (managerBalance < total) {
      throw new Error('Insufficient manager balance');
    }

    // Crear nuevo estado
    const newState: State = {
      intent: StateIntent.OPERATE,
      version: currentState.version + BigInt(1),
      data: '0x',
      allocations: [
        {
          destination: currentState.allocations[0].destination,
          token: currentState.allocations[0].token,
          amount: managerBalance - total,
        },
        {
          destination: currentState.allocations[1].destination,
          token: currentState.allocations[1].token,
          amount: currentState.allocations[1].amount + earnedUsdc,
        },
        {
          destination: currentState.allocations[2].destination,
          token: currentState.allocations[2].token,
          amount: currentState.allocations[2].amount,
        },
        {
          destination: currentState.allocations[3].destination,
          token: currentState.allocations[3].token,
          amount: currentState.allocations[3].amount + fee,
        },
      ],
      sigs: [],
    };

    // Firmar con Judge (Growi platform)
    const judgeSig = await this.signState(channelId, newState, this.judgeAccount);
    newState.sigs = ['0x', '0x', judgeSig, '0x'];

    return newState;
  }

  /**
   * Cierra el canal cooperativamente
   */
  async closeChannelCooperative(
    channelId: `0x${string}`,
    finalState: State
  ): Promise<State> {
    // Convertir a FINALIZE
    const closeState: State = {
      intent: StateIntent.FINALIZE,
      version: finalState.version + BigInt(1),
      data: '0x',
      allocations: finalState.allocations,
      sigs: [],
    };

    // Firmar con Judge
    const judgeSig = await this.signState(channelId, closeState, this.judgeAccount);
    closeState.sigs = ['0x', '0x', judgeSig, '0x'];

    return closeState;
  }
}

/**
 * Singleton del servicio on-chain
 */
let onChainServiceInstance: OnChainChannelService | null = null;

export function getOnChainChannelService(): OnChainChannelService {
  if (!onChainServiceInstance) {
    // Importar validación centralizada
    const { validateOnChainConfig } = require('@/src/lib/config/env');
    const envConfig = validateOnChainConfig();
    
    const config: ChannelConfig = {
      custodyAddress: envConfig.YELLOW_CUSTODY_ADDRESS as Address,
      adjudicatorAddress: envConfig.YELLOW_ADJUDICATOR_ADDRESS as Address,
      usdcAddress: envConfig.YELLOW_USDC_ADDRESS as Address,
      rpcUrl: envConfig.BASE_SEPOLIA_RPC_URL,
      chainId: envConfig.YELLOW_CHAIN_ID,
    };

    onChainServiceInstance = new OnChainChannelService(
      config,
      envConfig.YELLOW_JUDGE_PK as `0x${string}`,
      envConfig.YELLOW_FEE_ADDRESS as `0x${string}`
    );
  }

  return onChainServiceInstance;
}
