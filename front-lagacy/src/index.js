/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import client from './lib/graphql/client';
import { ApolloProvider } from '@apollo/react-hooks';
//import ApolloClient from 'apollo-boost';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from 'dotenv';
dotenv.config();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// const client = new ApolloClient({
//   uri: 'http://localhost:3031/graphql'
// });

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
