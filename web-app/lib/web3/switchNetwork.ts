import { baseSepolia } from 'viem/chains';

export const switchNetwork = async (targetChainId: number) => {
  const chainIdHex = `0x${targetChainId.toString(16)}`;
  
  try {
    await window.waap?.request({
      method: 'wallet_switchEthereumChain',
      params: [ { chainId: chainIdHex } ],
    });
  } catch (error) {
    if ((error as { code: number })?.code === 4902) {
      await window.waap?.request({
        method: 'wallet_addEthereumChain',
        params: [ {
          chainId: chainIdHex,
          chainName: baseSepolia.name,
          nativeCurrency: baseSepolia.nativeCurrency,
          rpcUrls: [ baseSepolia.rpcUrls.default.http[0] ],
          blockExplorerUrls: [ baseSepolia.blockExplorers.default.url ],
        } ],
      });
    }
  }
};
