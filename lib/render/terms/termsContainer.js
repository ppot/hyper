import TermsComponent from './termsComponent';
import {activeRequest} from '../../terms/termsActions';
import {sendSessionData, resizeSession} from '../../actions/sessions';
import {connect} from '../../utils/plugins';

const TermsContainer = connect(
  state => {
    const {sessions} = state.sessions;
    return {
      activeTab: state.tabsManager.activeTab,
      terms: state.termsManager.terms,
      term: state.termsManager.term,
      sessions,
      render: {
        cols: state.ui.cols,
        rows: state.ui.rows,
        scrollback: state.ui.scrollback,
        customCSS: state.ui.termCSS,
        write: state.sessions.write,
        fontSize: state.ui.fontSizeOverride ? state.ui.fontSizeOverride : state.ui.fontSize,
        fontFamily: state.ui.fontFamily,
        fontWeight: state.ui.fontWeight,
        fontWeightBold: state.ui.fontWeightBold,
        lineHeight: state.ui.lineHeight,
        letterSpacing: state.ui.letterSpacing,
        uiFontFamily: state.ui.uiFontFamily,
        fontSmoothing: state.ui.fontSmoothingOverride,
        padding: state.ui.padding,
        cursorColor: state.ui.cursorColor,
        cursorAccentColor: state.ui.cursorAccentColor,
        cursorShape: state.ui.cursorShape,
        cursorBlink: state.ui.cursorBlink,
        borderColor: state.ui.borderColor,
        selectionColor: state.ui.selectionColor,
        colors: state.ui.colors,
        foregroundColor: state.ui.foregroundColor,
        backgroundColor: state.ui.backgroundColor,
        bell: state.ui.bell,
        bellSoundURL: state.ui.bellSoundURL,
        copyOnSelect: state.ui.copyOnSelect,
        modifierKeys: state.ui.modifierKeys,
        quickEdit: state.ui.quickEdit,
        webGLRenderer: state.ui.webGLRenderer,
        macOptionSelectionMode: state.ui.macOptionSelectionMode
      }
    };
  },
  dispatch => {
    return {
      onData(uid, data) {
        console.log(uid, data);
        dispatch(sendSessionData(uid, data));
      },
      onActive(uid, node) {
        dispatch(activeRequest(uid, node));
      },
      onResize(uid, cols, rows) {
        dispatch(resizeSession(uid, cols, rows));
      },
    };
  },
  null,
  {withRef: true}
)(TermsComponent, 'Terms');

export default TermsContainer;
