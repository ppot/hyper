import Immutable from 'seamless-immutable';

export function TermsNode(obj) {
  return Immutable({
    uid: null,
    nodes: {}
  }).merge(obj);
}