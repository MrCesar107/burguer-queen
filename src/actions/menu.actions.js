import { menuConstants } from '../constants';
import { menuService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const menuActions = {
  createMenu,
  updateMenu,
  deleteMenu,
  getAll,
};

function createMenu(menu) {
  return dispatch => {
    dispatch(request(menu));

    menuService.create(menu)
      .then(
        menu => {
          dispatch(success(menu));
          dispatch(alertActions.success('Menu created'));
          dispatch(getAll());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(menu) { return { type: menuConstants.CREATE_REQUEST, menu } };
  function success(menu) { return { type: menuConstants.CREATE_SUCCESS, menu } };
  function failure(error) { return { type: menuConstants.CREATE_FAILURE, error } };
}

function updateMenu(menu) {
  return dispatch => {
    dispatch(request(menu));

    menuService.update(menu)
      .then(
        menu => {
          dispatch(success());
          dispatch(alertActions.success('Menu updated'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(menu) { return { type: menuConstants.UPDATE_REQUEST, menu } }
  function success(menu) { return { type: menuConstants.UPDATE_SUCCESS, menu } }
  function failure(error) { return { type: menuConstants.UPDATE_FAILURE, error } }
}

function deleteMenu(id) {
  return dispatch => {
    dispatch(request(id));

    menuService.delete(id)
      .then(
        menu => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: menuConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: menuConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: menuConstants.DELETE_FAILURE, id, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    menuService.getAll()
      .then(
        menus => dispatch(success(menus)),
        error => dispatch(failure(error.toString())),
      );
  }

  function request() { return { type: menuConstants.GETALL_REQUEST } }
  function success(menus) { return { type: menuConstants.GETALL_SUCCESS, menus } }
  function failure(error) { return { type: menuConstants.GETALL_FAILURE, error } }
}
