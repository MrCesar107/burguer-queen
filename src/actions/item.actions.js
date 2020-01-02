import { itemConstants } from '../constants';
import { itemService } from '../services';
import { alertActions } from './';

export const itemActions = {
  createItem,
  updateItem,
  deleteItem,
  getAll
};

function createItem(item) {
  return dispatch => {
    dispatch(request(item));

    itemService.create(item)
      .then(
        item => {
          dispatch(success(item));
          dispatch(alertActions.success('Item created'));
          dispatch(getAll());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString));
        }
      );
  };

  function request(item) { return { type: itemConstants.CREATE_REQUEST, item } };
  function success(item) { return { type: itemConstants.CREATE_SUCCESS, item } };
  function failure(error) { return { type: itemConstants.CREATE_FAILURE, error } };
}

function updateItem(item) {
  return dispatch => {
    dispatch(request(item));

    itemService.update(item)
      .then(
        item => {
          dispatch(success());
          dispatch(alertActions.success('Item created'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString));
        }
      );

    itemService.getAll()
      .then(
        items => dispatch(success(items)),
        error => dispatch(failure(error.toString())),
      );
  };

  function request(item) { return { type: itemConstants.UPDATE_REQUEST, item } };
  function success(item) { return { type: itemConstants.UPDATE_SUCCESS, item } };
  function failure(error) { return { type: itemConstants.UPDATE_FAILURE, error } };
}

function deleteItem(id) {
  return dispatch => {
    dispatch(request(id));

    itemService.delete(id)
      .then(
        item => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: itemConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: itemConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: itemConstants.DELETE_FAILURE, id, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    itemService.getAll()
      .then(
        items => dispatch(success(items)),
        error => dispatch(failure(error.toString())),
      );
  }

  function request() { return { type: itemConstants.GETALL_REQUEST } }
  function success(items) { return { type: itemConstants.GETALL_SUCCESS, items } }
  function failure(error) { return { type: itemConstants.GETALL_FAILURE, error } }
}
