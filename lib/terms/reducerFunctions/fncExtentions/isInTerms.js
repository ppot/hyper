export function isInTerms(terms, active) {
  const currentTermIndex = terms.terms.findIndex((term) => term === active);
  console.log(currentTermIndex);
  return currentTermIndex === -1 ? true : false;
}