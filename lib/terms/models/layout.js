import Immutable from 'seamless-immutable';

export function Layout(obj) {
  return Immutable({
    uid: undefined,
    nodes: []
  }).merge(obj);
}
