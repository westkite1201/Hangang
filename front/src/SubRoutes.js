import { Route } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
import TodoContainer from './containers/TodoContainer';
import WriteContainer from './containers/WriteContainer';
import NoteConatiner from './containers/NoteContainer';

export default (props) => {
  // 새로고침하거나 화면 이동시 팝업 초기화
  useEffect(() => {}, []);

  return (
    <Fragment>
      {/*<Route exact path="/" component={ViewMap} />*/}
      <Route exact path="/todo" component={TodoContainer} />
      <Route exact path="/write" component={WriteContainer} />
      <Route exact path="/note" component={NoteConatiner} />
      {/* <Route exact component={ErrorPage} /> */}
    </Fragment>
  );
};
