import { useConfig } from 'frontend/shared/Config';
import { UnionDetailsDocument, UnionDetailsQuery, execute } from 'graphclient';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MembersList } from './components/MembersList';
import Chrome from 'frontend/shared/Chrome/Chrome';
import styled from '@emotion/styled';
import { Header } from './components/Header';
import { Proposals } from './components/Proposals';
import { useUnionIdParam } from 'frontend/shared/useUnionIdParam';
import { numberToHex } from 'viem';
import { PendingApplications } from './components/PendingApplications/PendingApplications';

const UnionPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

const Column = styled.div`
  flex: 1 0 33%;
`;

export const Union = () => {
  const unionId = useUnionIdParam();
  const { appUrl } = useConfig();
  const [unionDetailQuery, setUnionDetailQuery] = useState<UnionDetailsQuery>();

  const fetchUnionDetail = useCallback(async () => {
    const result = await execute(UnionDetailsDocument, {
      id: numberToHex(parseInt(unionId), { size: 32 }),
    });
    if (result.data) {
      setUnionDetailQuery(result.data);
    }
  }, [unionId]);

  const handleApproved = () => {
    fetchUnionDetail();
  };

  useEffect(() => {
    fetchUnionDetail();
  }, [fetchUnionDetail]);

  if (unionDetailQuery?.union) {
    return (
      <Chrome>
        <UnionPage>
          <Header unionDetailQuery={unionDetailQuery} />
          <Columns>
            <Column>
              <Proposals unionDetailQuery={unionDetailQuery} />
            </Column>
            <Column>
              <MembersList unionDetailQuery={unionDetailQuery} />
            </Column>
            <Column>
              <PendingApplications
                onApproved={handleApproved}
                unionDetailQuery={unionDetailQuery}
              />
            </Column>
          </Columns>
        </UnionPage>
      </Chrome>
    );
  }
};
