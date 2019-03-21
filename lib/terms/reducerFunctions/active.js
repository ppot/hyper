import Immutable from 'seamless-immutable';

export function activeTerms(state, action) {
  console.log('activeTerms', action.uid);
    const terms = state.terms[state.active];
    console.log('activeTerm', terms.active); 
  return state.set('active', action.uid);
}

export function activeTerm(state, action) {
  const terms = state.terms[state.active];
  if (terms.active === action.uid) return state;
  const _terms = Immutable.asMutable(terms.terms);
  const currentActive = _terms.findIndex((term) => term.active === true);
  const activeTermUid = _terms.findIndex((term) => term.uid === action.uid);
  _terms[currentActive] = Object.assign({}, _terms[currentActive], {active: false});
  _terms[activeTermUid] = Object.assign({}, _terms[activeTermUid], {active: true});
  return state.merge(
    {
      terms: {
        [state.active]: {
          active: action.uid,
          terms : _terms
        }
      }
    },
    {deep: true}
  );
}
