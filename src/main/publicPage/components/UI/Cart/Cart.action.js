import CartLocal from "../../../../../utils/CartLocal";

const addCart = payload => ({ type: "ADD_TO_CART", payload });

const removeCart = payload => ({ type: "REMOVE_FROM_CART", payload });

const setCart = payload => ({ type: "SET_CART", payload });


const setCartIsActive = payload => ({ type: "SET_CART_ACTIVE", payload });

export const addCartToReducer = (product, uid) => {
  return  dispatch => {
    CartLocal.addToCart(product);
    dispatch(addCart(product));    
  };
};

export const removeCartFromReducer = (product) => {
  return dispatch => {
    CartLocal.removeProduct(product.id);
    dispatch(removeCart(product));
  };
};

export const getCartFromLocal = () => {
  return dispatch => {    
    dispatch(setCart(CartLocal.getCart()));
  };
}


export const setCartIsActiveToReducer = status => {
  return dispatch => {
    dispatch(setCartIsActive(status));
  };
};
