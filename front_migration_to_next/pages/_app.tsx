import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import wrapper from '../store/store';
//const store = configureStore();

const TestApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

TestApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default wrapper.withRedux(TestApp);
