const initialState = {
  cart: [],
  cartIsActive: true
};

const initCart = (state, payload) => {
  return { ...state, cart:  payload };
}

const addToCart = (state, payload) => {
  if (payload) {
    var product = state.cart.find(p => p.id === payload.id);
    if (product) {
      var newQuantity = product.quantity + payload.quantity;
      if (newQuantity >= product.maxQuantity) {
        newQuantity = product.maxQuantity;
      }
      product.quantity = newQuantity;
      return { ...state, cart: [...state.cart] };
    }
  }
  return { ...state, cart: [...state.cart, payload] };
};

const removeFromCart = (state, payload) => {
  return { ...state, cart: state.cart.filter(el => el.id !== payload.id) };
};

const setCartIsActive = (state, payload) => {
  return { ...state, cartIsActive: payload };
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return addToCart(state, payload);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, payload);
    case "SET_CART_ACTIVE":
      return setCartIsActive(state, payload);
    case "SET_CART":
      return initCart(state, payload);
    default:
      return state;
  }
};
