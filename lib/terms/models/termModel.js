import Immutable from 'seamless-immutable';

export function Term(obj) {
  return Immutable({
    uid: null,
    active: false,
    backgroundColor: ''
  }).merge(obj);
}
