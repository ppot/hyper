export function activeTerms(state, action) {
  return state.set('active', action.uid);
}

export function activeTerm(state, action) {
  const node = state.terms[state.active];
  const activeNode = node.nodes[node.active];
  if (action.uid === activeNode.active) return state;

  return state.merge(
    {
      terms: {
        [state.active]: {
          nodes: {
            [node.active]: {
              active: null
            },
            [action.termsUid.uid]: {
              active: action.uid
            }
          },
          active: action.termsUid
        }
      },
      term: {
        [activeNode.active]: {
          active: false
        },
        [action.uid]: {
          active: true
        }
      }
    },
    {deep: true}
  );
}
