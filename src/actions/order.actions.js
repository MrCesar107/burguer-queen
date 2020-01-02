import { orderConstants } from '../constants';
import { orderService } from '../services';
import { alertActions } from './';

export const orderActions = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAll,
};

function createOrder(order) {
  return dispatch => {
    dispatch(request(order));

    orderService.create(order)
      .then(
        order => {
          dispatch(success(order));
          dispatch(alertActions.success('Order created'));
          dispatch(getAll());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(order) { return { type: orderConstants.CREATE_REQUEST, order } };
  function success(order) { return { type: orderConstants.CREATE_SUCCESS, order } };
  function failure(error) { return { type: orderConstants.CREATE_FAILURE, error } };
}

function updateOrder(order) {
  return dispatch => {
    dispatch(request(order));

    orderService.update(order)
      .then(
        order => {
          dispatch(success());
          dispatch(alertActions.success('Order updated'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(order) { return { type: orderConstants.UPDATE_REQUEST, order } }
  function success(order) { return { type: orderConstants.UPDATE_SUCCESS, order } }
  function failure(error) { return { type: orderConstants.UPDATE_FAILURE, error } }
}

function deleteOrder(id) {
  return dispatch => {
    dispatch(request(id));

    orderService.delete(id)
      .then(
        order => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: orderConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: orderConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: orderConstants.DELETE_FAILURE, id, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    orderService.getAll()
      .then(
        orders => dispatch(success(orders)),
        error => dispatch(failure(error.toString())),
      );
  }

  function request() { return { type: orderConstants.GETALL_REQUEST } }
  function success(orders) { return { type: orderConstants.GETALL_SUCCESS, orders } }
  function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}