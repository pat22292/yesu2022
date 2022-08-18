// import { type } from 'os'
import * as t from '../types'
import axios from 'axios';
import localForage from "localforage";
import Cookie from 'js-cookie';

export const setInfo = (name) => ({
  type: t.SET_NAME,
  payload: name
});

export const setCartCount = (count) => ({
  type: t.SET_CART_COUNT,
  payload: count
});

export const setCheckoutList = (list) => async dispatch => {

  const newData = {
    'status': true,
    'list': list
  };



  dispatch({
    type: t.SET_CHECKOUTLIST,
    payload: newData
  })
};
export const setCheckModalOff = () => async dispatch => {

  const newData = {
    'status': false,
    'list': []
  };



  dispatch({
    type: t.SET_CHECKOUTMODALOFF,
    payload: newData
  })
}

export const register = (fname, lname, eml, addrss, municipality, cntct, ppicture = null, smImage) => async dispatch => {
  const formData = new FormData();
  formData.append('first_name', fname);
  formData.append('last_name', lname);
  formData.append('email', eml);
  formData.append('address', addrss);
  formData.append('municipality', municipality);
  formData.append('contact_no', cntct);
  formData.append('profile_picture', ppicture);
  formData.append('password', '');


  try {
    const apiResponse = await axios.post(process.env.API_URL + `register`,
      formData
    );
    // console.log(apiResponse.data);+
    localForage.setItem('mini-session', { 'token': apiResponse.data.token, 'user': apiResponse.data.user, 'smProfileImage': smImage });
    dispatch({
      type: t.REGISTER,
      payload: apiResponse.data
    })


  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: t.REGISTER,
      payload: error.message
    })
  }
}

export const registerSm = (fname, lname, eml, addrss, cntct) => async dispatch => {

  dispatch({
    type: t.REGISTERSM,
    payload: { fname, lname, eml, addrss, cntct }
  })

}

export const login = () => async dispatch => {

  const formData = new FormData();
  formData.append('email', 'madlangawapat11@gmail.com');
  formData.append('password', process.env.SC_PW);

  try {
    const apiResponse = await axios.post(process.env.API_URL + `login`,
      formData
    );
    // localStorage.setItem('registered', apiResponse.data.status);
    // console.log(apiResponse.data);
    dispatch({
      type: t.LOGIN,
      payload: apiResponse.data
    })


  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: t.LOGIN,
      payload: error.message
    })
  }
}

export const loginVcode = (eml, vcode, smImage) => async dispatch => {

  const formData = new FormData();
  formData.append('email', eml);
  formData.append('vcode', vcode);

  try {
    const apiResponse = await axios.post(process.env.API_URL + `tokenVcode`,
      formData
    );
    const tokenResponse = await axios.get(process.env.API_URL + `user`, {
      headers: {
        'Authorization': `Bearer ${apiResponse.data.token}`,
        'Access-Control-Allow-Origin': '*',
      }
    });
    // console.log([apiResponse.data.token, tokenResponse.data.data]);

    localForage.setItem('mini-session', { 'token': apiResponse.data.token, 'user': tokenResponse.data.data, 'smProfileImage': smImage });
    // localStorage.setItem('Token', apiResponse.data.token);
    // console.log(apiResponse.data);
    dispatch({
      type: t.LOGINVCODE,
      payload: apiResponse.data.token
    })

    // console.log(apiResponse.data.token);

  } catch (error) {
    alert(`${error.response.data.message} we will send a new code, to avoid conflicts.`);
    dispatch({
      type: t.LOGINVCODE,
      payload: error.response.data
    })
  }
}

export const checkEmail = (eml) => async dispatch => {
  const formData = new FormData();
  formData.append('email', eml);


  try {
    const apiResponse = await axios.post(process.env.API_URL + `checkEmail`,
      formData
    );

    dispatch({
      type: t.CHECKEMAIL,
      payload: apiResponse.data
    })


  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: t.CHECKEMAIL,
      payload: error.message
    })
  }
}

export const renewVcode = (eml) => async dispatch => {
  const formData = new FormData();
  formData.append('email', eml);


  try {
    const apiResponse = await axios.post(process.env.API_URL + `renew-vcode`,
      formData
    );
    // console.log(apiResponse.data);

    dispatch({
      type: t.RENEWVCODE,
      payload: apiResponse.data
    })


  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: t.RENEWVCODE,
      payload: error.message
    })
  }
}

export const signOut = () => async dispatch => {
  var tok;
  await localForage.getItem('mini-session').then(function (value) {
    tok = value['token'];
  }).catch(function (err) {
    console.log(err);
  });
  try {
    const apiResponse = await axios.get(process.env.API_URL + `logout`, {
      headers: {
        'Authorization': `Bearer ${tok}`,
        'Access-Control-Allow-Origin': '*',
      }

    });
    var status = apiResponse.data.code;

    status == 200 ? localForage.removeItem('mini-session') : null;
    // console.log();
    dispatch({
      type: t.SIGN_OUT,
      payload: apiResponse.data.message
    })


  } catch (error) {

    dispatch({
      type: t.SIGN_OUT,
      payload: error.status
    })
  }
}

export const getCart = () => async dispatch => {

  var tok;
  await localForage.getItem('mini-session').then(function (value) {
    tok = value['token'];
  }).catch(function (err) {
    console.log(err);
  });
  try {
    const apiResponse = await axios.get(process.env.API_URL + `cart`, {
      headers: {
        'Authorization': `Bearer ${tok}`,
        'Access-Control-Allow-Origin': '*',
      }
    });
    setCartCount(apiResponse.data);
    localForage.setItem('account-end', { 'cart': apiResponse.data })



    const res = Array.from(
      apiResponse.data.reduce((a, { location, ...rest }) => {
        return a.set(location, [rest].concat(a.get(location) || []));
      }, new Map())
    ).map(([location, children]) => ({ location, children }));

    // return res;
    await dispatch({
      type: t.SET_CART,
      payload: res
    })


  } catch (error) {

    dispatch({
      type: t.SET_CART,
      payload: error.status
    })
  }
}

export const addToCart = (product_id, variation_id, variation_option, quantity, location) => async dispatch => {


  // var var_opt;
  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('variation_id', variation_id);
  formData.append('variation_option', variation_option);
  formData.append('quantity', quantity);
  formData.append('location', location);


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
    const apiResponse = await axios.post(process.env.API_URL + `see-test`, formData, config);

    localForage.setItem('account-end', { 'cart': apiResponse.data })

    await dispatch({
      type: t.ADD_TO_CART,
      payload: apiResponse.data
    })


  } catch (error) {

    dispatch({
      type: t.ADD_TO_CART,
      payload: error.status
    })
  }
}

export const calcDistance = (origin, defaultAddress) => async dispatch => {

  const formData = new FormData();
  formData.append('origin', origin);
  formData.append('destination', defaultAddress);
  try {
    const apiResponse = await axios.post(process.env.API_URL + `calc-distance`,
      formData
    );

    await dispatch({
      type: t.CALC_DISTANCE,
      payload: apiResponse.data.text
    })


  } catch (error) {

    dispatch({
      type: t.CALC_DISTANCE,
      payload: error.status
    })
  }
}

export const deleteCart = (product_id) => async dispatch => {


  // var var_opt;
  const formData = new FormData();
  formData.append('cart_ids', product_id);


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
    const apiResponse = await axios.post(process.env.API_URL + `delete-item-cart`, formData, config);


    // localForage.setItem('account-end', { 'cart': apiResponse.data });

    await dispatch({
      type: t.DELETE_ITEM_CART,
      payload: apiResponse.data
    })


  } catch (error) {

    dispatch({
      type: t.DELETE_ITEM_CART,
      payload: error.status
    })
  }
}

export const alterCart = (newArray) => async dispatch => {
  dispatch({
    type: t.ALTER_CART,
    payload: newArray
  })
}
export const setSelectedCart = (newArray) => async dispatch => {
  dispatch({
    type: t.SET_SELECTED_CART,
    payload: newArray
  })
}

export const postOrder = (order_array, order_total, shipping_total) => async dispatch => {


  // var var_opt;
  const formData = new FormData();
  formData.append('order_array', JSON.stringify(order_array));
  formData.append('order_total', order_total);
  formData.append('shipping_total', shipping_total);


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
    const apiResponse = await axios.post(process.env.API_URL + `new-order`, formData, config);

    localForage.setItem('account-end', { 'cart': apiResponse.data })

    await dispatch({
      type: t.SET_NEW_ORDER,
      payload: apiResponse.data
    })


  } catch (error) {

    dispatch({
      type: t.SET_NEW_ORDER,
      payload: error.status
    })
  }
}

export const myPurchases = () => async dispatch => {


  // var var_opt;


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
    const apiResponse = await axios.get(process.env.API_URL + `view-orders`, config);


    await dispatch({
      type: t.SET_PURCHASES,
      payload: apiResponse.data
    })


  } catch (error) {

    dispatch({
      type: t.SET_PURCHASES,
      payload: error.status
    })
  }
}