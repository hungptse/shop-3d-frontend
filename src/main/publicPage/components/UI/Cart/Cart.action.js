import { get, post, put } from "../../../../../utils/ApiCaller";
import { CART } from "../../../../../utils/ApiEndpoint";

const addCart = payload => ({ type: "ADD_TO_CART", payload });

const removeCart = payload => ({ type: "REMOVE_FROM_CART", payload });

const getCart = payload => ({ type: "GET_CART", payload });


export const addCartToReducer = (product, uid) => {
  return async dispatch => {
    await post(
      CART + "/" + uid.trim(),
      {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price
      },
      {},
      {}
    )
      .then(result => {
        console.log(result.data);
        
        dispatch(addCart(product));
        dispatch(getCart(result.data.cart));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // return (dispatch) => {
  //   dispatch(addCart(cart));
  // };
};

export const removeCartFromReducer = (product, uid) => {
  return async dispatch => {
    await put(CART + "/" + uid, { id: product.id }, {}, {})
      .then(result => {
        dispatch(removeCart(product));
        dispatch(getCart(result.data.cart));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // return dispatch => {
  //   dispatch(removeCart(id));
  // };
};

export const getCartFromAPI = (uid) => {
  if (uid !== undefined) {
  return async dispatch => {
      await get(CART + "/" + uid, {}, {})
      .then(result => {
        if (result.data.cart !== undefined) {
          dispatch(getCart(result.data.cart));
        }
        console.log(result, "AFTER LOGIN");
      })
      .catch(err => {
        dispatch(getCart([]));
        console.log(err);
      });
    };
  } 
  return dispatch => {
    dispatch(getCart([]));
  }
};


