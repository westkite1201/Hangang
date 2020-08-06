import { Route } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
//import TodoContainer from './containers/TodoContainer';
import HangangContainer from './containers/HangangContainer';
import HangangAdminContainer from './containers/HangangAdminContainer';
import HangangSubmitQoutesContainer from './containers/HangangSubmitQoutesContainer';

export default (props) => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <Route exact path="/" component={HangangContainer} />
      {/*<Route exact path="/todo" component={TodoContainer} />*/}
      <Route exact path="/admin" component={HangangAdminContainer} />
      <Route exact path="/submit-qoutes" component={HangangSubmitQoutesContainer} />
    </Fragment>
  );
};
