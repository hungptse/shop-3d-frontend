
export const COOKIE_KEY = {
    JWT: "3d_jwt",
    USERNAME : "username"
    // SENDER: "fcode_sendertoken",
    // NOTIFICATION: "fcode_notification_v0"
};

class CookieStorageUtils{
    getItem(key, defaultValue) {
        let name = key + "=";
        let cookies = document.cookie.split(";");

        let value = cookies.find(cookie => {
            cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie;
            }
        });

        return value === undefined ? defaultValue : value.replace(name, "");
    }

    setItem(key, value) {
        let date = new Date();
        date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + date.toGMTString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    }

    removeItem(key) {
        let cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            if (name === key) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        });
    }

    
    clear() {
        let cookies = document.cookie.split(";");
        console.log(cookies);
        cookies.forEach(cookie => {
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            console.log(name);
            let date = new Date();
            date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + date.toGMTString();
            document.cookie = name + "=;" + expires + ";path=/";
        });
    }
}

export default new CookieStorageUtils();