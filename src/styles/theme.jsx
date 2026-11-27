const baseTheme = {
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: 1.4
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  }
};

export const theme = {
  light: {
    ...baseTheme,
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      background: {
        primary: '#FFFFFF',
        secondary: '#F2F2F7'
      },
      text: {
        primary: '#000000',
        secondary: '#8E8E93',
        tertiary: '#C7C7CC'
      },
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      white: '#FFFFFF'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
    }
  },
  dark: {
    ...baseTheme,
    colors: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      background: {
        primary: '#000000',
        secondary: '#1C1C1E'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#EBEBF5',
        tertiary: '#8E8E93'
      },
      success: '#30D158',
      warning: '#FF9F0A',
      error: '#FF453A',
      white: '#FFFFFF'
    },
    shadows: {
      sm: '0 1px 2px rgba(255, 255, 255, 0.05)',
      md: '0 4px 6px rgba(255, 255, 255, 0.1)',
      lg: '0 10px 15px rgba(255, 255, 255, 0.1)'
    }
  }
}; 