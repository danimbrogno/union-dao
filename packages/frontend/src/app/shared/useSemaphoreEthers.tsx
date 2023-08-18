import { SemaphoreEthers } from '@semaphore-protocol/data';
import { useCallback, useState } from 'react';
import { Group } from '@semaphore-protocol/group';

export type SemaphoreContextType = {
  group: Group | null;
  refreshGroup: (groupId: string) => Promise<void>;
};

export default function useSemaphore(
  contractAddress: string
): SemaphoreContextType {
  const [group, setGroup] = useState<Group | null>(null);

  const refreshGroup = useCallback(
    async (groupId: string): Promise<void> => {
      if (!contractAddress) {
        return;
      }
      const semaphore = new SemaphoreEthers('http://localhost:8545', {
        address: contractAddress,
        startBlock: 8163958,
      });

      const [_members, _group] = await Promise.all([
        semaphore.getGroupMembers(groupId),
        semaphore.getGroup(groupId),
      ]);

      const group = new Group(
        _group.id,
        parseInt(_group.merkleTree.depth as any),
        _members
      );

      setGroup(group);
    },
    [contractAddress]
  );

  return {
    group,
    refreshGroup,
  };
}
