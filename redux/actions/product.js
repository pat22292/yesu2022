import * as t from '../types'
import axios from 'axios';
import localForage from "localforage";

export const setProducts = () => async dispatch => {
    try {
        const apiResponse = await axios.get(process.env.API_URL + `view-products`);
        dispatch({
            type: t.SET_PRODUCTS,
            payload: apiResponse.data.products
        })
    } catch (error) {
        dispatch({
            type: t.SET_PRODUCTS,
            payload: error
        })
    }
}

export const showVariation = (status) => ({
    type: t.SHOW_VARIATION,
    payload: status
});

export const showVariationOption = (status) => ({
    type: t.SHOW_VARIATION_OPTION,
    payload: status

});

export const setTempVariation = (data) => ({
    type: t.TEMP_VARIATION,
    payload: data
});

export const setTempGalleries = (data) => ({
    type: t.TEMP_GALLERIES,
    payload: data
});

export const setTempVariationImgs = (data) => ({
    type: t.TEMP_VARIATIONIMGS,
    payload: data
});


export const setSelectedProducts = (id) => async dispatch => {
    try {
        const apiResponse = await axios.get(process.env.API_URL + `product/` + id);
        dispatch({
            type: t.SET_SELECTED_PRODUCTS,
            payload: apiResponse.data
        })


    } catch (error) {
        console.log(error);
        dispatch({
            type: t.SET_SELECTED_PRODUCTS,
            payload: error
        })
    }
}

export const setSelectedProductsNull = (data) => ({
    type: t.SET_SELECTED_PRODUCTS_NULL,
    payload: data
});

// export const newProduct = (productName, description, variation, variationOption, packageLength, packageWidth, packageHeight, packageWeight, price, coverImg, selectImages = [], variationParentName = [], variationImage = [], childJson = []) => async dispatch => {
export const newProductUpload = (productName, description, price, varName, variationPrice = [], varOptName, variationParentName = [], childJson = [], img, galleries = [], varImags = [], store_id) => async dispatch => {
    var tok;
    await localForage.getItem('mini-session').then(function (value) {
        tok = value['token'];
    }).catch(function (err) {
        console.log(err);
    });

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('description', description);
    formData.append('variation', varName);
    formData.append('variation_option', varOptName);
    formData.append('package_length', 1);
    formData.append('package_width', 1);
    formData.append('package_height', 1);
    formData.append('package_weight', 1);
    formData.append('price', price);
    formData.append('select_file', img);
    formData.append('store_id', store_id);
    // formData.append('select_images', galleries);

    if (varName != null) {
        variationParentName.forEach((item, index) => {
            formData.append(`variation_parent_name[${index}]`, item.toString());
            if (variationPrice != null) {
                formData.append(`variation_price[${index}]`, variationPrice[index]);
            }
        });

    }

    varImags.forEach((item, index) => {
        formData.append(`variation_image[${index}]`, item);
    });


    galleries.forEach((item, index) => {
        formData.append(`select_images[${index}]`, item);
    });


    if (varOptName != null) {
        childJson.forEach((item, index) => {
            formData.append(`child_json[${index}]`, JSON.stringify(item));
        });
    }

    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    };
    try {
        const apiResponse = await axios.post(process.env.API_URL + `add-product`, formData, config);
        dispatch({
            type: t.NEW_PRODUCT,
            payload: apiResponse.data
        })

    } catch (error) {
        dispatch({
            type: t.NEW_PRODUCT,
            payload: error.status
        })
    }


}



