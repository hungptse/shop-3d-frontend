import { get, post, put } from "../../../../../utils/ApiCaller";
import { CART } from "../../../../../utils/ApiEndpoint";

const addCart = payload => ({ type: "ADD_TO_CART", payload });

const removeCart = payload => ({ type: "REMOVE_FROM_CART", payload });

const getCart = payload => ({ type: "GET_CART", payload });


export const addCartToReducer = product => {
  return async dispatch => {
    await post(CART + "/demo", {id : product.id, name : product.name, quantity : product.quantity, price : product.price}, {}, {}).then(result => {
      dispatch(addCart(product));
    }).catch(err => {
      console.log(err);
    });
  };

  // return (dispatch) => {
  //   dispatch(addCart(cart));
  // };
};

export const removeCartFromReducer = product => {
  return async dispatch => {
    await put(CART + "/demo", {id : product.id}, {}, {}).then(result => {
      dispatch(removeCart(product));
    }).catch(err => {
      console.log(err);
    });
  }
  

  // return dispatch => {
  //   dispatch(removeCart(id));
  // };
};

export const getCartFromAPI = () => {
  return async dispatch => {
    await get(CART + "/demo",{},{}).then(result => {
      dispatch(getCart(result.data.cart));
    }).catch(err => {
      console.log(err);
    });
  }
}
