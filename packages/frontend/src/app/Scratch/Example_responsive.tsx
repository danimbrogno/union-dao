import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

// Define a theme with colors, spacings, and breakpoints
const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
  },
  spacings: {
    small: '8px',
    medium: '16px',
    large: '32px',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
};

// A container that adjusts padding and color based on the viewport
const Container = styled.div`
  padding: ${props => props.theme.spacings.medium};
  background-color: ${props => props.theme.colors.primary};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacings.small};
    background-color: ${props => props.theme.colors.secondary};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacings.large};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        Content goes here.
      </Container>
    </ThemeProvider>
  );
}

export default App;

