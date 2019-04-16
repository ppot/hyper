import Immutable from 'seamless-immutable';

import {TermsNode} from '../models/termsNodeModel';
import {Terms} from '../models/termsModel';

export function termsCreate(state, action) {
  const node = TermsNode({
    uid: action.uid,
    nodes: []
  });
  
  const terms = Terms({
    uid: action.uid,
    root: action.uid,
    active: action.uid
  });
  
  return state
    .set('active', action.uid)
    .setIn(['terms', terms.uid], terms.setIn(['nodes', node.uid], node));
}
