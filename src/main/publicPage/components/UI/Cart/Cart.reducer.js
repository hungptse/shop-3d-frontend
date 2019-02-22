const initialState = {
  cart: []
};

const addToCart = (state, payload) => {
  if (payload) {
    var product = state.cart.find(p => p.id == payload.id);
    if (product) {
      state.cart.find(p => p.id == payload.id).quantity++;   
    } else {
      state.cart.push(payload);
    }
  }
  return { ...state };
};
export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_CART':
      return addToCart(state, payload);
    default:
      return state;
  }
};

