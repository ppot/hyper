import HeaderComponent from './headerComponent';
import {maximize, openHamburgerMenu, unmaximize, minimize, close} from '../../actions/header';
import {tabChange, tabClose} from '../../tab/tabActions';
import {connect} from '../../utils/plugins';

const isMac = /Mac/.test(navigator.userAgent);

const getTabReducer = ({tabReducer}) => {
  return {
    active: tabReducer.activeTab,
    all: tabReducer.tabs
  };
};

const HeaderContainer = connect(
  state => {
    return {
      isMac,
      tabs: getTabReducer(state),
      activeMarkers: state.ui.activityMarkers,
      borderColor: state.ui.borderColor,
      backgroundColor: state.ui.backgroundColor,
      maximized: state.ui.maximized,
      showHamburgerMenu: state.ui.showHamburgerMenu,
      showWindowControls: state.ui.showWindowControls
    };
  },
  dispatch => {
    return {
      onClose: i => {
        dispatch(tabClose(i));
      },

      onChange: i => {
        dispatch(tabChange(i));
      },

      maximize: () => {
        dispatch(maximize());
      },

      unmaximize: () => {
        dispatch(unmaximize());
      },

      openHamburgerMenu: coordinates => {
        dispatch(openHamburgerMenu(coordinates));
      },

      minimize: () => {
        dispatch(minimize());
      },

      close: () => {
        dispatch(close());
      }
    };
  }
)(HeaderComponent, 'Header');

export default HeaderContainer;
