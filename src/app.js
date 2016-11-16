/* global location:false, document:false */

import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { combineReducers } from 'redux-immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import getDevTools from './devTools';
import getRoutes from './routes';

const IS_PROD = process.env.NODE_ENV !== 'development';
const NOOP = () => null;

const DevTools = IS_PROD ? NOOP : getDevTools();

const initialEnhancers = IS_PROD ? [] : [
  DevTools.instrument(),
  persistState(location.href.match(/[?&]debug_session=([^&]+)\b/)),
];

export default (options) => {
  const {
    initialState = {},
    loggerOptions = {},
    middleware = [],
    reducers = {},
    enhancers = {},
  } = options;

  const frozen = Immutable.fromJS(initialState);

  const routing = (state = frozen, action) => (
    action.type === LOCATION_CHANGE ?
      state.merge({ locationBeforeTransitions: action.payload }) :
      state
  );

  const initialMiddleware = [createLogger(loggerOptions)];

  const store = createStore(
    combineReducers({ ...reducers, routing }),
    frozen,
    compose(
      applyMiddleware(...initialMiddleware, ...middleware),
      ...initialEnhancers,
      ...enhancers
    )
  );

  const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: (state) => (state.has('routing') ? state.get('routing').toJS() : null),
  });

  const devToolsWrapper = (Component) => {
    const wrapper = (props) => (
      <div id="wrapper">
        <Component {...props} />
        <DevTools />
      </div>
    );
    wrapper.displayName = 'devToolsWrapper';

    return wrapper;
  };

  return {
    store,
    history,
    render(rootElement = document.getElementById('root')) {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            {getRoutes(devToolsWrapper)}
          </Router>
        </Provider>,
        rootElement
      );
    },
  };
};
