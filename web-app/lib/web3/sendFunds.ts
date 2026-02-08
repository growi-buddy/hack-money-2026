import { switchNetwork } from '@/lib/web3/switchNetwork';
import { parseEther, toHex } from 'viem';
import { baseSepolia } from 'viem/chains';

// Example usage: to: 0x28550C95e6c13559963cd45A1E9ED726A35673ca, amountEth: '0.001'
export const sendFunds = async (to: string, amountEth: string) => {
  if (!window.waap) {
    return { success: false, txHash: '', error: 'Wallet not connected. Please connect your wallet to continue.' };
  }
  
  try {
    const currentChainHex = await window.waap.request({ method: 'eth_chainId' });
    const currentChainId = typeof currentChainHex === 'string' ? parseInt(currentChainHex, 16) : parseInt(currentChainHex[0], 16);
    
    if (currentChainId !== baseSepolia.id) {
      await switchNetwork(baseSepolia.id);
      return {
        success: false,
        txHash: '',
        error: `Wrong network detected. Please switch to ${baseSepolia.name} to continue.`,
      };
    }
    
    const accounts = await window.waap.request({ method: 'eth_accounts' });
    const userAddress = accounts[0];
    
    if (!userAddress) {
      return { success: false, txHash: '', error: 'No active account found. Please ensure you are logged in.' };
    }
    
    const txHash = await window.waap.request({
      method: 'eth_sendTransaction',
      params: [ {
        from: userAddress,
        to,
        value: toHex(parseEther(amountEth)),
      } ],
    });
    
    console.log('Transaction successful on Base Sepolia:', txHash);
    return { success: true, txHash, error: '' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, txHash: '', error: (error as Error)?.message || 'An unexpected error occurred. Please try again.' };
  }
};
