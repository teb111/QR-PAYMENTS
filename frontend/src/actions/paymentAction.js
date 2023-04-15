import axios from 'axios'
import { PAYMENT_CONSTANTS } from '../services/constants'

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

    const { data } = await axios.post(`/fetch_payment`, { ref_code }, config)
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
    phone_number: '081765783837',
    fullname: data?.fullname,
    email: data?.email
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
      `/initialise_payment`,
      paymentData,
      config
    )
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

      const { data } = await axios.post(
        `/verify_payment`,
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
