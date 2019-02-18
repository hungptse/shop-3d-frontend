import uuidv4 from "uuid/v4";
import JWT_Decode from "jwt-decode";

export const LOCAL_STORAGE_KEY = {
    JWT: "fcode_jwt"
    // SENDER: "fcode_sendertoken",
    // NOTIFICATION: "fcode_notification_v0"
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

    getEmail() {
        return this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");
    }

    getName() {
        const email = this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");

        return email.substring(0, email.lastIndexOf("@"));
    }

    generateSenderToken() {
        const token = this.getItem(LOCAL_STORAGE_KEY.SENDER);

        if (!token || token === "undefined") {
            const newSenderToken = uuidv4();

            this.setItem(LOCAL_STORAGE_KEY.SENDER, newSenderToken);
        }
    }

    getSenderToken() {
        return this.getItem(LOCAL_STORAGE_KEY.SENDER, "guest");
    }

    setNotificationLoaded() {
        this.setItem(LOCAL_STORAGE_KEY.NOTIFICATION, true);
    }

    isNotificationLoaded() {
        const loaded = this.getItem(LOCAL_STORAGE_KEY.NOTIFICATION);
        
        return loaded && loaded !== "undefined";
    }
}

export default new LocalStorageUtils();
