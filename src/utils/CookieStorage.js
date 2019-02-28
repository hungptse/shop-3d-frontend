import jwt_decode from "jwt-decode";
export const COOKIE_KEY = {
  UID: "3d_uid",
  JWT: "3d_jwt"
};

class CookieStorageUtils {
  getItem(key, defaultValue) {
    let name = key + "=";
    let cookies = document.cookie.split(";");
    let value = cookies.find(cookie => {
      let newCookie = cookie.trim();      
      if (newCookie.indexOf(name) === 0) {
        return newCookie;
      }
    });
    return value === undefined ? defaultValue : value.replace(name, "");
  }

  getSub(){
    if (this.getItem(COOKIE_KEY.JWT) === undefined) {
      return null;
    }
    return jwt_decode(this.getItem(COOKIE_KEY.JWT)).sub;
  }



  setItem(key, value) {
    let date = new Date();
    date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toGMTString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  }

  removeItem(key) {
    // let cookies = document.cookie.split(";");

    // cookies.forEach(cookie => {
    //   let eqPos = cookie.indexOf("=");
    //   let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   if (name === key) {
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //   }
    // });
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  clear() {
    let cookies = document.cookie.split(";");
    // console.log(cookies);
    cookies.forEach(cookie => {
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      // console.log(name);
      let date = new Date();
      date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + date.toGMTString();
      document.cookie = name + "=;" + expires + ";path=/";
    });
  }

  getRole() {
    const jwt = this.getItem(COOKIE_KEY.JWT);
    if (jwt !== undefined) {
        let decode = jwt_decode(jwt);
        return decode.role;
    }
    return "Guest";
}

}

export default new CookieStorageUtils();
