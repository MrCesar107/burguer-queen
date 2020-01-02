import { itemConstants } from '../constants';

export function items(state = {}, action) {
  switch(action.type) {
    case itemConstants.GETALL_REQUEST:
      return {
        loading: true
      };

    case itemConstants.GETALL_SUCCESS:
      return {
        items: action.items
      };

    case itemConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case itemConstants.CREATE_REQUEST:
      return { creating: true };

    case itemConstants.CREATE_SUCCESS:
      return {};

    case itemConstants.CREATE_FAILURE:
      return {};

    case itemConstants.UPDATE_REQUEST:
      return {
        ...state,
        item: state.item.map(item =>
          item.id === action.id
            ? { ...item, updating: true }
            : item
        )
      };

    case itemConstants.UPDATE_SUCCESS:
      return {};

    case itemConstants.UPDATE_FAILURE:
      return {};

    case itemConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
          ? { ...item, deleting: true }
          : item
        ),
      };

    case itemConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(item => item.id !== action.id)
      };

    case itemConstants.DELETE_FAILURE:
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.id) {
              const { deleting, ...itemCopy } = item;
              return {  ...itemCopy, deleteError: action.error };
            }

            return item;
          })
        };

    default:
      return state;
  }
}
