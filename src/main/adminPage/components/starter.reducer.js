const initialState = {
    listAccount: []
};

const setListAccount = (state, payload) => {
    if (payload) {
        state.listAccount = payload;
    }
    
    return { ...state };
};

export const startReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_LIST_ACCOUNT_SUCCESS':
            return setListAccount(state, payload);
        default:
            return state;
    }
};
