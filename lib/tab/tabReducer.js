import Immutable from 'seamless-immutable';
import {TAB_REQUEST, TAB_ACTIVE, TAB_CHANGE, TAB_CLOSE} from './tabConstants';

import {create} from './reducerFunctions/create';
import {active} from './reducerFunctions/active';
import {remove} from './reducerFunctions/remove';

const initialState = Immutable({
  tabs: [],
  activeTab: null
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_REQUEST:
      return create(state, action);
    case TAB_ACTIVE:
      return active(state, action);
    case TAB_CHANGE:
      return active(state, action);
    case TAB_CLOSE:
      return remove(state);
    default:
      return state;
  }
};

export default reducer;
