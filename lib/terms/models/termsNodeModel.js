import Immutable from 'seamless-immutable';

export function TermsNode(obj) {
  return Immutable({
    uid: null,
    parent: null,
    direction: null,
    active: null,
    nodes: []
  }).merge(obj);
}
