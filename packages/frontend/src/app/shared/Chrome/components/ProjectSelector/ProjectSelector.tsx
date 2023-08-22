import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  GetUserUnionsDocument,
  GetUserUnionsQuery,
  execute,
} from 'graphclient';
import { useAccount } from 'wagmi';
import { useNavigate, useParams } from 'react-router-dom';

const StyledSelect = styled.select`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.color6};
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
`;

const ProjectSelector = () => {
  const { address } = useAccount();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [userUnionsQuery, setUserUnionsQuery] = useState<GetUserUnionsQuery>();
  useEffect(() => {
    const load = () => {
      execute(GetUserUnionsDocument, { id: address }).then((result) => {
        setUserUnionsQuery(result.data);
      });
    };

    load();
  });

  const handleUnionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/union/${event.currentTarget.value}`);
  };

  const roles = userUnionsQuery?.user?.roles;

  if (!roles) {
    return null;
  }

  console.log(roles);

  return (
    <StyledSelect value={id} onChange={handleUnionChange}>
      <option key="null" value="">
        Select a Union
      </option>
      {roles.map(({ union }) => (
        <option key={union.id} value={union.id}>
          {union.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default ProjectSelector;
