import { ITEM_FETCH } from "./ItemActionTypes";
import { START, SUCCESS, ERROR, CREATE, READ, UPDATE, DELETE } from "../commonActionTypes";
import { IActionCreator } from "../../interfaces/IReducers";
import createRequestTypes, { IRequestTypes } from "../createRequestTypes";

export const ITEM: IRequestTypes = createRequestTypes("ITEM");

export const createItemFetch: IActionCreator<null> = (payload) => ({
    type: ITEM_FETCH + CREATE,
    payload,
});

export const createItemFetchSuccess: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + CREATE + SUCCESS,
    payload,
});

export const createItemFetchError: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + CREATE + ERROR,
    payload,
});

export const readItemFetch: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + READ,
    payload,
});

export const readItemFetchSuccess: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + READ + SUCCESS,
    payload,
});

export const readItemFetchError: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + READ + ERROR,
    payload,
});

export const updateItemFetch: IActionCreator<null> = (payload) => ({
    type: ITEM_FETCH + UPDATE,
    payload,
});

export const updateItemFetchSuccess: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + UPDATE + SUCCESS,
    payload,
});

export const updateItemFetchError: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + UPDATE + ERROR,
    payload,
});

export const deleteItemFetch: IActionCreator<null> = (payload) => ({
    type: ITEM_FETCH + DELETE,
    payload,
});

export const deleteItemFetchSuccess: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + DELETE + SUCCESS,
    payload,
});

export const deleteItemFetchError: IActionCreator<any> = (payload) => ({
    type: ITEM_FETCH + DELETE + ERROR,
    payload,
});
