import { IActionHandler, IActionHandlers, IActionObject } from "../../interfaces/IReducers";
import { START, SUCCESS, ERROR, CREATE, READ, UPDATE, DELETE } from "../../actions/commonActionTypes";
import { ITEMLIST_INCREAMENT, ITEMLIST_FETCH } from "../../actions/ItemActions/ItemlistActionTypes";
import {IItem} from "../../pages/ItemlistPage/Item";

export interface IItemlistReducer {
    items: IItem[];
    isLoading: boolean;
    error: string;
}

const initialState: IItemlistReducer = {
    items: [],
    isLoading: false,
    error: "",
};

const readItemlistFetch: IActionHandler<IItemlistReducer> = (state, payload) => ({
    ...state,
    isLoading: true,
//    item: payload, Returning payload is not yet
});

const readItemlistFetchSuccess: IActionHandler<IItemlistReducer> = (state, payload) => ({
    items: payload.items,
    isLoading: payload.isLoading,
    error: payload.error,
});

const increament: IActionHandler<IItemlistReducer> = (state, payload) => ({
    ...state,
    isLoading: false,
    data: payload,
});

const reducerHandler: IActionHandlers<IItemlistReducer> = {
    [ITEMLIST_FETCH + READ]: readItemlistFetch,
    [ITEMLIST_FETCH + READ + SUCCESS]: readItemlistFetchSuccess,
    [ITEMLIST_INCREAMENT + SUCCESS]: increament,
};

export default (state = initialState, action: IActionObject): IItemlistReducer => {
    const reducer: IActionHandler<IItemlistReducer> = reducerHandler[action.type];

    // non-promise logic (simple)
    /*
    switch (action.type) {
        case ITEMLIST_FETCH + START:
            return { ...state };
        case ITEMLIST_FETCH + SUCCESS:
            console.log("fetch success");
            return { ...state };
        case ITEMLIST_FETCH + ERROR:
            console.log("fetch ferror");
            return { ...state };
        case ITEMLIST_INCREAMENT + SUCCESS:
            const q: number = state.item.quantity + 1;
            console.log(q + " : " + state.item.itemname + " : " + state.data);

            // state.item.quantity = quantity;
            return {
                ...state,
                item: {
                    itemname: state.item.itemname,
                    quantity: q,
                },
            };
    }
    */
    // promise logic to Saga (complex)
    return reducer ? reducer(state, action.payload) : state;
};
