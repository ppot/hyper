import Immutable from 'seamless-immutable';

export function Tab(obj) {
  return Immutable({
    uid: '',
    title: ''
  }).merge(obj);
}