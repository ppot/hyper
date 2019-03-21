import Immutable from 'seamless-immutable';
import {TERMS_REQUEST, TERMS_ACTIVE, TERM_REQUEST, TERM_ACTIVE} from './termsConstants';

import {create, splitCreate} from './reducerFunctions/create'
import {activeTerms, activeTerm} from './reducerFunctions/active'

const initialState = Immutable({
  terms: {},
  active: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TERMS_REQUEST:
      return create(state, action);
    case TERMS_ACTIVE:
      return activeTerms(state, action);
    case TERM_REQUEST:
      return splitCreate(state, action);
    case TERM_ACTIVE:
      return activeTerm(state, action);
    default:
      return state;
  }
};

export default reducer;
