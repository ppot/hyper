import Immutable from 'seamless-immutable';
import {
  TAB_REQUEST,
  TAB_CLOSE
} from './tabConstants';

const initialState = Immutable({
  tabs: {},
  activeTab: null
});

function Tab(obj) {
  return Immutable({
    uid: '',
    position: null
  }).merge(obj);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_REQUEST:
      return state.set('activeTab', action.uid).setIn(
        ['tabs', action.uid],
        Tab({
          uid: action.uid
        })
      );
      
      case TAB_CLOSE:
        return state.updateIn(['tabs'], tabs => {
          const tabs_ = tabs.asMutable();
          delete tabs_[action.uid];
          return tabs_;
        });

    // case SESSION_SET_ACTIVE:
    //   return state.set('activeUid', action.uid);

    // case SESSION_SET_CWD:
    //   if (state.activeUid) {
    //     return state.setIn(['sessions', state.activeUid, 'cwd'], action.cwd);
    //   }
    //   return state;

    default:
      return state;
  }
};

export default reducer;