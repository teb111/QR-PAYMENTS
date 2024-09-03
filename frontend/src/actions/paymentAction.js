import axios from "axios"
import { PAYMENT_CONSTANTS } from "../services/constants"

export const fetchTransactionAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_CONSTANTS.FETCH_TRANSACTION_REQUEST
    })

    const ref_code = id
    const config = {
      headers: {
        HTTP_AUTHORIZATION_TOKEN: process.env.REACT_APP_TOKEN
      }
    }

    const { data } = await axios.post(
      `https://feego-backend.onrender.com/fetch_payment`,
      { ref_code },
      config
    )
    dispatch({
      type: PAYMENT_CONSTANTS.FETCH_TRANSACTION_SUCCESS,
      payload: data?.data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: PAYMENT_CONSTANTS.FETCH_TRANSACTION_FAIL,
      payload: error
    })
  }
}

export const initialisePaymentAction = (data) => async (dispatch) => {
  const paymentData = {
    ref_code: data?.ref_code,
    amount: data?.amount,
    phone_number: "081765783837",
    fullname: data?.fullname,
    email: data?.email,
    payment_option_id: data?.payment_method_id
  }
  try {
    dispatch({
      type: PAYMENT_CONSTANTS.INITIALISE_PAYMENT_REQUEST
    })

    const config = {
      headers: {
        HTTP_AUTHORIZATION_TOKEN: process.env.REACT_APP_TOKEN
      }
    }

    const { data } = await axios.post(
      `https://feego-backend.onrender.com/initialise_payment`,
      paymentData,
      config
    )
    console.log(data)
    dispatch({
      type: PAYMENT_CONSTANTS.INITIALISE_PAYMENT_SUCCESS,
      payload: data?.data
    })
  } catch (error) {
    dispatch({
      type: PAYMENT_CONSTANTS.INITIALISE_PAYMENT_FAIL,
      payload: error
    })
  }
}

export const verifyTransactionAction =
  (transaction_ref) => async (dispatch) => {
    try {
      dispatch({
        type: PAYMENT_CONSTANTS.VERIFY_TRANSACTION_REQUEST
      })

      const config = {
        headers: {
          HTTP_AUTHORIZATION_TOKEN: process.env.REACT_APP_TOKEN
        }
      }

      console.log(transaction_ref)

      const { data } = await axios.post(
        `https://feego-backend.onrender.com/verify_payment`,
        { transaction_ref },
        config
      )
      dispatch({
        type: PAYMENT_CONSTANTS.VERIFY_TRANSACTION_SUCCESS,
        payload: data?.data
      })
    } catch (error) {
      dispatch({
        type: PAYMENT_CONSTANTS.VERIFY_TRANSACTION_FAIL,
        payload: error
      })
    }
  }
