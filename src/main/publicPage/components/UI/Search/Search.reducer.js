const initialState = {
    listCate: [],
    // quantity: 0,
    // status: '',
    // err: false
  };
  const setListCate = (state, payload) => {
    if (payload) {
      // state.listProduct = payload;
      // state.loading = false;
      return { ...state, listCate: payload };
    }
    return { ...state };
  };
  
  export const searchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "GET_LIST_CATE":
        return setListCate(state, payload);
      default:
        return state;
    }
  };
  