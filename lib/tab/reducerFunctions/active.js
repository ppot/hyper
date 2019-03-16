export function active(state, action) {
  return state.set('activeTab', action.uid);
}
