import React, { ReactNode } from 'react';
import Head from 'next/head';
import Sidebar from '../components/common/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children?: ReactNode;
  title?: string;
};
// global style 에서 폰트를 임포트할경우 re-rendering 이슈로 여기서 진행하도록함
const fontStyle = `@font-face {
  font-family: 'NotoSansKR-Medium';
  src: local('NotoSansKR-Medium'),
    url('/fonts/NotoSansKR-Medium.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'NanumMyeongjo';
  src: url('/fonts/NanumMyeongjo.ttf');
}
@font-face {
  font-family: 'JejuMyeongjo';
  src: url('/fonts/JejuMyeongjo-Regular.ttf') format('ttf');
}
@font-face {
  font-family: 'BlackHanSans-Regular';
  src: local('BlackHanSans-Regular'),
    url('/fonts/black-han-sans-v8-korean-regular.woff2') format('woff2'); // pattern: /directoryName/file.extension
  font-display: swap;
}
@font-face {
  font-family: 'NanumBrushScript-Regular';
  src: url('/fonts/NanumBrushScript-Regular.ttf'); // pattern: /directoryName/file.extension
}
@font-face {
  font-family: 'NanumSquareR';
  src: url('/fonts/NanumSquareR.woff'); // pattern: /directoryName/file.extension
}`;

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>HANGANG</title>
        <link rel="shortcut icon" href="/images/hangang.ico" />
        <meta property="og:title" content="HANGANGÍ" key="title" />
        <script
          type="text/javascript"
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"
        ></script>
        <script
          type="text/javascript"
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
        <style>{fontStyle}</style>
      </Head>
      <ToastContainer />
      {router.pathname !== '/login' ||
        (router.pathname.includes('admin') && <Sidebar />)}
      {children}
      {/* <script type='text/javascript' src='/static/js/naveridlogin_js_sdk_2.0.2.js'></script> */}
    </div>
  );
};

export default Layout;
