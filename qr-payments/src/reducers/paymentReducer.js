import { PAYMENT_CONSTANTS } from "../services/constants";

export const fetchTransactionReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {
        case PAYMENT_CONSTANTS.FETCH_TRANSACTION_REQUEST:
            return {
                loading: true
            }
        case PAYMENT_CONSTANTS.FETCH_TRANSACTION_SUCCESS:
            return {
                loading: false,
                success: true,
                transaction: action.payload,
            }
        case PAYMENT_CONSTANTS.FETCH_TRANSACTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const initialisePaymentReducer = (state = { payment: {} }, action) => {
    switch (action.type) {
        case PAYMENT_CONSTANTS.INITIALISE_PAYMENT_REQUEST:
            return {
                loading: true
            }
        case PAYMENT_CONSTANTS.INITIALISE_PAYMENT_SUCCESS:
            return {
                loading: false,
                success: true,
                payment: action.payload,
            }
        case PAYMENT_CONSTANTS.INITIALISE_PAYMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const verifyTransactionReducer = (state = { transactionVerify: {} }, action) => {
    switch (action.type) {
        case PAYMENT_CONSTANTS.VERIFY_TRANSACTION_REQUEST:
            return {
                loading: true
            }
        case PAYMENT_CONSTANTS.VERIFY_TRANSACTION_SUCCESS:
            return {
                loading: false,
                success: true,
                transactionVerify: action.payload
            }
        case PAYMENT_CONSTANTS.VERIFY_TRANSACTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}