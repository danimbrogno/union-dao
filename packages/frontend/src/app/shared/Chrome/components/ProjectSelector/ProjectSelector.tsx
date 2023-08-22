import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  GetUserUnionsDocument,
  GetUserUnionsQuery,
  execute,
} from 'graphclient';
import { useAccount } from 'wagmi';

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
  const [userUnionsQuery, setUserUnionsQuery] = useState<GetUserUnionsQuery>();
  useEffect(() => {
    const load = () => {
      execute(GetUserUnionsDocument, { id: address }).then((result) => {
        setUserUnionsQuery(result.data);
      });
    };

    load();
  });

  const [selectedUnion, setSelectedUnion] = React.useState('');

  const handleUnionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnion(event.target.value);
  };

  const roles = userUnionsQuery?.user?.roles;

  if (!roles) {
    return null;
  }

  return (
    <StyledSelect value={selectedUnion} onChange={handleUnionChange}>
      {roles.map(({ union }) => (
        <option key={union.id} value={union.id}>
          {union.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default ProjectSelector;
