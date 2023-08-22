import styled from '@emotion/styled';

export const SecondaryButton = styled.button`
  padding: 10px 15px;
  width: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.colors.color4};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.color2};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.color3};
    cursor: not-allowed;
  }
`;
