import { useEnsName } from '@/hooks/useEnsName';

export const WalletDisplayName = ({ address }: { address: string }) => {
  const { displayName } = useEnsName(address);
  return displayName;
};
