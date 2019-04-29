import Immutable from 'seamless-immutable';

export function NodeType(obj) {
  return Immutable({
    uid: undefined,
    type: 'term',
  }).merge(obj);
}
