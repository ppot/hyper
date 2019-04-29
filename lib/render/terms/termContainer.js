import {connect} from 'react-redux';
import TermComponent from './termComponent';
import {activeRequest} from '../../terms/termsActions';
import {sendSessionData, resizeSession} from '../../actions/sessions';

const term = (state, ownProps) => {
  // console.log(ownProps);
  // console.log(state.termsManager.term[ownProps.uid]);
  // const {uid, terms} = ownProps;
  // console.log(uid);
  // console.log(terms.nodes[uid]);
  // const node = terms.nodes[uid];
  // const sizes = new Array(node.nodes.length).fill(1 / node.nodes.length);
  // console.log(ownProps);
  // console.log(state, ownProps);
  // 
  // return {
  //   uid,
  //   direction: node.direction,
  //   sizes
  // }
};

const TermContainer = connect(
  (state, ownProps) => ({
    session: state.sessions.sessions[ownProps.uid],
    active: state.termsManager.term[ownProps.uid].active,
    render: ownProps.render
  }),
  (dispatch, ownProps) => ({
    onActive: () => {
      console.log(ownProps.uid);
      // dispatch(activeRequest(ownProps.uid, null));
    },
    onData: (data) => {
      dispatch(sendSessionData(ownProps.uid, data));
    },
    onResize(cols, rows) {
      dispatch(resizeSession(ownProps.uid, cols, rows));
    }
  })

)(TermComponent);

export default TermContainer;
