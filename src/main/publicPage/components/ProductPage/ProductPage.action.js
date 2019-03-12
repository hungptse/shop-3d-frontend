import { get } from "../../../../utils/ApiCaller";
import { PRODUCT_ENDPOINT } from "../../../../utils/ApiEndpoint";

const getListProducts = payload => ({
  type: "GET_LIST_PRODUCT",
  payload
});

const setListProducts = payload => ({
  type: "SET_LIST_PRODUCT",
  payload
});
const setLoading = payload => ({ type: "SET_LOADING", payload });

export const getListProductFromAPI = () => {
  return async dispatch => {
    await get(PRODUCT_ENDPOINT(), {}, {}).then(result => {
      dispatch(getListProducts(result.data));
    });
  };
};

export const setLoadingToReducer = loading => {
  return dispatch => dispatch(setLoading(loading));
};

export const setListProductsToReducer = product => {
  
  return dispatch => dispatch(setListProducts(product));

}
