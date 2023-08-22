import styled from '@emotion/styled';

export const IconButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.color1};
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.colors.color2};
  }
  &:disabled {
    color: ${(props) => props.theme.colors.color3};
    cursor: not-allowed;
  }
`;
