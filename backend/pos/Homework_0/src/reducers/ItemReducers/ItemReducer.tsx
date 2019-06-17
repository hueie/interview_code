import { IActionHandler, IActionHandlers, IActionObject } from "../../interfaces/IReducers";
import { START, SUCCESS, ERROR, CREATE, READ, UPDATE, DELETE } from "../../actions/commonActionTypes";

import { ITEM_FETCH } from "../../actions/ItemActions/ItemActionTypes";

interface IItemReducer {
    item: {
      itemId: number;
      itemName: string;
      itemImagePath: string;
      itemPlace: string;
      itemPrice: number;
      itemPriceOptions: string;
      itemOnSaleType: string;
      itemOnSaleDateStart: string;
      itemOnSaleDateEnd: string;
    };
    isLoading: boolean;
    error: string;
}

export interface IItemReduxState extends IItemReducer {}

const initialState: IItemReducer = {
    item: {
      itemId: 0,
      itemName: "",
      itemImagePath: "",
      itemPlace: "",
      itemPrice: 0,
      itemPriceOptions: "",
      itemOnSaleType: "",
      itemOnSaleDateStart: "",
      itemOnSaleDateEnd: "",
    },
    isLoading: false,
    error: "",
};
// Action Creator
const createItemFetch: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
    item: payload,
});

const createItemFetchSuccess: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
    item: payload,
});

const readItemFetch: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
//    item: payload, Returning payload is not yet
});

const readItemFetchSuccess: IActionHandler<IItemReducer> = (state, payload) => ({
    item: payload.item,
    isLoading: payload.isLoading,
    error: payload.error,
});

const updateItemFetch: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
     isLoading: false,
    item: payload,
});

const updateItemFetchSuccess: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
    item: payload,
});

const deleteItemFetch: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: false,
    item: payload,
});

const deleteItemFetchSuccess: IActionHandler<IItemReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
    item: payload,
});

const reducerHandler: IActionHandlers<IItemReducer> = {
    [ITEM_FETCH + CREATE]: createItemFetch,
    [ITEM_FETCH + CREATE + SUCCESS]: createItemFetchSuccess,
    [ITEM_FETCH + READ]: readItemFetch,
    [ITEM_FETCH + READ + SUCCESS]: readItemFetchSuccess,
    [ITEM_FETCH + UPDATE]: updateItemFetch,
    [ITEM_FETCH + UPDATE + SUCCESS]: updateItemFetchSuccess,
    [ITEM_FETCH + DELETE]: deleteItemFetch,
    [ITEM_FETCH + DELETE + SUCCESS]: deleteItemFetchSuccess,
};

export default (state = initialState, action: IActionObject): IItemReducer => {
    const reducer: IActionHandler<IItemReducer> = reducerHandler[action.type];
    /*
    console.log("!!!!!!!!!!!!! loading actions type: " + action.type);
    console.log(action.payload);
    console.log("!!!!!state");
    console.log(state);
    console.log("!!!!!reducer");
    console.log(reducer);
    */
    return reducer ? reducer(state, action.payload) : state;
};
