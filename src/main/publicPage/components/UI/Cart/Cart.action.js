

const addCart = (payload) => ({ type: 'ADD_TO_CART', payload });

const removeCart = (payload) => ({ type: 'REMOVE_FROM_CART', payload });

export const addCartToReducer = (cart) => {
  return (dispatch) => {
    dispatch(addCart(cart));
  };
};

export const removeCartFromReducer = (id) => {
  return (dispatch) => {
    dispatch(removeCart(id));
  };
}