import handleCart from "./handleCart";
import handleWallet from "./handleWallet";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  handleCart,
  handleWallet,
});
export default rootReducers;
