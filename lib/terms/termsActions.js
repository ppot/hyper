import rpc from '../rpc';
import {TERMS_REQUEST, TERMS_ACTIVE, TERM_REQUEST, TERM_ACTIVE, SPLIT_REQUEST} from './termsConstants';

export function termsRequest(uid) {
  return dispatch => {
    dispatch({
      type: TERMS_REQUEST,
      uid
    });
  };
}

export function splitRequest(direction) {
  return () => dispatch => {
    dispatch({
      type: TERM_REQUEST,
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

export function activeRequest(uid) {
  return dispatch => {
    dispatch({
      type: TERM_ACTIVE,
      uid
    });
  };
}

export const requestVerticalSplit = splitRequest(SPLIT_REQUEST.VERTICAL);
export const requestHorizontalSplit = splitRequest(SPLIT_REQUEST.HORIZONTAL);