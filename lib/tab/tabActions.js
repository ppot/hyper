import rpc from '../rpc';
import {TAB_REQUEST, TAB_ACTIVE, TAB_CHANGE, TAB_CLOSE} from './tabConstants';

export function tabCreated(uid) {
  return dispatch => {
    dispatch({
      type: TAB_REQUEST,
      uid
    });
  };
}

export function tabActive(uid) {
  return dispatch => {
    dispatch({
      type: TAB_ACTIVE,
      uid
    });
  };
}

export function tabChange(uid) {
  return dispatch => {
    dispatch({
      type: TAB_CHANGE,
      uid
    });
  };
}

export function tabClose() {
  return (dispatch, getState) => {
    const {tabReducer} = getState();
    const {activeTab} = tabReducer;
    dispatch({
      type: TAB_CLOSE,
      uid: activeTab,
      effect: () => {
        rpc.emit('tab:close', {uid: activeTab});
      }
    });
  };
}
