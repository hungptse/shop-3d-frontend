const initialState = {
  orders: []
};

const setOrders = (state, payload) => {
  if (payload) {
    return { ...state, orders: payload };
  }
  return { ...state };
};

const changeStatusOrder = (state, payload) => {
  if (payload) {
    console.log(payload);
    return {
      ...state,
      orders: state.orders.map(order =>
        order.id === payload.id ? { ...order, status: payload.status } : order
      )
    };
  }
  return { ...state };
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ORDERS":
      return setOrders(state, payload);
    case "CHANGE_STATUS_ORDER":
      return changeStatusOrder(state, payload);
    default:
      return state;
  }
};
