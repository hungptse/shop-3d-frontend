import { get } from "../../../utils/ApiCaller";
import {
    ACCOUNT__GET_ALL_ACCOUNT
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";

const getListAccountRequest = () => ({ type: 'GET_LIST_ACCOUNT_REQUEST' });
const getListAccountSuccess = (payload) => ({ type: 'GET_LIST_ACCOUNT_SUCCESS', payload });
const getListAccountFailure = (payload) => ({ type: 'GET_LIST_ACCOUNT_FAILURE', payload });

export const getListAccountFromApi = () => {
    return async (dispatch) => {
        dispatch(getListAccountRequest());
        await get(
            ACCOUNT__GET_ALL_ACCOUNT,
            {},
            {
                Authorization:
                    "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
            })
            .then(res => {
                dispatch(getListAccountSuccess(res.data));
            })
            .catch(err => {
                dispatch(getListAccountFailure(err));
            });
    };
};
