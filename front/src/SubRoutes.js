import { Route } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
//import TodoContainer from './containers/TodoContainer';
import HangangContainer from './containers/HangangContainer';

export default (props) => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <Route exact path="/" component={HangangContainer} />
      {/*<Route exact path="/todo" component={TodoContainer} />*/}
    </Fragment>
  );
};
