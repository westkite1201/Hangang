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
  </div>
);

export default Layout;
