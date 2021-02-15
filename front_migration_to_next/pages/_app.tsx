// pages/_app.js
import { useEffect } from 'react';
import { wrapper } from '../store';
import GlobalStylesWrapper from '../styles/global-styles';
import styled, { ThemeProvider } from 'styled-components';
import { dark, light, fontSizes, fontWeights } from '../styles/theme';
import { myTheme } from '../styles/my-theme';
import { useDarkMode } from '../hooks/useDarkMode';
import Layout from '../components/Layout';
import Toggle from '../components/common/Toggle';
import Router from 'next/router';
import initGA from '../lib/ga';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyApp = ({ Component, pageProps }) => {
  const [themeMode, toggleTheme] = useDarkMode();
  const theme =
    themeMode === 'light'
      ? { ...myTheme, mode: light }
      : { ...myTheme, mode: dark };

  useEffect(() => {
    initGA(process.env.NEXT_PUBLIC_GA_APP_ID, Router);
  }, []);

  return (
    <div>
      <GlobalStylesWrapper theme={theme} />
      <ThemeProvider theme={theme}>
        <Toggle themeMode={themeMode} toggleTheme={toggleTheme} />
        <St.Background>
          <Layout>
            <Component {...pageProps} themeMode={themeMode} />
          </Layout>
        </St.Background>
        <div
          style={{
            padding: '20px',
            position: 'fixed',
            width: '100%',
            bottom: 0,
            color: 'white',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <span>💜 Spreading values, TEAM D_D💜</span>
        </div>
      </ThemeProvider>
    </div>
  );
};
const St = {
  Background: styled.div`
    //background-color: ${({ theme }) => theme.mode.mainBackground};
    height: 100%;
  `
};

export default wrapper.withRedux(MyApp);
