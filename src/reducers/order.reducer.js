import { orderConstants } from '../constants';

export function orders(state = {}, action) {
  switch(action.type) {
    case orderConstants.GETALL_REQUEST:
      return {
        loading: true
      };

    case orderConstants.GETALL_SUCCESS:
      return {
        orders: action.orders
      };

    case orderConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case orderConstants.CREATE_REQUEST:
      return { creating: true };

    case orderConstants.CREATE_SUCCESS:
      return {};

    case orderConstants.CREATE_FAILURE:
      return {};

    case orderConstants.UPDATE_REQUEST:
      return {
        ...state,
        order: state.order.map(order =>
          order.id === action.id
          ? { ...order, updloading: true }
          : order
        )
      };

    case orderConstants.UPDATE_SUCCESS:
      return {};

    case orderConstants.UPDATE_FAILURE:
      return {};

    case orderConstants.DELETE_REQUEST:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.id
          ? {  ...order, deleting: true }
          : order
        ),
      };

      case orderConstants.DELETE_SUCCESS:
      return {
        orders: state.orders.filter(order => order.id !== action.id)
      };

    case orderConstants.DELETE_FAILURE:
        return {
          ...state,
          orders: state.orders.map(order => {
            if (order.id === action.id) {
              const { deleting, ...orderCopy } = order;
              return {  ...orderCopy, deleteError: action.error };
            }

            return order;
          })
        };

    default:
      return state;
  }
}