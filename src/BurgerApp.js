import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

import BurgerContainer from './BurgerContainer';

function fetchBurger(/* id */) {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_BURGER' });

    fetch('http://localhost:3000/api/v1/burgers/hungry')
      .then((res) => res.json())
      .then((res) =>
        dispatch({ type: 'RECEIVE_BURGER', burger: res.burgers[0] })
      );
  };
}

const mapStateToProps = (state) => ({
  burger: state.get('burger').toJS(),
  isLoved: state.get('isLoved'),
  isShareGroupExpanded: state.get('isShareGroupExpanded'),
  isLocationGroupExpanded: state.get('isLocationGroupExpanded'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoveButtonClicked: () => dispatch({ type: 'TOGGLE_LOVE' }),
  onShareButtonClicked: () => dispatch({ type: 'TOGGLE_SHARE' }),
  onLocationButtonClicked: () => dispatch({ type: 'TOGGLE_LOCATION' }),
  onShareGroupFocusLost: () => dispatch({ type: 'HIDE_SHARE' }),
  onLocationGroupFocusLost: () => dispatch({ type: 'HIDE_LOCATION' }),
  fetchBurger: (id) => dispatch(fetchBurger(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerContainer);
