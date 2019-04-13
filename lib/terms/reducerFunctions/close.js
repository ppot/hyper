import Immutable from 'seamless-immutable';

export function closeTerm(state) {
  const _node = state.terms[state.active];
  const _activeNode = _node.nodes[_node.active];
  const nodesArray = Immutable.asMutable(_activeNode.nodes);
  const index = nodesArray.findIndex(x => x === _activeNode.active);

  if (nodesArray.length - 1 === 0) {
    // console.log('delete terms to');
  }

  if (nodesArray.length - 1 > 1) {
    nodesArray.splice(index, 1);
    const nextActive = index > nodesArray.length - 1 ? nodesArray[nodesArray.length - 1] : nodesArray[index];
    return state
      .merge(
        {
          terms: {
            [state.active]: {
              nodes: {
                [_node.active]: {
                  nodes: nodesArray,
                  active: nextActive
                }
              }
            }
          },
          term: {
            [nextActive]: {
              active: true
            }
          }
        },
        {deep: true}
      ).updateIn(['term'], term => {
        const term_ = term.asMutable();
        delete term_[_activeNode.active];
        return term_;
      });
  } else {
    nodesArray.splice(index, 1);
    if (nodesArray.length === 1 && _activeNode.parent != null) {
      const _parent = _node.nodes[_activeNode.parent];
      const parentNodesArray = Immutable.asMutable(_parent.nodes);
      const nodeIndex = parentNodesArray.findIndex(x => x === _activeNode.uid);
      const lastNode = nodesArray[0];
      parentNodesArray.splice(nodeIndex, 1, lastNode);
      return state
        .updateIn(['term'], term => {
          const term_ = term.asMutable();
          delete term_[_activeNode.active];
          return term_;
        })
         .setIn(['terms', state.active], _node.updateIn(['nodes'], nodes => {
            const nodes_ = nodes.asMutable();
            delete nodes_[_node.active];
            return nodes_;
         }))
        .merge(
          {
            terms: {
              [state.active]: {
                nodes: {
                  [_parent.uid]: {
                    nodes: parentNodesArray,
                    active: lastNode
                  }
                },
                active: _parent.uid
              }
            },
            term: {
              [lastNode]: {
                active: true
              }
            }
          },
          {deep: true}
        );
    }
    return state
      .merge(
        {
          terms: {
            [state.active]: {
              nodes: {
                [_node.active]: {
                  direction: nodesArray.length - 1 >= 1 ? _node.direction : null,
                  nodes: nodesArray,
                  active: nodesArray[0]
                }
              }
            }
          },
          term: {
            [nodesArray[0]]: {
              active: true
            }
          }
        },
        {deep: true}
      )
      .updateIn(['term'], term => {
        const term_ = term.asMutable();
        delete term_[_activeNode.active];
        return term_;
      });
  }
}
