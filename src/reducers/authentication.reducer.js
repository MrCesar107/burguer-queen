import { waiterConstants } from '../constants';

let waiter = JSON.parse(localStorage.getItem('waiter'));
const initialState = waiter ? { loggedIn: true, waiter } : {};

export default function authentication(state = initialState, action) {
  switch(action.type) {
    case waiterConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        waiter: action.waiter,
      };

    case waiterConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        waiter: action.waiter,
      };

    case waiterConstants.LOGIN_FAILURE:
      return {};

    case waiterConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}
