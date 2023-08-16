import {
  UnionDetailsDocument,
  UnionDetailsQuery,
  execute,
} from '../../../../.graphclient';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { hexToBigInt } from 'viem';

export const Union = () => {
  const params = useParams();
  const [unionDetailQuery, setUnionDetailQuery] = useState<UnionDetailsQuery>();

  const fetchUnionDetail = useCallback(async () => {
    if (!params.id) return;

    const result = await execute(UnionDetailsDocument, { id: params.id });
    if (result.data) {
      setUnionDetailQuery(result.data);
    }
  }, [params.id]);

  useEffect(() => {
    fetchUnionDetail();
  }, [fetchUnionDetail]);

  if (unionDetailQuery?.union) {
    return (
      <div>
        <h1>
          {hexToBigInt(unionDetailQuery.union.id).toString()}:{' '}
          {unionDetailQuery.union.name}
        </h1>
        <p>{unionDetailQuery.union.logo}</p>
        <p>{unionDetailQuery.union.description}</p>
        <h2>Proposals</h2>
        <ul>
          {unionDetailQuery.union.proposals.map((proposal) => (
            <li key={proposal.id}>
              <Link to={`/union/${params.id}/proposal/${proposal.id}`}>
                Proposal: {proposal.id}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="./proposal/create">Create a Proposal</Link>
      </div>
    );
  }
  return null;
};
