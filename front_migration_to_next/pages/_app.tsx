// pages/_app.js
import Link from "next/link";
import { wrapper } from "../store";
import GlobalStyles from "../styles/global-styles";
import { ThemeProvider } from "../styles/themed-components";
import theme from "../styles/theme";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }) => {
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
