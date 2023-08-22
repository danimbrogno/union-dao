import styled from '@emotion/styled';

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px 8px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.color3};
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  font-family: 'Arial', 'sans-serif';
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.color5};
  }
`;
