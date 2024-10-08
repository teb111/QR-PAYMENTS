import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Loading from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { verifyTransactionAction } from "../../actions/paymentAction"

const Paid = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  // Check for both "trxref" and "reference" in the URL
  const transaction_ref =
    searchParams.get("trxref") ||
    searchParams.get("reference") ||
    searchParams.get("paymentReference")

  const [error, setError] = useState("")
  const reference = useRef(true)
  const verifyTransaction = useSelector((state) => state.verifyTransaction)
  const { loading, success, transactionVerify } = verifyTransaction

  useEffect(() => {
    if (reference.current) {
      dispatch(verifyTransactionAction(transaction_ref))
      reference.current = false
    }
    if (
      !loading &&
      !(Object.keys(transactionVerify).length === 0) &&
      transactionVerify.constructor === Object
    ) {
      if (transactionVerify?.data.payment_status === "confirmed") {
        navigate("/success")
      } else if (transactionVerify?.data?.status === "error") {
        setError(transactionVerify.message)
      } else if (transactionVerify?.data?.payment_status === "pending") {
        navigate(`/pending?paymentReference=${transaction_ref}`)
      }
    }
  }, [transaction_ref, reference, dispatch, transactionVerify])

  return (
    <>
      {error && <h3 className="p-text text-center">{error}</h3>}
      {loading && <Loading payment={"Confirming Payment"} />}
    </>
  )
}

export default Paid
