import styled from '@emotion/styled';

export const PrimaryButton = styled.button`
  padding: 15px 20px;
  flex: 1;
  background-color: ${(props) => props.theme.colors.color1};
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
