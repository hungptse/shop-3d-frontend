import { get } from "../../../../utils/ApiCaller";
import { PUBLIC_LIST_PRODUCT } from "../../../../utils/ApiEndpoint";

// const getListProductRequest = () => ({ type: "GET_LIST_PRODUCT_REQUEST" });
const getListProductsSuccess = payload => ({
  type: "GET_LIST_PRODUCT",
  payload
});
// const getListProductFail = (payload) => ({ type: 'GET_LIST_PRODUCT_FAIL', payload });
const setLoading = payload => ({ type: "SET_LOADING", payload });

export const getListProductFromAPI = () => {
  return async dispatch => {
    // dispatch(getListProductRequest());
    await get(PUBLIC_LIST_PRODUCT(), {}, {}).then(result => {
      dispatch(getListProductsSuccess(result.data));
    });
  };
};

export const setLoadingToReducer = loading => {
  return dispatch => dispatch(setLoading(loading));
};
