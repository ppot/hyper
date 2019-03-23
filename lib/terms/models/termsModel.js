import Immutable from 'seamless-immutable';

export function Terms(obj) {
  return Immutable({
    uid: null,
    direction: null,
    active: null,
    terms: []
  }).merge(obj);
}