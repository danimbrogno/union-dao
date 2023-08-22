import { UnionDetailsQuery } from 'graphclient';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { ProposalMetadata } from 'frontend/app.interface';

const Link = styled(RouterLink)`
  /* color: inherit;
  text-decoration: none; */
`;

const H2 = styled.h2``;

const Ul = styled.ul`
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

export const Proposals = ({
  id,
  unionDetailQuery,
}: {
  id: string;
  unionDetailQuery: UnionDetailsQuery;
}) => {
  if (!unionDetailQuery.union) return null;

  const { proposals } = unionDetailQuery.union;

  let content: React.ReactNode = null;

  if (proposals.length === 0) {
    content = (
      <>
        <P>No proposals created yet.</P>
        <Link to={`/union/${id}/proposal/create`}>
          Create a new proposal now.
        </Link>
      </>
    );
    content = (
      <>
        <P>No proposals created yet.</P>
        <Link to={`/union/${id}/proposal/create`}>
          Create the first proposal now.
        </Link>
      </>
    );
  }
  return (
    <>
      <H2>Proposals</H2>
      <Ul>
        {proposals.map((proposal) => (
          <Li key={proposal.id}>
            <Link to={`/union/${id}/proposal/${proposal.id}`}>
              <ProposalItem cid={proposal.metadata} />
            </Link>
          </Li>
        ))}
        <Li>{content}</Li>
      </Ul>
    </>
  );
};

const ProposalItem = ({ cid }: { cid: string }) => {
  const { data } = useFetchJsonFromCid<ProposalMetadata>(cid);
  return data?.description;
};
