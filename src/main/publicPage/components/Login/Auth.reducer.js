const initialState = {
  signned: false,
  open: false,
  profile: {}
};

const setSignned = (state, payload) => {
  return { ...state, signned: payload };
};
const setOpen = (state, payload) => {
  return { ...state, open: payload };
};
const setProfile = (state, payload) => {
  return { ...state, profile: payload };
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SIGNNED":
      return setSignned(state, payload);
    case "SET_OPEN":
      return setOpen(state, payload);
    case "SET_PROFILE":
      return setProfile(state, payload);
    default:
      return state;
  }
};
