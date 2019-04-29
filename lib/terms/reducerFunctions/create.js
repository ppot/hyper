import Immutable from 'seamless-immutable';
import uuid from 'uuid';

import {NodeType} from '../models/types/nodeType';

import {Term} from '../models/termModel';
import {TermsNode} from '../models/termsNodeModel';
import {Terms} from '../models/termsModel';

const TYPES = {
    ROOT: 'root',
    TERM: 'term',
    TERMS: 'terms'
}

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}

export function splitCreate(state, action) {
  console.log(action.direction);
  const _layout = state.layouts[state.active];
  console.log(_layout);
  const _activeNode = state.terms[_layout.active];
  console.log(_activeNode);
  // const _activeIndex = _node.nodes.findIndex(x => x.uid === _node.active);
  // console.log(_activeIndex);
  // const _activeNode = _node.nodes[_activeIndex];
  // console.log(_activeNode);

  const term = Term({
    uid: action.uid,
    active: true,
    backgroundColor: getRandomColor()
  });
  
  if (_activeNode.nodes.length === 0) {
      return state
      .setIn(['term', term.uid], term)
      .merge(
        {
          terms: {
            [_layout.active]: {
                  active: term.uid,
                  nodes: [term.uid]
              }
          }
        },
        {deep: true}
      );
  }

  // if (_activeNode.nodes.length === 0) {
  //   const nodeType = NodeType({
  //     uid: term.uid,
  //     type: TYPES.TERM
  //   })
  // 
  //   return state
  //   .setIn(['term', term.uid], term)
  //   .merge(
  //     {
  //       terms: {
  //         [state.active]: {
  //           nodes: {
  //             [_node.active]: {
  //               active: nodeType.uid,
  //               nodes: [nodeType]
  //             }
  //           }
  //         }
  //       }
  //     },
  //     {deep: true}
  //   );
  // }
  
  if (action.direction !== null) {
    const direction = action.direction.toLowerCase();
    if (_activeNode.direction === null) {
      const nodesArray = Immutable.asMutable(_activeNode.nodes);
      nodesArray.push(term.uid);
      
      return state
      .setIn(['term', term.uid], term)
      .merge(
        {
          terms: {
            [_layout.active]: {
                  direction,
                  active: term.uid,
                  nodes: nodesArray
              }
          }
        },
        {deep: true}
      );
      
      
      // nodesArray.push(NodeType({
      //   uid: term.uid,
      //   type: TYPES.TERM
      // }));
      
      // return state
      // .setIn(['term', term.uid], term)
      // .merge(
      //   {
      //     term: {
      //       [_activeNode.active]: {
      //         active: false
      //       }
      //     },
      //     terms: {
      //       [state.active]: {
      //         nodes: {
      //           [_node.active]: {
      //             direction,
      //             active: term.uid,
      //             nodes: nodesArray
      //           }
      //         }
      //       }
      //     }
      //   },
      //   {deep: true}
      // );
    }
    if (_activeNode.direction === direction) {
      const nodesArray = Immutable.asMutable(_activeNode.nodes);
      const index = nodesArray.findIndex(x => x === _activeNode.active);
      console.log(index);
      nodesArray.splice(index + 1, 0, term.uid);
      return state
      .setIn(['term', term.uid], term)
      .merge(
        {
          terms: {
            [_layout.active]: {
                  active: term.uid,
                  nodes: nodesArray
              }
          }
        },
        {deep: true}
      );
      
      // nodesArray.splice(index + 1, 0, NodeType({
      //   uid: term.uid,
      //   type: TYPES.TERM
      // }));

      // return state
      // .setIn(['term', term.uid], term)
      // .merge(
      //   {
      //     term: {
      //       [_activeNode.active]: {
      //         active: false
      //       }
      //     },
      //     terms: {
      //       [state.active]: {
      //         nodes: {
      //           [_node.active]: {
      //             active: term.uid,
      //             nodes: nodesArray
      //           }
      //         }
      //       }
      //     }
      //   },
      //   {deep: true}
      // );
    }
    if (_activeNode.direction !== direction) {
      console.log('oupps');
      
      const n = TermsNode({
        uid: uuid.v4(),
        active: term.uid,
        direction,
        nodes: [
          _activeNode.active,
           term.uid,
        ]
      });
      
      // const node = TermsNode({
      //   uid: uuid.v4(),
      //   parent: _layout.active,
      //   active: term.uid,
      //   direction,
      //   nodes: [
      //     NodeType({
      //       uid: _activeNode.active,
      //       type: TYPES.TERM
      //     }),
      //     NodeType({
      //       uid: term.uid,
      //       type: TYPES.TERM
      //     })
      //   ]
      //   // nodes: [_activeNode.active, term.uid]
      // });

      const nodesArray = Immutable.asMutable(_activeNode.nodes);
      const index = nodesArray.findIndex(x => x === _activeNode.active);
      nodesArray.splice(index, 1);
        // node.uid);
        
      const layoutNodes = Immutable.asMutable(_layout.nodes); 
      layoutNodes.push(n.uid);
        
        return state
          .setIn(['term', term.uid], term)
          // .setIn(['layouts', layout.uid], layout)
          .setIn(['terms', n.uid], n)
          .merge(
            {
              layouts: {
                [_layout.uid]: {
                  nodes: layoutNodes,
                  active: n.uid
                }
              },
              terms: {
                [_layout.active]: {
                      active: null,
                      nodes: nodesArray
                  },
                  [n.uid]:  n
              }
            },
            {deep: true}
          );
        

      // return state
      // .setIn(['term', term.uid], term)
      // .merge(
      //   {
      //     term: {
      //       [_activeNode.active]: {
      //         active: false
      //       }
      //     },
      //     terms: {
      //       [state.active]: {
      //         nodes: {
      //           [_node.active]: {
      //             active: null,
      //             nodes: nodesArray,
      //           },
      //           [node.uid]: node
      //         },
      //         active: node.uid
      //       }
      //     }
      //   },
      //   {deep: true}
      // );
    }
  }
}
