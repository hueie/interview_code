import { SagaIterator } from "redux-saga";
import {select} from "redux-saga/effects";
import { put, takeEvery, all, call, take } from "redux-saga/effects";

import { FETCH_DATA } from "../actions/MainActions/MainTypes";
import ItemSaga from "./ItemSagas/ItemSaga";
import ItemlistSaga from "./ItemSagas/ItemlistSaga";

function* helloSaga(): SagaIterator {
    // const state = yield select();
    console.log("Hello Sagas! ");
}

// TODO: Define type
function* rootSaga(): any {
    yield all([
        helloSaga(),
//        watchFetchData(),
        ...ItemSaga,
        ...ItemlistSaga,
    ]);
}

export default rootSaga;
