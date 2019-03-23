import Immutable from 'seamless-immutable';

export function Term(obj) {
  return Immutable({
    uid: '',
    active: false,
    backgroundColor: '',
  }).merge(obj);
}