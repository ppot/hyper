import Immutable from 'seamless-immutable';
import { TAB_REQUEST, TAB_ACTIVE, TAB_CHANGE, TAB_CLOSE} from './tabConstants';

const initialState = Immutable({
  tabs: [],
  activeTab: null
});

function Tab(obj) {
  return Immutable({
    uid: '',
    title: ''
  }).merge(obj);
}

const removeFromTabs = (state) => {
  const t = state.tabs.find(x => x.uid==state.activeTab);
  const ts = state.tabs.indexOf(t);
  const _tabs = Immutable.asMutable(state.tabs);
  _tabs.splice(ts, 1);
  return _tabs;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_REQUEST:
      const _tabs = Immutable.asMutable(state.tabs);
      _tabs.push(
          Tab({
            uid: action.uid
          })
        );
      return state.set('activeTab', action.uid).merge({
        tabs: _tabs
      });
      
      case TAB_ACTIVE:
        return state.set('activeTab', action.uid);
        
      case TAB_CHANGE:
        return state.set('activeTab', action.uid);
      
      case TAB_CLOSE:
        return state.merge({
          tabs: removeFromTabs(state)
        });
        // return state.updateIn(['tabs'], tabs => {
        //   const tabs_ = tabs.asMutable();
        //   delete tabs_[action.uid];
        //   return tabs_;
        // });
    // case SESSION_SET_ACTIVE:
    //   return state.set('activeUid', action.uid);
    default:
      return state;
  }
};

export default reducer;