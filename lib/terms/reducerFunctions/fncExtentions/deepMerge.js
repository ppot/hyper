import Immutable from 'seamless-immutable';

import {isInTerms} from './isInTerms';
import {deepCreate} from './deepCreate';

// Natasha Cook Jenkins 


const nextHasTerms = (term, active) => {
 if (term.hasOwnProperty('terms')) {
   const inTerms = isInTerms(term, active);
   console.log(inTerms);
   return term.terms.map((t) => {
    if (t.hasOwnProperty('terms'))  {
      console.log(t.terms);
    } else {
      return t;
    }
   });
 }
}

// MAKE DEEP COPY AND UPDATE WORK;
export function deepMerge(terms, active, term, direction) {
  console.log('deepMerge processing');
  console.log(active);
  const _trm = Immutable.asMutable(terms.terms, {deep: true});
  return _trm.map((t) => {
    console.log(t);
    // nextHasTerms(t, active);
    if (t.hasOwnProperty('terms')) {
      const inTerms = isInTerms(t, active.uid);
      console.log(inTerms);
      if (!inTerms) {
          // t.terms.map((tTerm) => {
          //   if (tTerm.hasOwnProperty('terms'))  {
          //     console.log(tTerm.terms);
          //     const _terms = deepCreate(tTerm, active, term, direction)
          //     console.log(_terms);
          //   } else {
          //     console.log('none');
          //   }
          // });

          const _terms = deepCreate(t, active, term, direction);
          console.log('_terms ', _terms);
          t.terms = _terms;
          t.active = term.uid;
          return t
      } else {
        console.log('deepMerge');
        return deepMerge(t, active, term, direction);
      }
    } else {
      return t;
    }
  });
}