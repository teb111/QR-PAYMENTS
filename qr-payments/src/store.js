import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { fetchTransactionReducer, initialisePaymentReducer, verifyTransactionReducer } from "./reducers/paymentReducer";


const reducer = combineReducers({
    fetchTransaction: fetchTransactionReducer,
    paymentReducer: initialisePaymentReducer,
    verifyTransaction: verifyTransactionReducer

});

// checking if there is any shippingAddress in the localStorage and Grabbing it

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;