export const BASE_URL = "https://localhost:5001";


// Login
export const AUTH__LOGIN = () =>{
    return `${BASE_URL}/auth/login`;
};

// List Prodct
export const PUBLIC_LIST_PRODUCT = () => {
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

export const ADMIN_ADD_PRODUCT = () => {
    return `${BASE_URL}/api/product`;
} ;

