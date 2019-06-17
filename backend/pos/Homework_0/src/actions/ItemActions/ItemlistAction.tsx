import { ITEMLIST_INCREAMENT, ITEMLIST_FETCH } from "./ItemlistActionTypes";

import { START, SUCCESS, ERROR, CREATE, READ, UPDATE, DELETE } from "../commonActionTypes";
import { IActionCreator } from "../../interfaces/IReducers";
import { REQUEST } from "../createRequestTypes";

export const increament: IActionCreator = (payload) => ({
    type: ITEMLIST_INCREAMENT + SUCCESS,
    payload,
});

export const readItemlistFetch: IActionCreator<any> = (payload) => ({
    type: ITEMLIST_FETCH + READ,
    payload,
});

export const readItemlistFetchSuccess: IActionCreator<any> = (payload) => ({
    type: ITEMLIST_FETCH + READ + SUCCESS,
    payload,
});

export const readItemlistFetchError: IActionCreator<any> = (payload) => ({
    type: ITEMLIST_FETCH + READ + ERROR,
    payload,
});
