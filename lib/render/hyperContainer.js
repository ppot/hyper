import {connect} from '../utils/plugins';
import * as uiActions from '../actions/ui';
import HyperComponent from './hyperComponent';

const isMac = /Mac/.test(navigator.userAgent);

const HyperContainer = connect(
  state => {
    return {
      isMac,
      customCSS: state.ui.css,
      uiFontFamily: state.ui.uiFontFamily,
      borderColor: state.ui.borderColor,
      activeSession: state.sessions.activeUid,
      backgroundColor: state.ui.backgroundColor,
      maximized: state.ui.maximized,
      lastConfigUpdate: state.ui._lastUpdate
    };
  },
  dispatch => {
    return {
      execCommand: (command, fn, e) => {
        dispatch(uiActions.execCommand(command, fn, e));
      }
    };
  },
  null,
  {withRef: true}
)(HyperComponent, 'Hyper');

export default HyperContainer;
