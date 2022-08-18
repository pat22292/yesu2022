import * as t from "../types";

const main = (state = {
  first_name: '',
  last_name: '',
  email: '',
  registered: 2,
  message: '',
  address: '',
  contact: '',
  profile_picture: '',
  theme: "dark",
  loading: false,
  error: '',
  INFO: 'Not yet',
  cart: [],
  cartLength: 0,
  selectedCart: [],
  distance: 'Wala pa',
  checkoutList: [],
  orders: [],
  showCheckoutModal: false
}, action) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload
      };


    case t.REGISTER:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        address: action.payload.address,
        contact: action.payload.contact_no,
        // profile_picture: action.payload.profile_picture,
        error: action.payload.error
      };
    case t.REGISTERSM:
      return {
        ...state,
        first_name: action.payload.fname,
        last_name: action.payload.lname,
        email: action.payload.eml,
        address: action.payload.addrss,
        contact: action.payload.cntct,
        profile_picture: action.payload.ppicture,
        error: action.payload.error
      };
    case t.LOGIN:
      return {
        ...state,
        token: action.payload.token,
      };
    case t.LOGINVCODE:
      return {
        ...state,
        token: action.payload,
        error: action.payload.message,
        // cart: action.payload.user.your_cart
      };
    case t.RENEWVCODE:
      return {
        ...state,
        INFO: action.payload.status,
      };
    case t.CHECKEMAIL:
      return {
        ...state,
        registered: action.payload,
      };
    case t.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case t.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case t.DELETE_ITEM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case t.ALTER_CART:
      return {
        ...state,
        cart: action.payload
      };
    case t.SET_SELECTED_CART:
      return {
        ...state,
        selectedCart: action.payload
      };
    case t.SET_CART_COUNT:
      return {
        ...state,
        cartLength: action.payload
      };
    case t.CALC_DISTANCE:
      return {
        ...state,
        distance: action.payload
      };
    case t.SET_PURCHASES:
      return {
        ...state,
        orders: action.payload,
      };
    case t.SET_CHECKOUTLIST:
      return {
        ...state,
        checkoutList: action.payload.list,
        showCheckoutModal: action.payload.status
      };
    case t.SET_CHECKOUTMODALOFF:
      return {
        ...state,
        checkoutList: action.payload.list,
        showCheckoutModal: action.payload.status
      };
    case t.LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case t.SIGN_OUT:
      return {
        ...state,
        // name: "guest",
        message: action.payload
      }
    case t.ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return { ...state };
  }
};

export default main;