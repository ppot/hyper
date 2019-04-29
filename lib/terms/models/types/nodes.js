import Immutable from 'seamless-immutable';

export function Nodes(obj) {
  return Immutable({
    active: null,
    nodes: {}
  }).merge(obj);
}
