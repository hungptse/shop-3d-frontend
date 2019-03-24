// export const BASE_URL = "https://localhost:5001";
export const BASE_URL = "https://shopapi-hungpt.azurewebsites.net";



// Login
export const AUTH__LOGIN = () =>{
    return `${BASE_URL}/auth/login`;
};

// List Prodct
export const PRODUCT_ENDPOINT = () => {
    return `${BASE_URL}/api/product`;
};

export const PRODUCT_BY_ID = (id) => {
    return `${BASE_URL}/api/product/${id}`;
};

export const PUBLIC_LIST_CATE = () => {
    return `${BASE_URL}/api/category`;
};

export const ADMIN_LIST_CATE_NAME = () => {
    return `${BASE_URL}/api/category/name`;
} ;

export const CHECK_OUT_CART = () => {
    return `${BASE_URL}/api/order/checkout`;
};


export const PROFILE_ACCOUNT = (uid) => {
    return `${BASE_URL}/api/account/${uid}`;
};

export const ACCOUNT = () => {
    return `${BASE_URL}/api/account`;
};

export const ACCOUNT_CHECK = (username) => {
    return `${BASE_URL}/api/account/check/${username}`;
};

export const FEEDBACK = () => {
    return `${BASE_URL}/api/feedback`;
};

export const FEEDBACK_CHANGE = (id) => {
    return `${BASE_URL}/api/feedback/${id}`;
};

export const FEEDBACK_OF_USER = (uid) => {
    return `${BASE_URL}/api/feedback/user/${uid}`;
};


export const CATE_CHANGE_NAME = (id) => {
    return `${BASE_URL}/api/category/${id}`;
};


export const PRODUCT_RATE = (id) => {
    return `${BASE_URL}/api/product/rate/${id}`;
};

export const ORDER_LIST = () => {
    return `${BASE_URL}/api/order`;
};


export const ORDER_CHANGE_STATUS = (id,status) => {
    return `${BASE_URL}/api/order/change/${id}/status/${status}`;
};


export const CHANGE_PASSWORD = () => {
    return `${BASE_URL}/auth/change_password`;
};

export const ORDER_OF_USER = (uid) => {
    return `${BASE_URL}/api/order/${uid}`;
};
export const ORDER_DETAIL_BY_ID = (id) => {
    return `${BASE_URL}/api/order/detail/${id}`;
};
