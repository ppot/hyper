import Immutable from 'seamless-immutable';

export function Terms(obj) {
  return Immutable({
    uid: null,
    root: null,
    active: null,
    nodes: {}
  }).merge(obj);
}
