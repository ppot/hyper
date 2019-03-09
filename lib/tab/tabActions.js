import rpc from '../rpc';
import {TAB_REQUEST, TAB_ACTIVE, TAB_CHANGE, TAB_CLOSE} from './tabConstants';

export function tabCreated(uid) {
  return (dispatch, getState) => {
    const {tabReducer} = getState();
    dispatch({
      type: TAB_REQUEST,
      uid
    });
  };
}

export function tabActive(uid) {
  return (dispatch, getState) => {
    dispatch({
      type: TAB_ACTIVE,
      uid
    });
  };
}

export function tabChange(uid) {
  return (dispatch, getState) => {
    dispatch({
      type: TAB_CHANGE,
      uid
    });
  };
}

export function tabClose(uid) {
  return (dispatch, getState) => {
    const {tabReducer} = getState();
    const {activeTab}  = tabReducer;
    dispatch({
      type: TAB_CLOSE,
      uid: activeTab,
      effect: () => {
        rpc.emit('tab:close', {uid: activeTab});
      }
    });
  };
}

// export function userExitTermGroup(uid) {
//   return (dispatch, getState) => {
//     const {termGroups} = getState();
//     dispatch({
//       type: TERM_GROUP_EXIT,
//       uid,
//       effect: () => {
//         const group = termGroups.termGroups[uid];
//         if (Object.keys(termGroups.termGroups).length <= 1) {
//           // No need to attempt finding a new active session
//           // if this is the last one we've got:
//           return dispatch(userExitSession(group.sessionUid));
//         }
// 
//         const activeSessionUid = termGroups.activeSessions[termGroups.activeRootGroup];
//         if (termGroups.activeRootGroup === uid || activeSessionUid === group.sessionUid) {
//           const nextSessionUid = findNextSessionUid(termGroups, group);
//           dispatch(setActiveSession(nextSessionUid));
//         }
// 
//         if (group.sessionUid) {
//           dispatch(userExitSession(group.sessionUid));
//         } else {
//           group.children.forEach(childUid => {
//             dispatch(userExitTermGroup(childUid));
//           });
//         }
//       }
//     });
//   };
// }

