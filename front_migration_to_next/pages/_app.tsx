// pages/_app.js
import Link from 'next/link';
import { wrapper } from '../store';
import GlobalStyles from '../styles/global-styles';
import { ThemeProvider } from '../styles/themed-components';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};

export default wrapper.withRedux(MyApp);
