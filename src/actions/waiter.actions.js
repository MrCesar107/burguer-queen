import { waiterConstants } from '../constants';
import { waiterService } from '../services';
import { alertActions } from './';
import { history } from '../helpers'

export const waiterActions = {
  login,
  logout,
  register,
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    waiterService.login(email, password)
      .then(
        waiter => {
          dispatch(success(waiter));
          history.push('/')
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(waiter) { return { type: waiterConstants.LOGIN_REQUEST, waiter } }
  function success(waiter) { return { type: waiterConstants.LOGIN_SUCCESS, waiter } }
  function failure(error) { return { type: waiterConstants.LOGIN_FAILURE, error } }
}

function logout() {
  waiterService.logout();
  return { type: waiterConstants.LOGOUT };
}

function register(waiter) {
  return dispatch => {
    dispatch(request(waiter));

    waiterService.register(waiter)
      .then(
        waiter => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successfull'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(waiter) { return { type: waiterConstants.REGISTER_REQUEST, waiter } }
  function success(waiter) { return { type: waiterConstants.REGISTER_SUCCESS, waiter } }
  function failure(error) { return { type: waiterConstants.REGISTER_FAILURE, error } }
}
