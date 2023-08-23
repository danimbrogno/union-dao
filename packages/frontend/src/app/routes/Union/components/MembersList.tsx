import styled from '@emotion/styled';
import { UserMetadata } from 'frontend/app.interface';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import {
  UnionMembersDocument,
  UnionMembersQuery,
  UserRoleDetailFragment,
  execute,
} from 'graphclient';
import { useEffect, useState } from 'react';
import { numberToHex } from 'viem';

const H2 = styled.h2``;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 0.5em 0;
`;

const P = styled.p`
  margin: 0.5em 0;
`;

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
      <H2>Members</H2>
      <MemberList>
        {(data?.union?.users || []).map((user) => (
          <Li key={user.id}>
            <Member member={user} />
          </Li>
        ))}
      </MemberList>
    </>
  );
};

const Member = ({ member }: { member: UserRoleDetailFragment }) => {
  const { data } = useFetchJsonFromCid<UserMetadata>(
    member.user.metadata || undefined
  );

  return (
    <li key={member.id}>
      {data?.name || member.user.id} {member?.isAdmin ? '[admin]' : ''}
    </li>
  );
};
