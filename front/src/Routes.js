import React from 'react';
import { Switch } from 'react-router-dom';
import SubRoutes from './SubRoutes';
import SideBar from './component/common/SideBar';
const Routes = ({ history }) => {
  return (
    <div>
      <SideBar pageWrapId={'page-wrap'} outerContainerId={'App'} />
      <div id="page-wrap" style={{ overflow: 'hidden' }}>
        <Switch>
          <SubRoutes history={history} />
        </Switch>
      </div>
    </div>
  );
};

export default Routes;
