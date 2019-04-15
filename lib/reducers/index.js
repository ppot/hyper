import {combineReducers} from 'redux';
import ui from './ui';
import sessions from './sessions';
import termGroups from './term-groups';
import tabsManager from '../tab/tabsManager';
import termsManager from '../terms/termsManager';

export default combineReducers({
  ui,
  sessions,
  termGroups,
  tabsManager,
  termsManager
});
