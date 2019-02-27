const initialState = {
  cart: []
};

const addToCart = (state, payload) => {
  if (payload) {
    var product = state.cart.find(p => p.id === payload.id);
    if (product) {
      // console.log("Duplicate", state.cart.map(el => el === product ? payload : el));
      payload.quantity = product.quantity++;
      // console.log("Quantity", payload.quantity);
      return { ...state, cart: [...state.cart] };
    }
  }
  return { ...state, cart: [...state.cart, payload] };
};

const removeFromCart = (state, payload) => {
  return { ...state, cart: state.cart.filter(el => el.id !== payload.id) };
};

const setCartFromAPIToReducer = (state, payload) => {
  if (payload) {
    return { ...state, cart: payload };
  }
  return { ...state };
};


export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return addToCart(state, payload);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, payload);
    case "GET_CART":
      return setCartFromAPIToReducer(state, payload);
    default:
      return state;
  }
};
