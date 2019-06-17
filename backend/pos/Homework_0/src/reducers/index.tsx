import { Reducer, combineReducers } from "redux";
import { routerReducer, RouterState } from "react-router-redux";
import { IActionObject } from "../interfaces/IReducers";

// Reducers
import mainState, { IMainReducer } from "./MainReducer";
import itemlistState, { IItemlistReducer } from "./ItemReducers/ItemlistReducer";
import itemState, { IItemReduxState } from "./ItemReducers/ItemReducer";

// Reducers Interfaces
export interface IGlobalStore {
    router: RouterState;
    mainState: IMainReducer;
    itemState: IItemReduxState;
    itemlistState: IItemlistReducer;
}

const reducer: Reducer<IGlobalStore, IActionObject> = combineReducers({
    router: routerReducer,
    mainState,
    itemState,
    itemlistState,
});

export default reducer;
