import { get } from "../../../../../utils/ApiCaller";
import { PUBLIC_LIST_CATE } from "../../../../../utils/ApiEndpoint";

// const getListProductRequest = () => ({ type: "GET_LIST_PRODUCT_REQUEST" });
const getListCate = payload => ({
  type: "GET_LIST_CATE",
  payload
});
// const getListProductFail = (payload) => ({ type: 'GET_LIST_PRODUCT_FAIL', payload });

export const getListCateFromAPI = () => {
  return async dispatch => {
    await get(PUBLIC_LIST_CATE, {}, {}).then(result => {
      dispatch(getListCate(result.data));
    });
  };
};

