import { useConfig } from 'frontend/shared/Config';
import { UnionDetailsDocument, UnionDetailsQuery, execute } from 'graphclient';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QR from 'react-qr-code';
import { PendingApplication } from './components/PendingApplication';
import { UserUnionContext } from './shared/UnionUserContext';
import { MembersList } from './components/MembersList';
import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import { Header } from './components/Header';
import { Proposals } from './components/Proposals';

const UnionPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Column = styled.div`
  flex: 1;
`;

export const Union = () => {
  const { id } = useParams<'id'>();
  const { appUrl } = useConfig();
  const [unionDetailQuery, setUnionDetailQuery] = useState<UnionDetailsQuery>();

  if (!id) throw new Error(`ID not set`);
  const fetchUnionDetail = useCallback(async () => {
    if (!id) return;

    const result = await execute(UnionDetailsDocument, { id });
    if (result.data) {
      setUnionDetailQuery(result.data);
    }
  }, [id]);

  useEffect(() => {
    fetchUnionDetail();
  }, [fetchUnionDetail]);

  if (unionDetailQuery?.union) {
    const joinUrl = `${appUrl}/union/${id}/join`;
    return (
      <Chrome>
        <UserUnionContext>
          <UnionPage>
            <Header unionDetailQuery={unionDetailQuery} />
            <Columns>
              <Column>
                <Proposals id={id} unionDetailQuery={unionDetailQuery} />
              </Column>
              <Column>
                <MembersList />
              </Column>
            </Columns>

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
              <Link to={`/union/${id}/join`}>{joinUrl}</Link>
            </p>
            <QR value={joinUrl} />
          </UnionPage>
        </UserUnionContext>
      </Chrome>
    );
  }
};
