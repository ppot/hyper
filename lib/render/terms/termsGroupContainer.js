import {connect} from 'react-redux';
import TermsGroupComponent from './termsGroupComponent';

const terms = (state, ownProps) => {
  const {uid, terms} = ownProps;
  console.log(uid);
  console.log(terms.nodes[uid]);
  const node = terms.nodes[uid];
  const sizes = new Array(node.nodes.length).fill(1 / node.nodes.length);
  console.log(ownProps);
  console.log(state, ownProps);

  return {
    uid,
    direction: node.direction,
    sizes
  }
};

const TermsGroupContainer = connect(
  (state, ownProps) => ({
     group: terms(state, ownProps)
  }),
  (dispatch, ownProps) => ({
     b: 'allo'
  })
    // state => {
    //   console.log(state, ownProps);
    //   return {
    //     x: 'allo'
    //   };
    // },
    // dispatch => {
    //   return {x: 'allo'};
    // }
)(TermsGroupComponent);

export default TermsGroupContainer;
