import {combineReducers} from 'redux';
import ui from './ui';
import sessions from './sessions';
import termGroups from './term-groups';
import tabReducer from '../tab/tabReducer';
import termsReducer from '../terms/termsReducer';

export default combineReducers({
  ui,
  sessions,
  termGroups,
  tabReducer,
  termsReducer
});
