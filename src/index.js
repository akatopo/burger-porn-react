import app from './app';
import routes from './routes';
import Layout from './layout';

import burger from './royale-with-cheese.json';
import './focusLost';

const identity = (x) => x;

const toggleReducer = (boundActionType) =>
  (prevState, action) => (
    (action.type === boundActionType) ?
      !prevState :
      prevState
  );

const boolReducer = (toBool, boundActionType) =>
  (prevState, action) => (
    (action.type === boundActionType) ?
      toBool :
      prevState
  );

export const reducers = {
  title: identity,
  burger: identity,
  isLoved: toggleReducer('TOGGLE_LOVE'),
  isShareGroupExpanded: (prevState, action) => {
    switch (action.type) {
      case 'TOGGLE_SHARE':
        return toggleReducer('TOGGLE_SHARE')(prevState, action);
      case 'HIDE_SHARE':
        return boolReducer(false, 'HIDE_SHARE')(prevState, action);
      default:
        return prevState;
    }
  },
  isLocationGroupExpanded: (prevState, action) => {
    switch (action.type) {
      case 'TOGGLE_LOCATION':
        return toggleReducer('TOGGLE_LOCATION')(prevState, action);
      case 'HIDE_LOCATION':
        return boolReducer(false, 'HIDE_LOCATION')(prevState, action);
      default:
        return prevState;
    }
  },
};

export const initialState = {
  title: 'Burger Porn',
  isLoved: false,
  isShareGroupExpanded: false,
  isLocationGroupExpanded: false,
  burger,
};

app({ reducers, initialState, Layout, routes }).render();
