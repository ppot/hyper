import Immutable from 'seamless-immutable';

import {Term} from '../models/termModel';
import {TermsNode} from '../models/termsNode';
import {Terms} from '../models/termsModel';

import {isInTerms} from './fncExtentions/isInTerms';
import {deepMerge} from './fncExtentions/deepMerge';

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}


// function newTerms(terms, index) {
//   console.log(terms, index);
//   terms[index] = Object.assign({}, terms[index], {active: false});
//   console.log(index);
//   console.log('index vs length ', index , terms.length, index < terms.length-1);
//   const uid = getRandomColor();
//   const term = Term({
//         uid,
//         backgroundColor: uid,
//         active: true
//       })
//   if (terms.length >= 1 && index < terms.length-1) {
//     terms.splice( index + 1, 0, term);
//   } else {
//     terms.push(term);
//   }
//   return {
//     terms,
//     termUid: uid
//   };
// }

/// NEED to recursve callback in order to applay the new terms elements;
  
export function create(state, action) {
  const term = Term({
        uid: getRandomColor(),
        active: true
      });
      
  const termsArray = [];
  termsArray.push(term.uid);

  return state.set('active', action.uid).setIn(
    ['terms', action.uid], 
    Terms({
      uid: action.uid,
      terms: termsArray,
      active: term.uid
    }),
  ).setIn(['term', term.uid], term);
}

export function splitCreate(state, action) {
  // const terms = state.terms[state.active];
  // const direction = action.direction.toLowerCase();
  // const currentActive = state.term[terms.active];
  // 
  // if (!isInTerms(terms, currentActive.uid)) {
  //   if (terms.direction === null) {
  //     console.log('________________1________________________');
  //     const uid = getRandomColor();
  //     const term = Term({
  //           uid,
  //           backgroundColor: uid,
  //           active: true
  //         });
  //     const termsArray = Immutable.asMutable(terms.terms);
  //     termsArray.push(term.uid);
  // 
  //     return state
  //     .setIn(['term', term.uid], term)
  //     .merge(
  //       {
  //         terms: {
  //           [state.active]: {
  //             direction: direction,
  //             terms: termsArray,
  //             active: term.uid
  //           }
  //         },
  //         term: {
  //           [currentActive.uid]: {
  //             active: false
  //           }
  //         }
  //       },
  //       {deep: true}
  //     );
  //   }
  // 
  //   if (terms.direction === direction) {
  //     console.log('________________2________________________');
  //     const uid = getRandomColor();
  //     const term = Term({
  //           uid,
  //           backgroundColor: uid,
  //           active: true
  //         });
  //     const termsArray = Immutable.asMutable(terms.terms);
  // 
  //     const currentTermIndex = termsArray.findIndex((term) => term === currentActive.uid);  
  //     console.log(currentTermIndex);
  // 
  //     console.log(termsArray);
  // 
  //     if (termsArray.length >= 1 && currentTermIndex < termsArray.length) {
  //       termsArray.splice(currentTermIndex + 1, 0, term.uid);
  //     } else {
  //       termsArray.push(term.uid);
  //     }
  //     console.log(termsArray);
  // 
  //     return state
  //     .setIn(['term', term.uid], term)
  //     .merge(
  //       {
  //         terms: {
  //           [state.active]: {
  //             terms: termsArray,
  //             active: term.uid
  //           }
  //         },
  //         term: {
  //           [currentActive.uid]: {
  //             active: false
  //           }
  //         }
  //       },
  //       {deep: true}
  //     );
  //   }
  // 
  //   if (terms.direction !==  null) {
  //     console.log('________________3________________________');
  //     const _terms = Immutable.asMutable(terms.terms);
  //     const uid = getRandomColor();
  //     const term = Term({
  //           uid,
  //           backgroundColor: uid,
  //           active: true
  //         });
  // 
  //     const currentTermIndex = _terms.findIndex((term) => term === currentActive.uid);  
  // 
  //     const termsArray = [];
  //     termsArray.push(currentActive.uid);
  //     termsArray.push(term.uid);
  // 
  //     const _nterms = Terms({
  //       uid: currentActive.uid,
  //       direction: direction,
  //       terms: termsArray,
  //       active: term.uid
  //     });
  // 
  //     _terms.splice(currentTermIndex, 1 , _nterms);
  // 
  //     return state
  //     .setIn(['term', term.uid], term)
  //     .merge(
  //       {
  //         terms: {
  //           [state.active]: {
  //             active: term.uid,
  //             terms: _terms
  //           }
  //         },
  //         term: {
  //           [currentActive.uid]: {
  //             active: false
  //           }
  //         }
  //       },
  //       {deep: true}
  //     );
  //   }
  // } else {
  //   console.log('find in terms terms and then update top level array');
  //   const uid = getRandomColor();
  //   const term = Term({
  //         uid,
  //         backgroundColor: uid,
  //         active: true
  //       });
  // 
  //   const _terms = deepMerge(terms, currentActive, term, direction);
  //   console.log(_terms);
  //   return state
  //   .setIn(['term', term.uid], term)
  //   .merge(
  //     {
  //       terms: {
  //         [state.active]: {
  //           active: term.uid,
  //           terms: _terms
  //         }
  //       },
  //       term: {
  //         [currentActive.uid]: {
  //           active: false
  //         }
  //       }
  //     },
  //     {deep: true}
  //   );
  }
}
