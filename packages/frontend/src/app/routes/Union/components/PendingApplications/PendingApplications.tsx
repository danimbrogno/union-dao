import styled from '@emotion/styled';
import { UnionDetailsQuery, WatchUnionDetailsQuery } from 'graphclient';
import { Application } from './components/Application/Application';
import { useAccount } from 'wagmi';

const H2 = styled.h2``;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 0.5em 0;
`;

export const PendingApplications = ({
  unionDetailQuery,
  onApproved,
}: {
  unionDetailQuery: UnionDetailsQuery;
  onApproved: (data: WatchUnionDetailsQuery, unionId: string) => void;
}) => {
  if (!unionDetailQuery.union) {
    throw new Error('Union not set ');
  }
  const { address } = useAccount();
  const {
    pendingApplications,
    owner: { id },
  } = unionDetailQuery.union;

  const isAdmin = address?.toLowerCase() === id;

  return (
    <>
      <H2>Pending Members</H2>
      <MemberList>
        {pendingApplications.map((application) => (
          <Li key={application.id}>
            <Application
              onApproved={onApproved}
              isAdmin={isAdmin}
              application={application}
            />
          </Li>
        ))}
      </MemberList>
    </>
  );
};
