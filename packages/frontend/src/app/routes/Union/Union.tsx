import { useConfig } from 'frontend/shared/Config';
import { UnionDetailsDocument, UnionDetailsQuery, execute } from 'graphclient';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { hexToBigInt } from 'viem';
import QR from 'react-qr-code';
import { PendingApplication } from './components/PendingApplication';
import { UserUnionContext } from './shared/UnionUserContext';

export const Union = () => {
  const params = useParams();
  const { appUrl } = useConfig();
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
    const joinUrl = `${appUrl}/union/${params.id}/join`;
    return (
      <UserUnionContext>
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
          <h2>Pending Members</h2>
          <ul>
            {unionDetailQuery.union.pendingApplications.map((application) => (
              <li key={application.id}>
                <PendingApplication {...application} />
              </li>
            ))}
          </ul>
          <h2>Join URL</h2>
          <p>
            <Link to={`/union/${params.id}/join`}>{joinUrl}</Link>
          </p>
          <QR value={joinUrl} />
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="./proposal/create">Create a Proposal</Link>
            </li>
          </ul>
        </div>
      </UserUnionContext>
    );
  }
};
