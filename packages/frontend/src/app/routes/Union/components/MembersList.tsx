import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import { UnionMembersDocument, UnionMembersQuery, execute } from 'graphclient';
import { useEffect, useState } from 'react';
import { numberToHex } from 'viem';

export const MembersList = () => {
  const unionId = useUnionIdParam();
  const [data, setData] = useState<UnionMembersQuery>();
  useEffect(() => {
    const load = async () => {
      const result = await execute(UnionMembersDocument, {
        id: numberToHex(parseInt(unionId), { size: 32 }),
      });

      if (result.data) {
        setData(result.data);
      }
    };

    load();
  }, [unionId]);

  if (!data) return null;

  return (
    <>
      <h2>Members</h2>
      <ul>
        {(data?.union?.users || []).map((user) => (
          <li key={user.user.id}>
            {user.user.metadata}– {user.user.id} {user.isAdmin ? '[admin]' : ''}
          </li>
        ))}
      </ul>
    </>
  );
};
