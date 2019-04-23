import rpc from '../rpc';
import {keys} from '../utils/object';
import findBySession from '../utils/term-groups';
import {
  SESSION_ADD,
  SESSION_RESIZE,
  SESSION_REQUEST,
  SESSION_ADD_DATA,
  SESSION_PTY_DATA,
  SESSION_PTY_EXIT,
  SESSION_USER_EXIT,
  SESSION_SET_ACTIVE,
  SESSION_CLEAR_ACTIVE,
  SESSION_USER_DATA,
  SESSION_SET_XTERM_TITLE
} from '../constants/sessions';

export function addSession({uid, shell, pid, cols, rows, splitDirection}) {
  return (dispatch, getState) => {
    const {sessions} = getState();
    const now = Date.now();
    dispatch({
      type: SESSION_ADD,
      uid,
      shell,
      pid,
      cols,
      rows,
      splitDirection,
      activeUid: sessions.activeUid,
      now
    });
  };
}

export function requestSession() {
  return (dispatch, getState) => {
    dispatch({
      type: SESSION_REQUEST,
      effect: () => {
        const {ui} = getState();
        const {cols, rows, cwd} = ui;
        rpc.emit('new', {cols, rows, cwd});
      }
    });
  };
}

export function addSessionData(uid, data) {
  return dispatch => {
    dispatch({
      type: SESSION_ADD_DATA,
      data,
      effect() {
        const now = Date.now();
        dispatch({
          type: SESSION_PTY_DATA,
          uid,
          data,
          now
        });
      }
    });
  };
}

function createExitAction(type) {
  return uid => (dispatch, getState) => {
    return dispatch({
      type,
      uid,
      effect() {
        if (type === SESSION_USER_EXIT) {
          rpc.emit('exit', {uid});
        }

        const sessions = keys(getState().sessions.sessions);
        if (sessions.length === 0) {
          window.close();
        }
      }
    });
  };
}

// we want to distinguish an exit
// that's UI initiated vs pty initiated
export const userExitSession = createExitAction(SESSION_USER_EXIT);
export const ptyExitSession = createExitAction(SESSION_PTY_EXIT);

export function setActiveSession(uid) {
  return dispatch => {
    dispatch({
      type: SESSION_SET_ACTIVE,
      uid
    });
  };
}

export function clearActiveSession() {
  return {
    type: SESSION_CLEAR_ACTIVE
  };
}

export function setSessionXtermTitle(uid, title) {
  return {
    type: SESSION_SET_XTERM_TITLE,
    uid,
    title
  };
}

export function resizeSession(uid, cols, rows) {
  return (dispatch, getState) => {
    const now = Date.now();
    dispatch({
      type: SESSION_RESIZE,
      uid,
      cols,
      rows,
      now,
      effect() {
        rpc.emit('resize', {uid, cols, rows});
      }
    });
  };
}

export function sendSessionData(uid, data, escaped) {
  return (dispatch, getState) => {
    dispatch({
      type: SESSION_USER_DATA,
      data,
      effect() {
        // If no uid is passed, data is sent to the active session.
        const targetUid = uid || getState().sessions.activeUid;

        rpc.emit('data', {uid: targetUid, data, escaped});
      }
    });
  };
}
