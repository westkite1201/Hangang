import { Route } from 'react-router-dom';
import React, { useEffect } from 'react';
//import TodoContainer from './containers/TodoContainer';
import HangangContainer from './containers/HangangContainer';
import HangangAdminContainer from './containers/HangangAdminContainer';
import HangangSubmitQoutesContainer from './containers/HangangSubmitQoutesContainer';
import QuotesGridViewComponent from './containers/QuotesGridViewComponent';
import QuotesMakerContainer from './containers/QuotesMakerContainer';
import AboutContainer from './containers/AboutContainer';
import QuotesManageContainer from './containers/QuotesManageContainer';
import PreviewContainer from './containers/PreviewContainer';
import LoginContainer from './containers/LoginContainer';
import WaveContainer from './containers/WaveContainer';
export default (props) => {
  return (
    <div>
      <Route exact path="/" component={HangangContainer} />
      <Route exact path="/wave" component={WaveContainer} />
      {/*<Route exact path="/todo" component={TodoContainer} />*/}
      <Route exact path="/admin" component={HangangAdminContainer} />
      <Route
        exact
        path="/submit-qoutes"
        component={HangangSubmitQoutesContainer}
      />

      <Route exact path="/about" component={AboutContainer} />
      <Route exact path="/quotes" component={QuotesGridViewComponent}></Route>
      <Route exact path="/quotesmaker" component={QuotesMakerContainer}></Route>
      <Route
        exact
        path="/quotesmanage"
        component={QuotesManageContainer}
      ></Route>
      <Route exact path="/preview" component={PreviewContainer}></Route>
      <Route exact path="/login" component={LoginContainer}></Route>
    </div>
  );
};
