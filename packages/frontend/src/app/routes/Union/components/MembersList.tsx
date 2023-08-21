import { UnionMembersDocument, UnionMembersQuery, execute } from 'graphclient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MembersList = () => {
  const { id } = useParams<'id'>();
  const [data, setData] = useState<UnionMembersQuery>();
  useEffect(() => {
    const load = async () => {
      const result = await execute(UnionMembersDocument, { id });

      if (result.data) {
        setData(result.data);
      }
    };

    load();
  }, [id]);

  if (!data) return null;

  return (
    <ul>
      {(data?.union?.users || []).map((user) => (
        <li key={user.user.id}>{user.user.metadata}</li>
      ))}
    </ul>
  );
};
