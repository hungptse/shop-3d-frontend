const initialState = {
  signned: false,
  uid: ""
};

const setSignned = (state, payload) => {
  return { ...state, signned: payload };
};
const setUID = (state, payload) => {
  return { ...state, uid: payload };
};


export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SIGNNED":
      return setSignned(state, payload);
    case "SET_UID":
      return setUID(state, payload);
    default:
      return state;
  }
};
