import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import SubRoutes from './SubRoutes';

const Routes = ({ history }) => {
  return (
    <div className="contbody_scroll">
      <Switch>
        <SubRoutes history={history} />
      </Switch>
    </div>
  );
};

export default Routes;
