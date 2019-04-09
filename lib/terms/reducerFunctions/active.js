import Immutable from 'seamless-immutable';

export function activeTerms(state, action) {
  console.log('activeTerms', action.uid);
    const terms = state.terms[state.active];
    console.log('activeTerm', terms.active); 
  return state.set('active', action.uid);
}

export function activeTerm(state, action) {
  const terms = state.terms[state.active];
  const currentActive = state.term[terms.active];
  if (terms.active === action.uid) return state;
  return state.merge(
    {
      terms: {
        [state.active]: {
          active: action.uid
        }
      },
      term: {
        [currentActive.uid]: {
          active: false
        },
        [action.uid]: {
          active: true
        }
      }
    },
    {deep: true}
  );
}
