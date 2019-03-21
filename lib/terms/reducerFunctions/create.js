import Immutable from 'seamless-immutable';

function Terms(obj) {
  return Immutable({
    uid: '',
    direction: null,
    active: null,
    terms: []
  }).merge(obj);
}

function Term(obj) {
  return Immutable({
    uid: '',
    active: false,
    backgroundColor: '',
  }).merge(obj);
}
  
function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}
  
export function create(state, action) {
  const _terms = [];
  const term = Term({
        uid: 1,
        active: true,
        backgroundColor: getRandomColor()
      });
  _terms.push(term);

  return state.set('active', action.uid).setIn(
    ['terms', action.uid], 
    Terms({
      uid: action.uid,
      terms: _terms,
      active: term.uid
    })
  );
}

export function splitCreate(state, action) {
  console.log(action);
  const terms = state.terms[state.active];
  const _terms = Immutable.asMutable(terms.terms);
  const currentActive = _terms.findIndex((term) => term.active === true);
  _terms[currentActive] = Object.assign({}, _terms[currentActive], {active: false});
  const term = Term({
        uid: _terms.length+1,
        active: true,
        backgroundColor: getRandomColor()
      })
  _terms.push(term);

  return state.merge(
    {
      terms: {
        [state.active]: {
          direction: action.direction.toLowerCase(),
          terms: _terms,
          active: term.uid
        }
      }
    },
    {deep: true}
  );
}
