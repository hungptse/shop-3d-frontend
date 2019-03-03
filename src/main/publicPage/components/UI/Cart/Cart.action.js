import { get, post, put } from "../../../../../utils/ApiCaller";
import { CART, CART_BY_UID } from "../../../../../utils/ApiEndpoint";

const addCart = payload => ({ type: "ADD_TO_CART", payload });

const removeCart = payload => ({ type: "REMOVE_FROM_CART", payload });

const getCart = payload => ({ type: "GET_CART", payload });

const setCartIsActive = payload => ({ type: "SET_CART_ACTIVE", payload });

export const addCartToReducer = (product, uid) => {
  return async dispatch => {
    await post(
      CART_BY_UID(uid.trim()),
      {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        thumbnail : product.thumbnail
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
    await put(CART_BY_UID(uid), { id: product.id }, {}, {})
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

export const getCartFromAPI = uid => {
  if (uid !== undefined) {
    return async dispatch => {
      await get(CART_BY_UID(uid), {}, {})
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
  };
};

export const setCartIsActiveToReducer = status => {
  return dispatch => {
    dispatch(setCartIsActive(status));
  };
};
