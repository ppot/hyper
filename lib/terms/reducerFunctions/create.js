import Immutable from 'seamless-immutable';

import {Term} from '../models/termModel';
import {Terms} from '../models/termsModel';

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}


function newTerms(terms, index) {
  terms[index] = Object.assign({}, terms[index], {active: false});
  const uid = getRandomColor();
  const term = Term({
        uid,
        backgroundColor: uid,
        active: true
      })
  terms.push(term);
  
  return {
    terms,
    termUid: uid
  };
}

function intercepting(state, action) {
  console.log('intercepting');
  console.log(action);
  const terms = state.terms[state.active];
  const _terms = Immutable.asMutable(terms.terms);
  const currentActive = _terms.findIndex((term) => term.active === true);
  if (terms.direction === null) {
    const _nterms = newTerms(_terms, currentActive);
    return state.merge(
      {
        terms: {
          [state.active]: {
            direction: action.direction.toLowerCase(),
            terms: _nterms.terms,
            active: _nterms.termUid
          }
        }
      },
      {deep: true}
    );
  }
  if (terms.direction === action.direction.toLowerCase()) {
     console.log('only add a term to the terms');
     const _nterms = newTerms(_terms, currentActive);
     return state.merge(
       {
         terms: {
           [state.active]: {
             terms: _nterms.terms,
             active: _nterms.termUid
           }
         }
       },
       {deep: true}
     );
  }
  
  if (terms.direction !== null) {
    console.log('current direction is ', terms.direction);
    const _term = Immutable.asMutable(_terms[currentActive]);
    const _nTerms = [];
    const uid = getRandomColor();
    const term = Term({
          uid,
          backgroundColor: uid,
          active: true
        })
    _terms[currentActive] = Object.assign({}, _terms[currentActive], {active: false});
    _nTerms.push(_terms[currentActive]);
    _nTerms.push(term);
    _term.active = false;
    _term.terms = Terms({
      uid: getRandomColor(),
      direction: action.direction.toLowerCase(),
      terms: _nTerms,
      active: term.uid
    })
    console.log(_term);
    _terms[currentActive] = Object.assign({}, _terms[currentActive], _term);
    return state.merge(
      {
        terms: {
          [state.active]: {
            terms: _terms
          }
        }
      },
      {deep: true}
    );
  }
}
  
export function create(state, action) {
  const _terms = [];
  const term = Term({
        uid: getRandomColor(),
        active: true
        // backgroundColor: getRandomColor()
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
  return intercepting(state, action);
  // const terms = state.terms[state.active];
  // const _terms = Immutable.asMutable(terms.terms);
  // const currentActive = _terms.findIndex((term) => term.active === true);
  // _terms[currentActive] = Object.assign({}, _terms[currentActive], {active: false});
  // const term = Term({
  //       uid: _terms.length+1,
  //       active: true
  //     })
  // _terms.push(term);
  // 
  // return state.merge(
  //   {
  //     terms: {
  //       [state.active]: {
  //         direction: action.direction.toLowerCase(),
  //         terms: _terms,
  //         active: term.uid
  //       }
  //     }
  //   },
  //   {deep: true}
  // );
}
