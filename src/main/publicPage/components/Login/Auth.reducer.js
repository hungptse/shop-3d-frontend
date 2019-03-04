const initialState = {
  signned: false,
  uid: "",
  open: false
};

const setSignned = (state, payload) => {
  return { ...state, signned: payload };
};
const setUID = (state, payload) => {
  return { ...state, uid: payload };
};
const setOpen = (state, payload) => {
  return { ...state, open: payload };
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SIGNNED":
      return setSignned(state, payload);
    case "SET_UID":
      return setUID(state, payload);
    case "SET_OPEN":
      return setOpen(state, payload);
    default:
      return state;
  }
};
