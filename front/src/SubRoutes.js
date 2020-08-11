import { Route } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
//import TodoContainer from './containers/TodoContainer';
import HangangContainer from './containers/HangangContainer';
import HangangAdminContainer from './containers/HangangAdminContainer';
import HangangSubmitQoutesContainer from './containers/HangangSubmitQoutesContainer';
import QuotesGridViewComponent from './containers/QuotesGridViewComponent';
import QuotesMakerContainer from './containers/QuotesMakerContainer';
export default (props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <Route exact path="/" component={HangangContainer} />
      {/*<Route exact path="/todo" component={TodoContainer} />*/}
      <Route exact path="/admin" component={HangangAdminContainer} />
      <Route
        exact
        path="/submit-qoutes"
        component={HangangSubmitQoutesContainer}
      />
      <Route exact path="/quotes" component={QuotesGridViewComponent}></Route>
      <Route exact path="/quotesmaker" component={QuotesMakerContainer}></Route>
    </div>
  );
};
