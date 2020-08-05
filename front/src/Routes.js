import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import SubRoutes from './SubRoutes';
import TopBar from './component/common/TopBar';
const Routes = ({ history }) => {
  return (
    <div className="contbody_scroll">
      <TopBar />
      <Switch>
        <SubRoutes history={history} />
      </Switch>
    </div>
  );
};

export default Routes;
