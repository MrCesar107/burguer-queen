import { menuConstants } from '../constants';

export function menus(state = {}, action) {
  switch(action.type) {
    case menuConstants.GETALL_REQUEST:
      return {
        loading: true
      };

    case menuConstants.GETALL_SUCCESS:
      return {
        menus: action.menus
      };

    case menuConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case menuConstants.CREATE_REQUEST:
      return { creating: true };

    case menuConstants.CREATE_SUCCESS:
      return {};

    case menuConstants.CREATE_FAILURE:
      return {};

    case menuConstants.UPDATE_REQUEST:
      return {
        ...state,
        menu: state.menu.map(menu =>
          menu.id === action.id
          ? { ...menu, updloading: true }
          : menu
        )
      };

    case menuConstants.UPDATE_SUCCESS:
      return {};

    case menuConstants.UPDATE_FAILURE:
      return {};

    case menuConstants.DELETE_REQUEST:
      return {
        ...state,
        menus: state.menus.map(menu =>
          menu.id === action.id
          ? {  ...menu, deleting: true }
          : menu
        ),
      };

      case menuConstants.DELETE_SUCCESS:
      return {
        menus: state.menus.filter(menu => menu.id !== action.id)
      };

    case menuConstants.DELETE_FAILURE:
        return {
          ...state,
          menus: state.menus.map(menu => {
            if (menu.id === action.id) {
              const { deleting, ...menuCopy } = menu;
              return {  ...menuCopy, deleteError: action.error };
            }

            return menu;
          })
        };

    default:
      return state;
  }
}
