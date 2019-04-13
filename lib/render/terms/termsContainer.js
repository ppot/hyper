import TermsComponent from './termsComponent';
import {activeRequest} from '../../terms/termsActions';
import {connect} from '../../utils/plugins';

const TermsContainer = connect(
  state => {
    return {
      activeTab: state.tabReducer.activeTab,
      terms: state.termsReducer.terms,
      term: state.termsReducer.term
    };
  },
  dispatch => {
    return {
      onActive(uid, node) {
        dispatch(activeRequest(uid, node));
      }
    };
  },
  null,
  {withRef: true}
)(TermsComponent, 'Terms');

export default TermsContainer;
