import * as t from "../types";

const store = (state = {
    stores: [],

}, action) => {
    switch (action.type) {
        case t.NEW_STORE:
            return {
                ...state,
                name: action.payload
            }
        case t.SHOW_STORE: {
            return {
                ...state.stores,
                stores: action.payload
            }
        }
        default:
            return { ...state };
    }
};

export default store;