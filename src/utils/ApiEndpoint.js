export const BASE_URL = "https://localhost:5001";


// Login
export const AUTH__LOGIN = () =>{
    return `${BASE_URL}/auth/login`;
};

// List Prodct
export const PRODUCT_ENDPOINT = () => {
    return `${BASE_URL}/api/product`;
};

export const GET_PRODUCT_BY_ID = (id) => {
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

export const FEEDBACK = () => {
    return `${BASE_URL}/api/feedback`;
};



export const ORDER_LIST = () => {
    return `${BASE_URL}/api/order`;
};


export const ORDER_CHANGE_STATUS = (id,status) => {
    return `${BASE_URL}/api/order/change/${id}/status/${status}`;
};


