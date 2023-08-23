import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  GetUserUnionsDocument,
  GetUserUnionsQuery,
  execute,
} from 'graphclient';
import { useAccount } from 'wagmi';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchJsonFromCid } from 'frontend/shared/IPFS';
import { UnionMetadata } from 'frontend/app.interface';

const StyledSelect = styled.select`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.color6};
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
`;

export const ProjectSelector = () => {
  const { address } = useAccount();
  const { unionId } = useParams<'unionId'>();
  const navigate = useNavigate();

  const [userUnionsQuery, setUserUnionsQuery] = useState<GetUserUnionsQuery>();
  useEffect(() => {
    const load = () => {
      execute(GetUserUnionsDocument, { id: address }).then((result) => {
        setUserUnionsQuery(result.data);
      });
    };

    load();
  }, [address]);

  const handleUnionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== '') {
      navigate(`/union/${event.currentTarget.value}`);
    } else {
      navigate('/');
    }
  };

  const roles = userUnionsQuery?.user?.roles;

  if (!roles) {
    return null;
  }

  return (
    <StyledSelect value={unionId} onChange={handleUnionChange}>
      <option key="null" value="">
        Select a Union
      </option>
      {roles.map(({ union }) => (
        <Option union={union} />
      ))}
    </StyledSelect>
  );
};

const Option = ({
  union: { metadata, id },
}: {
  union: { metadata: string; id: string };
}) => {
  const { data } = useFetchJsonFromCid<UnionMetadata>(metadata);
  return <option value={parseInt(id, 16)}>{data?.name}</option>;
};
