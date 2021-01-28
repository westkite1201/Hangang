import React, { ReactNode } from 'react';
import Head from 'next/head';
import Sidebar from '../components/common/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>HANGANG</title>
      <link rel="shortcut icon" href="/images/hangang.ico" />
      <meta property="og:title" content="HANGANGÍ" key="title" />
      <script
        type="text/javascript"
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js"
      ></script>
    </Head>
    <ToastContainer />
    <Sidebar />
    {children}
    {/* <script type='text/javascript' src='/static/js/naveridlogin_js_sdk_2.0.2.js'></script> */}
  </div>
);

export default Layout;
