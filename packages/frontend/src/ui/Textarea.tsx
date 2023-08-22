import styled from '@emotion/styled';

export const Textarea = styled.textarea`
  border-radius: 5px;
  padding: 10px 8px;
  height: 140px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: 'Arial', 'sans-serif';
  border: 1px solid ${({ theme }) => theme.colors.color3};
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.color5};
  }
`;
