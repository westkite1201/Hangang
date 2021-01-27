import React, { ReactNode } from 'react';
import Sidebar from '../components/common/Sidebar';
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Sidebar />
    {children}
    {/* <script type='text/javascript' src='/static/js/naveridlogin_js_sdk_2.0.2.js'></script> */}
    <script type='text/javascript' src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js'></script>
  </div>
);

export default Layout;
