import Immutable from 'seamless-immutable';

import {Term} from '../models/termModel';
import {TermsNode} from '../models/termsNodeModel';
import {Terms} from '../models/termsModel';

function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}

export function create(state, action) {
  const term = Term({
    uid: getRandomColor(),
    active: true
  });

  const node = TermsNode({
    uid: action.uid,
    active: term.uid,
    nodes: [term.uid]
  });

  const terms = Terms({
    uid: action.uid,
    root: action.uid,
    active: action.uid
  });

  return state
    .set('active', action.uid)
    .setIn(['terms', terms.uid], terms.setIn(['nodes', node.uid], node))
    .setIn(['term', term.uid], term);
}

export function splitCreate(state, action) {
  const _node = state.terms[state.active];
  const direction = action.direction.toLowerCase();
  const _activeNode = _node.nodes[_node.active];
  console.log(_node);
  console.log(_activeNode);

  const uid = getRandomColor();
  const term = Term({
    uid,
    active: true
  });

  if (_activeNode.direction === null) {
    const nodesArray = Immutable.asMutable(_activeNode.nodes);
    nodesArray.push(term.uid);
    return state
    .setIn(['term', term.uid], term)
    .merge(
      {
        term: {
          [_activeNode.active]: {
            active: false
          }
        },
        terms: {
          [state.active]: {
            nodes: {
              [_node.active]: {
                direction: direction,
                active: term.uid,
                nodes: nodesArray
              }
            }
          }
        }
      },
      {deep: true}
    );
  }
  if (_activeNode.direction === direction) {
    const nodesArray = Immutable.asMutable(_activeNode.nodes);
    const index = nodesArray.findIndex(x => x === _activeNode.active);
    nodesArray.splice(index + 1, 0, term.uid);

    return state
    .setIn(['term', term.uid], term)
    .merge(
      {
        term: {
          [_activeNode.active]: {
            active: false
          }
        },
        terms: {
          [state.active]: {
            nodes: {
              [_node.active]: {
                active: term.uid,
                nodes: nodesArray
              }
            }
          }
        }
      },
      {deep: true}
    );
  }
  if (_activeNode.direction !== direction) {
    const node = TermsNode({
      uid: getRandomColor(),
      parent: _node.active,
      active: term.uid,
      direction,
      nodes: [_activeNode.active, term.uid]
    });

    const nodesArray = Immutable.asMutable(_activeNode.nodes);
    const index = nodesArray.findIndex(x => x === _activeNode.active);
    nodesArray.splice(index, 1, node.uid);

    return state
    .setIn(['term', term.uid], term)
    .merge(
      {
        term: {
          [_activeNode.active]: {
            active: false
          }
        },
        terms: {
          [state.active]: {
            nodes: {
              [_node.active]: {
                active: null,
                nodes: nodesArray
              },
              [node.uid]: node
            },
            active: node.uid
          }
        }
      },
      {deep: true}
    );
  }
}
