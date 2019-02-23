const initialState = {
  cart: []
};

const addToCart = (state, payload) => {
  if (payload) {
    var product = state.cart.find(p => p.id === payload.id);
    if (product) {
      // state.cart.find(p => p.id === payload.id).quantity++;
      // console.log("Duplicate", state.cart.map(el => el === product ? payload : el));
      // return { ...state, cart : [...state.cart, {...payload, quantity : product.quantity++}] };
      payload.quantity = product.quantity++;
      // console.log("Quantity", payload.quantity);
      return { ...state, cart: [...state.cart] };
    }
  }
  return { ...state, cart: [...state.cart, payload] };
};

const removeFromCart = (state, payload) => {
  // if (payload) {
  //   var product = state.cart.find(p => p.id === payload.id);
  //   if (product) {
  //     // state.cart.find(p => p.id === payload.id).quantity++;
  //     // console.log("Duplicate", state.cart.map(el => el === product ? payload : el));
  //     // return { ...state, cart : [...state.cart, {...payload, quantity : product.quantity++}] };
  //     // payload.quantity = product.quantity++;
  //     console.log("CART", state.cart);
  //     console.log("ABC", state.cart.filter(el => el.id !== payload.id));
  //     return { ...state, cart:  state.cart.filter(el => el.id == payload.id) };
  //   }
  // }
  return { ...state, cart:  state.cart.filter(el => el.id !== payload.id) };
};
export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return addToCart(state, payload);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, payload);
    default:
      return state;
  }
};
