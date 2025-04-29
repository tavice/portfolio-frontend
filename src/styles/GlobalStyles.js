import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    line-height: ${theme.typography.body.lineHeight};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.h1.fontWeight};
    line-height: ${theme.typography.h1.lineHeight};
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.typography.h1.fontSize};
  }

  h2 {
    font-size: ${theme.typography.h2.fontSize};
  }

  h3 {
    font-size: ${theme.typography.h3.fontSize};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily};
    border: none;
    background: none;
    cursor: pointer;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    transition: all ${theme.transitions.default};

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .section {
    padding: ${theme.spacing.xxl} 0;
  }

  .card {
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.md};
    transition: transform ${theme.transitions.default}, box-shadow ${theme.transitions.default};

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  }
`; 