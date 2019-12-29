import { waiterConstants } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case waiterConstants.REGISTER_REQUEST:
      return { registering: true }

    case waiterConstants.REGISTER_SUCCESS:
      return {};

    case waiterConstants.REGISTER_FAILURE:
      return {};

    default:
      return state;
  }
}
