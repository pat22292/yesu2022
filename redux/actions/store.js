import * as t from '../types'
import axios from 'axios';
import localForage from "localforage";


export const importStore = (storeName, storeImg, branches = []) => async dispatch => {

    const formData = new FormData();
    formData.append('store_name', storeName);
    formData.append('store_img', storeImg);
    formData.append('branches', JSON.stringify(branches));

    // formData.append('select_images', galleries);


    var tok;
    await localForage.getItem('mini-session').then(function (value) {
        tok = value['token'];
    }).catch(function (err) {
        console.log(err);
    });

    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    };
    try {
        const apiResponse = await axios.post(process.env.API_URL + `new-store`, formData, config);
        dispatch({
            type: t.NEW_STORE,
            payload: apiResponse.data
        })

    } catch (error) {
        dispatch({
            type: t.NEW_STORE,
            payload: error.status
        })
    }


}

export const getStores = () => async dispatch => {



    try {
        const apiResponse = await axios.get(process.env.API_URL + `show-stores/j`);
        dispatch({
            type: t.SHOW_STORE,
            payload: apiResponse.data
        })

    } catch (error) {
        dispatch({
            type: t.SHOW_STORE,
            payload: error.status
        })
    }


}



