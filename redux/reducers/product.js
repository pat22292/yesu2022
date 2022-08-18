import * as t from "../types";

const product = (state = {
    products: [],
    selectedProduct: [],
    galleries: [],
    variations: [],
    variationsEnabled: false,
    variationsOptionEnabled: false,
    selectedProdBranch: [],
    tempVariation: [],
    tempGallery: [],
    tempVarImgs: []

}, action) => {
    switch (action.type) {

        case t.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case t.SET_SELECTED_PRODUCTS:
            return {
                ...state,
                selectedProduct: action.payload,
                galleries: action.payload.img_gallery,
                variations: action.payload.variations,
                selectedProdBranch: action.payload.store_branches
            };
        case t.SET_SELECTED_PRODUCTS_NULL:
            return {
                ...state,
                selectedProduct: action.payload,
            };
        case t.ERROR:
            return {
                ...state,
                error: action.payload
            }
        case t.SHOW_VARIATION:
            return {
                ...state,
                variationsEnabled: action.payload
            }
        case t.SHOW_VARIATION_OPTION:
            return {
                ...state,
                variationsOptionEnabled: action.payload
            }
        case t.TEMP_VARIATION:
            return {
                ...state,
                tempVariation: action.payload
            }
        case t.TEMP_GALLERIES:
            return {
                ...state,
                tempGallery: action.payload
            }
        case t.TEMP_VARIATIONIMGS:
            return {
                ...state,
                tempVarImgs: action.payload
            }
        default:
            return { ...state };
    }
};

export default product;