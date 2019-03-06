import uuidv4 from "uuid/v4";
import JWT_Decode from "jwt-decode";

export const LOCAL_STORAGE_KEY = {
  UID: "3d_uid",
  JWT: "3d_jwt",
  CART: "3d_cart"
};

class LocalStorageUtils {
  getItem(key, defaultValue) {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key) || defaultValue;
    }
    return "undefined";
  }

  setItem(key, value) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  }

  isRole() {
    const jwt = this.getItem(LOCAL_STORAGE_KEY.JWT);

    if (jwt !== undefined) {
      let decode = JWT_Decode(jwt);

      if (decode.isAdmin) {
        return "isAdmin";
      } else {
        return "isUser";
      }
    }

    return "isGuest";
  }

  getJWT() {
    return this.getItem(LOCAL_STORAGE_KEY.JWT, "");
  }

  getCart() {
    return this.getItem(LOCAL_STORAGE_KEY.CART);
  }
}

export default new LocalStorageUtils();
