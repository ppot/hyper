import Immutable from 'seamless-immutable';

export function RootNode(obj) {
  return Immutable({
    active: null,
    nodes: {}
  }).merge(obj);
}
