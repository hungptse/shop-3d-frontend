import CookieStorageUtils, {
  COOKIE_KEY
} from "../../../../utils/CookieStorage";
import { DeviceUUID } from "device-uuid/lib/device-uuid";
import { put } from "../../../../utils/ApiCaller";
import { CHANGE_USER_OF_CART } from "../../../../utils/ApiEndpoint";

const setSignned = payload => ({ type: "SET_SIGNNED", payload });
const setUID = payload => ({ type: "SET_UID", payload });


export const setSignnedToReducer = signned => {
  return dispatch => {
    dispatch(setSignned(signned));
  };
};

export const getSignnedFromReducer = () => {
  return dispatch => {
    if (CookieStorageUtils.getSub() != null) {
      dispatch(setSignned(true));
    } else {
      dispatch(setSignned(false));
    }
  };
};

export const setUIDToReducer = uid => {
  let annonymousID = new DeviceUUID().get();  
  if (uid !== undefined) {
    return async dispatch => {
      await put(
        CHANGE_USER_OF_CART(),
        { old_id: annonymousID, new_id: uid },
        {},
        {}
      ).then(res => {
        if (res.status !== 400) {
          console.log("RES");
          dispatch(setUID(uid));
        }
      }).catch(err => {
        console.log("ERR");
        
        dispatch(setUID(uid));
      });
    };
  }
  return dispatch => {
      dispatch(setUID(annonymousID));
  };
};
export const getUIDFromReducer = () => {
  return async dispatch => {
    if (CookieStorageUtils.getItem(COOKIE_KEY.JWT)) {
      dispatch(setUID(CookieStorageUtils.getItem(COOKIE_KEY.UID)));
    } else {
      let annonymousID = new DeviceUUID().get();
      dispatch(setUID(annonymousID));
      CookieStorageUtils.setItem(COOKIE_KEY.UID, annonymousID);
    }
  };
};
