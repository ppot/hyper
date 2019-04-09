import Immutable from 'seamless-immutable';
import {Terms} from '../../models/termsModel';
import {isInTerms} from './isInTerms';

export function deepCreate(terms, currentActive, term, direction) {
  console.log('deepCreate', direction);
  console.log('terms : ', terms);
  console.log('currentActive : ', currentActive);
    console.log(typeof term === 'object');
  const _terms = Immutable.asMutable(terms.terms, {deep: true});
  console.log(_terms);
  console.log('terms.terms: ', _terms);
  
  const currentTermIndex = _terms.findIndex((term) => term === currentActive.uid);  
  console.log(currentTermIndex);
  const inTerms = isInTerms(terms, currentActive.uid);
  console.log(inTerms);
  console.log(_terms[currentTermIndex]);
    if (!inTerms && terms.direction === direction) {
      console.log('allo');
      if (_terms.length >= 1 && currentTermIndex < _terms.length) {
        _terms.splice(currentTermIndex + 1, 0, term.uid);
      } else {
        _terms.push(term.uid);
      }
      console.log(_terms);
      return _terms;
    } else {
      const termsArray = [];
      termsArray.push(currentActive.uid);
      termsArray.push(term.uid);
      
      const _nterms = Terms({
        uid: currentActive.uid,
        direction: direction,
        terms: termsArray,
        active: term.uid
      });
      
      _terms.splice(currentTermIndex, 1, _nterms);
      return _terms;
    }
  // UPDATE deepMerge since it dosen't travel and upgrade deep enouph.
  // if (!inTerms) {
  //   console.log('isInTerms ', terms, currentActive);
  //    _terms.map((t) => {
  //      console.log(t);
  //      console.log('uid: ', t.hasOwnProperty('uid'));
  //     if (t.hasOwnProperty('uid')) {
  //       // const tTerms = Immutable.asMutable(t.terms, {deep: true});
  //       // console.log(tTerms);
  //       // const tTermIndex = tTerms.findIndex((term) => term === currentActive.uid);  
  //       // console.log(tTermIndex);
  // 
  //       if (tTerms.length >= 1 && tTermIndex < tTerms.length) {
  //         tTerms.splice(tTermIndex + 1, 0, term.uid);
  //       } else {
  //         tTerms.push(term.uid);
  //       }
  //       // t.terms = tTerms;
  //       console.log('tTerms: ', t.terms); 
  //       t.terms = tTerms;
  //       console.log(t.terms);
  //     } else {
  //       const termsArray = [];
  //       termsArray.push(currentActive.uid);
  //       termsArray.push(term.uid);
  // 
  //       const _nterms = Terms({
  //         uid: currentActive.uid,
  //         direction: direction,
  //         terms: termsArray,
  //         active: term.uid
  //       });
  // 
  //       _terms.splice(currentTermIndex, 1, _nterms);
  //       return _terms;
  //     }
  //   });
  // } else {
  //   const termsArray = [];
  //   termsArray.push(currentActive.uid);
  //   termsArray.push(term.uid);
  // 
  //   const _nterms = Terms({
  //     uid: currentActive.uid,
  //     direction: direction,
  //     terms: termsArray,
  //     active: term.uid
  //   });
  // 
  //   _terms.splice(currentTermIndex, 1, _nterms);
  //   return _terms;
  // }
  
  // if (terms.direction === direction) {
  //   console.log(terms.direction === direction);
  //   // if (_terms.length >= 1 && currentTermIndex < _terms.length) {
  //   //   _terms.splice(currentTermIndex + 1, 0, term.uid);
  //   // } else {
  //   //   _terms.push(term.uid);
  //   // }
  // 
  //   return _terms;
  // } else {
  // 
  // }
}