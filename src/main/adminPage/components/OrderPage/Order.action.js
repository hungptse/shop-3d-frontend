import { ORDER_LIST, ORDER_CHANGE_STATUS } from "../../../../utils/ApiEndpoint";
import { get, put } from "../../../../utils/ApiCaller";

const setOrders = payload => ({
  type: "SET_ORDERS",
  payload
});

const changeStatusOrder = payload => ({
  type: "CHANGE_STATUS_ORDER",
  payload
});

export const getOrderFromAPI = () => {
  return async dispatch => {
    await get(ORDER_LIST(), {}, {}).then(res => {
      dispatch(setOrders(res.data));
    });
  };
};

export const changeStatusOrderToAPI = (id, status) => {
  return async dispatch => {
    await put(ORDER_CHANGE_STATUS(id, status), {}, {}, {})
    .then(res => {
      dispatch(changeStatusOrder({id,status}));
    })
    .catch(err => {
      console.log(err);
    });
  };
};

