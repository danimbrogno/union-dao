import styled from '@emotion/styled';
import { UserMetadata } from 'frontend/app.interface';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';

import { UnionDetailsQuery, UserRoleDetailFragment } from 'graphclient';

const H2 = styled.h2``;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 0.5em 0;
`;

export const MembersList = ({
  unionDetailQuery,
}: {
  unionDetailQuery: UnionDetailsQuery;
}) => {
  const users = unionDetailQuery.union?.users || [];

  return (
    <>
      <H2>Members</H2>
      <MemberList>
        {users.map((user) => (
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
