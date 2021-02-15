// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  mode: {
    mainBackground: '#292B2E',
    primaryText: '#fff',
    secondaryText: 'rgba(255,255,255,0.45)',
    disable: 'rgba(255,255,255,0.25)',
    border: '#d1d5da',
    divider: 'rgba(255, 255, 255, 0.6)',
    background: 'rgb(217, 223, 226)',
    tableHeader: 'rgba(255,255,255,0.02)',
    themeIcon: '#FBE302',
    // point-color
    blue1: '#f1f8ff',
    blue2: '#c0d3eb',
    blue3: '#00adb5',
    green: '#1fab89',
    gray1: '#393e46'
  },
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta'
  },
  fontSizes: {
    xsm: '10px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '28px'
  },

  fontWeights: {
    extraBold: 800,
    bold: 700,
    semiBold: 600,
    regular: 400
  }
};

export { myTheme };
