import styled from '@emotion/styled';
import { UnionDetailsQuery } from 'graphclient';
import { PendingApplication } from './components/PendingApplication';

const H2 = styled.h2``;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 0.5em 0;
`;

export const PendingMembers = ({
  unionDetailQuery,
}: {
  unionDetailQuery: UnionDetailsQuery;
}) => {
  if (!unionDetailQuery.union) {
    throw new Error('Union not set ');
  }
  const { pendingApplications } = unionDetailQuery.union;

  return (
    <>
      <H2>Members</H2>
      <MemberList>
        {pendingApplications.map((application) => (
          <Li key={application.id}>
            <PendingApplication application={application} />
          </Li>
        ))}
      </MemberList>
    </>
  );
};
