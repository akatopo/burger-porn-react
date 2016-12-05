import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
// import { push } from 'react-router-redux';
import { hashHistory } from 'react-router';

import BurgerContainer from './BurgerContainer';

function fetchBurger(id) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_BURGER' });
    const url = `http://localhost:3000/api/v1/burgers/${id || 'hungry'}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const burger = res.burgers[0];
        hashHistory.replace(`/burgers/${burger.id}`);
        return dispatch({ type: 'RECEIVE_BURGER', burger });
        // dispatch(push(`/burgers/${burger.id}`));
      });
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
  onLoveButtonClicked: () => dispatch({ type: 'TOGGLE_LOVE' }),
  onShareButtonClicked: () => dispatch({ type: 'TOGGLE_SHARE' }),
  onLocationButtonClicked: () => dispatch({ type: 'TOGGLE_LOCATION' }),
  onShareGroupFocusLost: () => dispatch({ type: 'HIDE_SHARE' }),
  onLocationGroupFocusLost: () => dispatch({ type: 'HIDE_LOCATION' }),
  onWindowResized: (windowWidth) => dispatch({ type: 'SET_WINDOW_WIDTH', windowWidth }),
  fetchBurger: (id) => dispatch(fetchBurger(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerContainer);
