// pages/_app.js
import Link from "next/link";
import { wrapper } from "../store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>Index</a>
        </Link>
        |
        <Link href="/notes">
          <a>Notes</a>
        </Link>
      </div>
      <Component {...pageProps} />
    </div>
  );
};

export default wrapper.withRedux(MyApp);
