import { SagaIterator } from "redux-saga";
import {select} from "redux-saga/effects";
import { put, takeEvery, all, call, take } from "redux-saga/effects";

import { readItemFetchSuccess } from "../../actions/ItemActions/ItemAction";
import { ITEM_FETCH } from "../../actions/ItemActions/ItemActionTypes";
import { FETCH_DATA } from "../../actions/MainActions/MainTypes";
import { REQUEST, SUCCESS, FAILURE } from "../../actions/createRequestTypes";

import API from "../../api";
import { ERROR, CREATE, READ, UPDATE, DELETE } from "../../actions/commonActionTypes";
import { AxiosPromise } from "axios";

export function createItemFetchCall(): AxiosPromise {
    return API.post("item");
}

function* createItemWorker(): any {
    try {
        console.log("workerItem");
        const res: any = yield call(createItemFetchCall);
        const obj: any = res.data;
        console.log(obj);
        console.log("Success : " + JSON.stringify(obj));
      //  yield put(fetchDataSuccess([pItem])); // to dispatch another action or .
    } catch (error) {
        console.log("Error");
        yield put({ type: ITEM_FETCH + CREATE + ERROR, error});
    }
}

export function readItemFetchCall(): AxiosPromise {
    return API.get("item");
}

function* readItemWorker(): any {
    try {
        const res: any = yield call(readItemFetchCall);
        // const obj: any = res.data;
        yield put(readItemFetchSuccess(res.data)); // to dispatch another action or .
    } catch (error) {
        console.log("Error");
        yield put({ type: ITEM_FETCH + READ + ERROR, error});
    }
}

export const ItemSaga: any = [
    takeEvery(ITEM_FETCH + CREATE, createItemWorker),
    takeEvery(ITEM_FETCH + READ, readItemWorker),
];

export default ItemSaga;
