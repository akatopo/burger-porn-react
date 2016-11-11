import { connect } from 'react-redux';
import BurgerContainer from './BurgerContainer';


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
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerContainer);
