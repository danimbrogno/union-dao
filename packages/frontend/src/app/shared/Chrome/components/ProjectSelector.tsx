import React from 'react';
import styled from '@emotion/styled';

const StyledSelect = styled.select`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.color6};
  border: 1px solid ${(props) => props.theme.colors.white};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
`;

const ProjectSelector = () => {
  const [selectedProject, setSelectedProject] = React.useState('');

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  return (
    <StyledSelect value={selectedProject} onChange={handleProjectChange}>
      <option value="project1">Project 1</option>
      <option value="project2">Project 2</option>
      <option value="project3">Project 3</option>
    </StyledSelect>
  );
};

export default ProjectSelector;
