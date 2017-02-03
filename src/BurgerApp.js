/* global localStorage:false, window: false */

import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
// import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

import BurgerContainer from './BurgerContainer';

const IS_PROD = process.env.NODE_ENV !== 'development';
const baseApiUrl = IS_PROD ? process.env.BASE_API_URL : 'http://localhost:3000';

function fetchToken() {
  const tokenUrl = `${baseApiUrl}/api/v1/token`;
  const localToken = localStorage.getItem('token');

  const tokenPromise = (!localToken || localToken === '') ?
    fetch(tokenUrl) :
    Promise.resolve({ json: () => ({ token: localToken }) });
  return tokenPromise.then((res) => res.json());
}

function fetchBurger(id) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_BURGER' });
    const url = `${baseApiUrl}/api/v1/burgers/${id || 'hungry'}`;

    const tokenPromise = fetchToken();

    const burgerPromise = fetch(url)
      .then((res) => res.json());

    Promise.all([tokenPromise, burgerPromise])
      .then((values) => {
        const [tokenJson, burgerJson] = values;
        const burger = burgerJson.burgers[0];
        const token = tokenJson.token;
        window.console.log(token);
        localStorage.setItem('token', token);
        browserHistory.replace(`/burgers/${burger.id}`);
        return dispatch({ type: 'RECEIVE_BURGER', burger });
        // dispatch(push(`/burgers/${burger.id}`));
      });
  };
}

function toggleLove(id, wasLoved) {
  const url = `${baseApiUrl}/api/v1/${wasLoved ? 'unlove' : 'love'}/${id}`;
  const tokenPromise = fetchToken();
  tokenPromise.then((tokenJson) => {
    const accessToken = tokenJson.token;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    });
  });
}

function onLoveButtonClicked(id, wasLoved) {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_LOVE' });
    toggleLove(id, wasLoved);
  };
}

const mapStateToProps = (state) => ({
  burger: state.get('burger').toJS(),
  isLoved: state.get('isLoved'),
  isShareGroupExpanded: state.get('isShareGroupExpanded'),
  isLocationGroupExpanded: state.get('isLocationGroupExpanded'),
  windowWidth: state.get('windowWidth'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoveButtonClicked: (id, wasLoved) => dispatch(onLoveButtonClicked(id, wasLoved)),
  onShareButtonClicked: () => dispatch({ type: 'TOGGLE_SHARE' }),
  onLocationButtonClicked: () => dispatch({ type: 'TOGGLE_LOCATION' }),
  onShareGroupFocusLost: () => dispatch({ type: 'HIDE_SHARE' }),
  onLocationGroupFocusLost: () => dispatch({ type: 'HIDE_LOCATION' }),
  onWindowResized: (windowWidth) => dispatch({ type: 'SET_WINDOW_WIDTH', windowWidth }),
  fetchBurger: (id) => dispatch(fetchBurger(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerContainer);
