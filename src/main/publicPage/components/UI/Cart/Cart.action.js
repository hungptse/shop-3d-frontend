

const addCart = (payload) => ({ type: 'ADD_TO_CART', payload });

export const addCartToReducer = (cart) => {
  return (dispatch) => {
    dispatch(addCart(cart));
  };
};
