import { UnionDetailsQuery } from 'graphclient';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { ProposalMetadata } from 'frontend/app.interface';
import { Hex, hexToNumber } from 'viem';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';

const Link = styled(RouterLink)`
  /* color: inherit;
  text-decoration: none; */
`;

const H2 = styled.h2``;

const ProposalList = styled.ul`
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
  unionDetailQuery,
}: {
  unionDetailQuery: UnionDetailsQuery;
}) => {
  const unionId = useUnionIdParam();

  if (!unionDetailQuery.union) return null;

  const { proposals } = unionDetailQuery.union;

  let content: React.ReactNode = null;

  if (proposals.length === 0) {
    content = (
      <>
        <P>No proposals created yet.</P>
        <Link to={`/union/${unionId}/proposal/create`}>
          Create the first proposal
        </Link>
      </>
    );
  } else {
    content = (
      <div css={{ marginTop: 20 }}>
        <Link to={`/union/${unionId}/proposal/create`}>
          Create a new proposal
        </Link>
      </div>
    );
  }

  const proposalIdToLink = (pid: string) => {
    const [_unionId, _proposalId] = pid.split('.');
    if (!_unionId || !_proposalId) {
      throw new Error('Missing id');
    }

    return `/union/${hexToNumber(
      _unionId as Hex
    ).toString()}/proposal/${hexToNumber(_proposalId as Hex).toString()}`;
  };

  return (
    <>
      <H2>Proposals</H2>
      <ProposalList>
        {proposals.map((proposal) => (
          <Li key={proposal.id}>
            <Link to={proposalIdToLink(proposal.id)}>
              <ProposalItem cid={proposal.metadata} />
            </Link>
          </Li>
        ))}
      </ProposalList>
      {content}
    </>
  );
};

const ProposalItem = ({ cid }: { cid: string }) => {
  const { data } = useFetchJsonFromCid<ProposalMetadata>(cid);
  return data?.title || data?.description;
};
