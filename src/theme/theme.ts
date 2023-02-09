import { createTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headerTable?: CSSProperties;
    textBold?: CSSProperties;
    price?: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    headerTable?: CSSProperties;
    textBold?: CSSProperties;
    price?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headerTable?: true;
    textBold?: true;
    price?: true;
  }
}

const myTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      white: '#fff',
    },
    primary: {
      main: '#1AA6EE',
      light: '#E8F6FD',
      '100': '#0A89CA',
      '200': '#41B9F7',
    },
    secondary: {
      main: '#FFB600',
      light: '#2D9AFF',
    },
    background: {
      default: '#fff',
    },
    error: {
      main: '#FF2727',
    },
    success: {
      main: '#33CC7F',
      light: '#27AE60',
    },
    grey: {
      '600': '#00314A',
      '300': '#475461',
      '100': '#0C1132',
      '700': '#858C93',
      '200': '#45485E',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'inherit',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontSize: 14,
          color: '#fff',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
        },
        outlined: {
          color: '#1AA6EE',
          ':hover': {
            backgroundColor: '#1AA6EE',
            color: '#fff',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px',
          color: '#45485E',
          fontWeight: '400',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Google Sans', 'sans-serif'].join(','),
    subtitle1: {
      color: '#1AA6EE',
    },
    body2: {
      fontSize: '14px',
      color: '#0C1132',
      fontWeight: '400',
      margin: '5px 0',
    },
    headerTable: {
      color: '#858C93',
      fontSize: '14px',
      fontWeight: '400',
    },
    textBold: {
      color: '#0C1132',
      fontSize: '14px',
      fontWeight: '500',
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '20px',
    },
    h5: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FF2727',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
      xl: 1440,
      mobile: 0,
      tablet: 640,
      laptop: 1025,
      desktop: 1200,
    },
  },
});

export default myTheme;
