
import LocalStorageUtils, {
  LOCAL_STORAGE_KEY
} from "../../../../utils/LocalStorage";

const setSignned = payload => ({ type: "SET_SIGNNED", payload });
const setUID = payload => ({ type: "SET_UID", payload });
const setOpen = payload => ({ type: "SET_OPEN", payload });

export const setSignnedToReducer = signned => {
  return dispatch => {
    dispatch(setSignned(signned));
  };
};

export const getSignnedFromReducer = () => {
  return dispatch => {
    if (LocalStorageUtils.getSub() != null) {
      dispatch(setSignned(true));
    } else {
      dispatch(setSignned(false));
    }
  };
};

export const setUIDToReducer = (uid) => {
  return dispatch => {
      dispatch(setUID(uid));
  };
};

export const setOpenToReducer = open => {
  return dispatch => {
    dispatch(setOpen(open));
  };
};
