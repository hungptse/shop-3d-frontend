import LocalStorageUtils from "../../../../utils/LocalStorage";
import {PROFILE_ACCOUNT} from "../../../../utils/ApiEndpoint";
import {get} from "../../../../utils/ApiCaller";

const setSignned = payload => ({ type: "SET_SIGNNED", payload });
const setOpen = payload => ({ type: "SET_OPEN", payload });
const setProfile = payload => ({ type: "SET_PROFILE", payload });


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


export const setOpenToReducer = open => {
  return dispatch => {
    dispatch(setOpen(open));
  };
};

export const setProfileToReducer = () => {
  return async dispatch => {
    await get(PROFILE_ACCOUNT(LocalStorageUtils.getSub())).then(res => {
      dispatch(setProfile(res.data));
    })
  };
};