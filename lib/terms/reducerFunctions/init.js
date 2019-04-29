import Immutable from 'seamless-immutable';
import uuid from 'uuid';

// import {RootNode} from '../models/types/rootNodeModel';
import {Layout} from '../models/layout';
import {Node} from '../models/node';
import {TermsNode} from '../models/termsNodeModel';
import {Terms} from '../models/termsModel';

// export function init(state, action) {
//   const node = RootNode({
//     uid: action.uid,
//     nodes: []
//   });
// 
//   const terms = Terms({
//     uid: action.uid,
//     root: action.uid,
//     active: action.uid
//   });
// 
//   return state
//     .set('active', action.uid)
//     .setIn(['terms', terms.uid], terms.setIn(['nodes', node.uid], node));
// }

export function init(state, action) {
  // const n = Node({
  //   uid: uuid.v4(),
  //   terms: []
  // })
  
  const n = TermsNode({
    uid: action.uid,
    nodes: []
  });
  
  const layout = Layout({
    uid: action.uid,
    active: n.uid,
  });
  
  // const node = TermsNode({
  //   uid: 'root',//uuid.v4(),
  //   nodes: []
  // });
  
  // 
  // const layout = Terms({
  //   uid: action.uid,
  //   active: node.uid,
  //   nodes: {
  //     [node.uid]: node
  //   }
  // });
  // 
  return state
    .set('active', layout.uid)
    .setIn(['layouts', layout.uid], layout)
    .setIn(['terms', n.uid], n);
}
