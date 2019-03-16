import Immutable from 'seamless-immutable';

function Tab(obj) {
  return Immutable({
    uid: '',
    title: ''
  }).merge(obj);
}

export function create(state, action) {
  const _tabs = Immutable.asMutable(state.tabs);
  _tabs.push(
    Tab({
      uid: action.uid
    })
  );
  return state.set('activeTab', action.uid).merge({
    tabs: _tabs
  });
}
