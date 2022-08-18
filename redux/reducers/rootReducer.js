import { combineReducers } from "redux"
import main from "./main"
import product from "./product"
import store from "./store"

const rootReducer = combineReducers({
  main: main,
  product: product,
  store: store
})

export default rootReducer;