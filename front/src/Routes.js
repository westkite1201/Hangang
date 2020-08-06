import React from 'react';
import { Switch } from 'react-router-dom';
import SubRoutes from './SubRoutes';
import SideBar from './component/common/SideBar';
const Routes = ({ history }) => {
  return (
    <div className="contbody_scroll" id="outer-container">
      <SideBar />
      <Switch>
        <SubRoutes history={history} />
      </Switch>
    </div>
  );
};

export default Routes;
