// pages/_app.js
import { useEffect } from 'react';
import { wrapper } from '../store';
import GlobalStyles from '../styles/global-styles';
import { ThemeProvider } from '../styles/themed-components';
import theme from '../styles/theme';
import Layout from '../components/Layout';

import Router from 'next/router';
import initGA from '../lib/ga';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    initGA(process.env.NEXT_PUBLIC_GA_APP_ID, Router);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default wrapper.withRedux(MyApp);
