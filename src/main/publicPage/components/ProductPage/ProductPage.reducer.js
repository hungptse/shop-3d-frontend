const initialState = {
  listProduct: []
  // quantity: 0,
  // status: '',
  // err: false
};
const setListProduct = (state, payload) => {
  if (payload) {
    // state.listProduct = payload;
    // state.loading = false;
    return { ...state, listProduct: payload };
  }
  return { ...state };
};

const addProductToList = (state, payload) => {
  if (payload) {
    // state.listProduct = payload;
    // state.loading = false;
    return { ...state, listProduct : [...state.listProduct, payload] };
  }
  return { ...state };
}

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_LIST_PRODUCT":
      return setListProduct(state, payload);
    case "SET_LIST_PRODUCT":
      return addProductToList(state, payload);
    default:
      return state;
  }
};
