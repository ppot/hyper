import rpc from '../rpc';
import {TERMS_REQUEST, TERMS_ACTIVE, TERM_REQUEST, TERM_ACTIVE, TERM_CLOSE, SPLIT_REQUEST} from './termsConstants';
import {TAB_CLOSE} from '../tab/tabConstants';

export function termsRequest(uid) {
  return dispatch => {
    dispatch({
      type: TERMS_REQUEST,
      uid
    });
  };
}

export function termRequest(uid, direction) {
  return dispatch => {
    dispatch({
      type: TERM_REQUEST,
      uid,
      direction
    });
  };
}
export function termsActive(uid) {
  return dispatch => {
    dispatch({
      type: TERMS_ACTIVE,
      uid
    });
  };
}

export function activeRequest(uid, termsUid) {
  return dispatch => {
    dispatch({
      type: TERM_ACTIVE,
      uid,
      termsUid
    });
  };
}

// TODO: Might thing of a way to rework this in order to reduce couplage (folder linking and actions)
export function termClose() {
  return (dispatch, getState) => {
    const {termsManager} = getState();
    const _node = termsManager.terms[termsManager.active];
    const _activeNode = _node.nodes[_node.active];
    dispatch({
      type: TERM_CLOSE,
      effect: () => {
        if (_node.active === _node.root && _activeNode.nodes.length - 1 === 0) {
          dispatch({
            type: TAB_CLOSE,
            uid: _node.root,
            effect: () => {
              rpc.emit('tab:close', {uid: _node.root});
            }
          });
        }
      }
    });
  };
}
