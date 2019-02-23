const initialState = {
  listProduct: []
  // quantity: 0,
  // status: '',
  // loading: false,
  // err: false
};
const setListProduct = (state, payload) => {
  if (payload) {
    // state.listProduct = payload;
    // state.loading = false;
    return { ...state, listProduct : payload };
  }
  return { ...state };
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_LIST_PRODUCT":
      return setListProduct(state, payload);
    default:
      return state;
  }
};
