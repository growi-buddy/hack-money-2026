/* eslint-disable @typescript-eslint/no-explicit-any */
import {createPublicClient, createWalletClient, http, PrivateKeyAccount} from "viem";
import {
  createAuthRequestMessage, createAuthVerifyMessageFromChallenge,
  createECDSAMessageSigner, createEIP712AuthMessageSigner, createGetConfigMessage, createGetLedgerBalancesMessage,
  NitroliteClient, type RPCAsset, type RPCNetworkInfo,
  WalletStateSigner
} from "@erc7824/nitrolite";
import WebSocket from "ws";
import {generatePrivateKey, privateKeyToAccount} from "viem/accounts";
import {YELLOW_NETWORK_TESNET_URL, chain, CUSTODY_CONTRACT_ADDRESS_TESNET, ADJUDICATOR_ADDRESS_TESNET} from "@/config/constants";


const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL;
const FALLBACK_RPC_URL = 'https://1rpc.io/sepolia';

export interface Config {
  assets?: RPCAsset[];
  networks?: RPCNetworkInfo[];
  [key: string]: any;
}

export const publicClient = createPublicClient({
  chain: chain,
  transport: http(ALCHEMY_RPC_URL || FALLBACK_RPC_URL),
});

export async function fetchConfig(signer: any): Promise<Config> {
  const ws = new WebSocket(YELLOW_NETWORK_TESNET_URL);
  const message = await createGetConfigMessage(signer);

  return new Promise((resolve, reject) => {
    ws.onopen = () => ws.send(message);
    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data.toString());
        if (response.res && response.res[2]) {
          resolve(response.res[2] as Config);
          ws.close();
        } else if (response.error) {
          reject(new Error(response.error.message));
          ws.close();
        }
      } catch (err) { reject(err); ws.close(); }
    };
    ws.onerror = (e) => { reject(e); ws.close(); };
  });
}

export class UserSession {
  name: string;
  privateKey: `0x${string}`;
  account: PrivateKeyAccount;
  walletClient: any;
  client: NitroliteClient;
  ws: WebSocket;
  isAuthenticated = false;
  sessionSigner: any;
  sessionAddress: string;

  constructor(name: string, privateKey: `0x${string}`, config: Config) {
    this.name = name;
    this.privateKey = privateKey;
    this.account = privateKeyToAccount(privateKey);

    this.walletClient = createWalletClient({
      chain: chain,
      transport: http(),
      account: this.account,
    });

    this.client = new NitroliteClient({
      publicClient,
      walletClient: this.walletClient,
      stateSigner: new WalletStateSigner(this.walletClient),
      addresses: {
        custody: CUSTODY_CONTRACT_ADDRESS_TESNET,
        adjudicator: ADJUDICATOR_ADDRESS_TESNET,
      },
      chainId: chain.id,
      challengeDuration: 3600n,
    });

    this.ws = new WebSocket(YELLOW_NETWORK_TESNET_URL);

    // Session Key Generation
    const sessionPrivateKey = generatePrivateKey();
    const sessionAccount = privateKeyToAccount(sessionPrivateKey);
    this.sessionAddress = sessionAccount.address;
    this.sessionSigner = createECDSAMessageSigner(sessionPrivateKey);
    console.log(`[${this.name}] Initialized: ${this.account.address}`);
  }

  async authenticate(amount: bigint | string) {
    return new Promise<void>(async (resolve, reject) => {
      const amountStr = typeof amount === 'bigint' ? amount.toString() : amount;
      const authParams = {
        session_key: this.sessionAddress as `0x${string}`,
        allowances: [{ asset: 'ytest.usd', amount: amountStr }],//'10000'
        expires_at: BigInt(Math.floor(Date.now() / 1000) + 3600),
        scope: 'test.app',
      };

      const authRequestMsg = await createAuthRequestMessage({
        address: this.account.address,
        application: 'Test app',
        ...authParams
      });

      const handler = async (data: any) => {
        const response = JSON.parse(data.toString());
        if (response.res && response.res[1] !== 'bu') {
          // console.log(`[${this.name}] Msg:`, response.res[1]);
        }

        if (response.res && response.res[1] === 'auth_challenge') {
          if (this.isAuthenticated) return;

          const challenge = response.res[2].challenge_message;
          const signer = createEIP712AuthMessageSigner(this.walletClient, authParams, { name: 'Test app' });
          const verifyMsg = await createAuthVerifyMessageFromChallenge(signer, challenge);
          this.ws.send(verifyMsg);
        }

        if (response.res && response.res[1] === 'auth_verify') {
          console.log(`[${this.name}] ✓ Authenticated`);
          this.isAuthenticated = true;
          this.ws.off('message', handler);
          resolve();
        }
      };

      this.ws.on('message', handler);

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(authRequestMsg);
      } else {
        this.ws.on('open', () => this.ws.send(authRequestMsg));
      }
    });
  }
  async getOnChainBalanceL1(tokenAddress: `0x${string}`) {
    const l1Balance = await publicClient.readContract({
      address: tokenAddress,
      abi: [{ name: 'balanceOf', type: 'function', inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' }] as const,
      functionName: 'balanceOf',
      args: [this.account.address],
    }) as bigint;
    console.log(`[Growi] L1 Token Balance: ${l1Balance} units`);

    return l1Balance;

  }

  async getOffChainBalance(targetAsset: string = 'ytest.usd'): Promise<string> {
    return new Promise((resolve) => {
      const handler = (data: any) => {
        const msg = JSON.parse(data.toString());
        if (msg.res && msg.res[1] === 'get_ledger_balances') {
          const balances = msg.res[2].ledger_balances;
          const bal = balances.find((b: any) => b.asset === targetAsset);
          this.ws.off('message', handler);
          resolve(bal ? bal.amount : '0');
        }
      };
      this.ws.on('message', handler);

      // Send Request
      createGetLedgerBalancesMessage(this.sessionSigner, this.account.address)
        .then(msg => this.ws.send(msg));
    });
  }

  async getCustodyBalance(tokenAddress: string): Promise<bigint> {
    const result = await publicClient.readContract({
      address: this.client.addresses.custody,
      abi: [{
        type: 'function',
        name: 'getAccountsBalances',
        inputs: [{ name: 'users', type: 'address[]' }, { name: 'tokens', type: 'address[]' }],
        outputs: [{ type: 'uint256[]' }],
        stateMutability: 'view'
      }] as const,
      functionName: 'getAccountsBalances',
      args: [[this.account.address], [tokenAddress as `0x${string}`]],
    }) as bigint[];
    return result[0];
  }
}