import { combineReducers } from "redux"

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { items } from './item.reducer';
import { menus } from './menu.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  items,
  menus
});

export default rootReducer;
