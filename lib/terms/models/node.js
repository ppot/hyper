import Immutable from 'seamless-immutable';

export function Node(obj) {
  return Immutable({
    uid: undefined,
    terms: []
  }).merge(obj);
}
