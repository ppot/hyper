import Immutable from 'seamless-immutable';

export function remove(state) {
  const t = state.tabs.find(x => x.uid==state.activeTab);
  const ts = state.tabs.indexOf(t);
  const _tabs = Immutable.asMutable(state.tabs);
  _tabs.splice(ts, 1);
  return state.merge({
    tabs: _tabs
  });
};