import { SemaphoreEthers } from '@semaphore-protocol/data';
import { useCallback, useState } from 'react';
import { Group } from '@semaphore-protocol/group';
import { useConfig } from './Config';

export type SemaphoreContextType = {
  group: Group | null;
  refreshGroup: (groupId: string) => Promise<void>;
};

export default function useSemaphore(
  contractAddress: string
): SemaphoreContextType {
  const [group, setGroup] = useState<Group | null>(null);
  const { ethereum } = useConfig();
  const refreshGroup = useCallback(
    async (groupId: string): Promise<void> => {
      if (!contractAddress) {
        return;
      }

      const semaphore = new SemaphoreEthers(ethereum.rpcUrl, {
        address: contractAddress,
        startBlock: ethereum.startBlock,
      });

      const [_members, _group] = await Promise.all([
        semaphore.getGroupMembers(groupId),
        semaphore.getGroup(groupId),
      ]);
      console.log(_members);
      const group = new Group(
        _group.id,
        parseInt(_group.merkleTree.depth as any),
        _members
      );

      setGroup(group);
    },
    [contractAddress, ethereum.rpcUrl, ethereum.startBlock]
  );

  return {
    group,
    refreshGroup,
  };
}
