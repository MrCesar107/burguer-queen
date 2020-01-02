import { combineReducers } from "redux"

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { items } from './item.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  items,
});

export default rootReducer;
