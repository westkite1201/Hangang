import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createReducer from "./rootReducer";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  const logger = createLogger();
  const enhancer = compose(
    process.env.NODE_ENV !== "production"
      ? applyMiddleware(logger)
      : composeWithDevTools(applyMiddleware(logger))
  );
  const store = createStore(createReducer(), enhancer);
  return store;
};

export const wrapper = createWrapper(configureStore, { debug: true });

