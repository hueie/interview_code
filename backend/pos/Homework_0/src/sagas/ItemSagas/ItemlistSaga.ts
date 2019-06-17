import { SagaIterator } from "redux-saga";
import {select} from "redux-saga/effects";
import { put, takeEvery, all, call, take } from "redux-saga/effects";

import { readItemlistFetchSuccess, readItemlistFetchError } from "../../actions/ItemActions/ItemlistAction";
import { FETCH_DATA } from "../../actions/MainActions/MainTypes";
import { REQUEST, SUCCESS, FAILURE } from "../../actions/createRequestTypes";

import { ITEMLIST_FETCH } from "../../actions/ItemActions/ItemlistActionTypes";

import API from "../../api";
import { ERROR, CREATE, READ, UPDATE, DELETE } from "../../actions/commonActionTypes";
import { AxiosPromise } from "axios";

/*
function* watchItemlistFetchData(): SagaIterator {
    yield takeEvery(ITEMLIST_FETCH + REQUEST, workerItemlist);
}
*/

function readItemlistFetchCall(): AxiosPromise {
//    return API.get("users/${this.state.id}");
    return API.get("item/list");
}

function* readItemlistWorker(): any {
    try {
        console.log("readItemlistFetchCall item/list");
        const res: any = yield call(readItemlistFetchCall);
        // const obj: any = res.data;
        console.log(res.data);
        yield put(readItemlistFetchSuccess(res.data)); // to dispatch another action or .
    } catch (error) {
        console.log("Error");
        yield put({ type: ITEMLIST_FETCH + ERROR, error});
    }
}

export const ItemlistSaga: any = [
    takeEvery(ITEMLIST_FETCH + READ, readItemlistWorker),
];

export default ItemlistSaga;
