import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { type Address } from 'viem';
import { sepolia } from 'viem/chains';
import { ContractAddresses } from '@erc7824/nitrolite';

export interface SessionKey {
  privateKey: `0x${string}`;
  address: Address;
}

export const generateSessionKey = (): SessionKey => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return { privateKey, address: account.address };
};

export function getContractAddresses(chainId: number): ContractAddresses {
  if (chainId === sepolia.id) {
    return {
      custody: '0x019B65A265EB3363822f2752141b3dF16131b262',
      adjudicator: '0x7c7ccbc98469190849BCC6c926307794fDfB11F2',
    }
  }
  throw new Error(`Unsupported chain ID: ${chainId}`); // ⭐ Corregir sintaxis
}