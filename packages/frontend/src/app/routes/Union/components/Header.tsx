import styled from '@emotion/styled';
import { UnionMetadata } from 'frontend/app.interface';
import { useFetchJsonFromCid, useIPFS } from 'frontend/shared/IPFS';
import { UnionDetailsQuery } from 'graphclient';

const HeaderContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;
const UnionImgContainer = styled.div`
  display: flex;
  height: 160px;
  width: 160px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  display: flex;
  max-width: 320px;
  margin: auto;
`;

const StyledDescription = styled.p`
  display: flex;
  font-size: 18px;
  line-height: 1.5rem;
`;

const Row = styled.p`
  display: flex;
  gap: 1rem;
`;

export const Header = ({
  unionDetailQuery,
}: {
  unionDetailQuery: UnionDetailsQuery;
}) => {
  const { gatewayUrl } = useIPFS();
  const { data } = useFetchJsonFromCid<UnionMetadata>(
    unionDetailQuery.union?.metadata
  );

  if (!unionDetailQuery.union) return null;

  return (
    <HeaderContainer>
      {data?.name && <h1>{data?.name}</h1>}
      <Row>
        {data?.logo && (
          <UnionImgContainer>
            <StyledImg src={gatewayUrl(data.logo)} alt={data.name} />
          </UnionImgContainer>
        )}
        {data?.description && (
          <StyledDescription>{data?.description}</StyledDescription>
        )}
      </Row>
    </HeaderContainer>
  );
};
