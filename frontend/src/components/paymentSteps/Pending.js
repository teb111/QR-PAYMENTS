import { useEffect, useRef, useState } from "react"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import { useNavigate, useSearchParams } from "react-router-dom"

import { PAYMENT_STEP } from "../../services/constants"
import Button from "../Button"
import { successInteraction } from "../../services/animations"
import { useDispatch, useSelector } from "react-redux"
import { verifyTransactionAction } from "../../actions/paymentAction"

export default function Pending({ handleClick }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [modal, setModal] = useState(false)
  const [error, setError] = useState("")
  const [confirmObj, setConfirmObj] = useState({})
  const [transDate, setDate] = useState("")
  const verifyTransaction = useSelector((state) => state.verifyTransaction)
  const { loading, success, transactionVerify } = verifyTransaction

  const transaction_ref =
    searchParams.get("trxref") ||
    searchParams.get("reference") ||
    searchParams.get("paymentReference")

  let obj
  const fetchFromLocalStorage = () => {
    obj = localStorage.getItem("ConfirmationScreen")
    obj = JSON.parse(obj)
    setConfirmObj(obj)
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const confirmationDetails = [
    {
      text: "Date",
      value:
        transactionVerify && transactionVerify?.data
          ? transactionVerify?.data?.created_at
          : null,
      total: false
    },
    {
      text: "Payment method",
      value: "Card",
      total: false
    },
    {
      text: "Amount",
      value:
        transactionVerify && transactionVerify?.data
          ? "NGN " + transactionVerify?.data?.amount
          : null,
      total: false
    },
    {
      text: "Reference",
      value:
        transactionVerify && transactionVerify?.data
          ? transactionVerify?.data?.trans_reference
          : null,
      total: false
    }
  ]

  let text = useRef(null)
  let paragraph = useRef(null)
  let wrapper = useRef(null)
  let button = useRef(null)

  useEffect(() => {
    fetchFromLocalStorage()
    successInteraction(wrapper, [text, paragraph, button])
    if (
      transactionVerify !== null &&
      Object.keys(transactionVerify || {})?.length > 0 &&
      transactionVerify?.constructor === Object
    ) {
      // Ensure transactionVerify.data is not null or undefined
      if (
        transactionVerify?.data &&
        transactionVerify.data.payment_status === "confirmed"
      ) {
        console.log(transactionVerify.data.payment_status)
        navigate(`/paid?paymentReference=${transaction_ref}`)
      }
    } else {
      console.error("transactionVerify is null or empty")
    }
  }, [transactionVerify, navigate])

  console.log(transactionVerify)

  const requeryStatus = () => {
    dispatch(verifyTransactionAction(transaction_ref))
  }

  return (
    <div
      ref={(el) => {
        wrapper = el
      }}
      className="payment--success"
    >
      {/* <img src="./images/success.svg" alt="Payment Successful" /> */}
      <h6
        ref={(el) => {
          text = el
        }}
        className="title-text text-center"
      >
        Payment Pending
      </h6>
      <p
        ref={(el) => {
          paragraph = el
        }}
        className="p-text text-center payment--intro"
      >
        Please Click the button below to requery payment
      </p>
      <div
        ref={(el) => {
          button = el
        }}
        className="payment--success__btn"
      >
        <Button
          color="primary"
          text="Requery Transaction"
          Click={() => requeryStatus()}
        />
      </div>
      <div className="payment--success__modal">
        {/* <Rodal
          visible={modal}
          onClose={closeModal}
          showCloseButton={false}
          width={327}
          height={456}
          enterAnimation="slideUp"
          leaveAnimation="slideDown"
        >
          <img src="./images/avatar.jpg" alt="Merchant-Avatar" />
          <h6 className="title-text text-center">
            {confirmObj && confirmObj?.fullname}
          </h6>
          <h5 className="text-center">Payment Reciept</h5>
          <div className="payment--confirmation__details payment--success__details">
            {confirmationDetails.map((item, index) => {
              return (
                <div key={index}>
                  <p className="body-text">{item.text}</p>
                  {item.total ? (
                    <p className="body-text">
                      <b>{item.value}</b>
                    </p>
                  ) : (
                    <p className="body-text">{item.value}</p>
                  )}
                </div>
              )
            })}
          </div>
          <Button color="primary" text="Okay" Click={() => navigate("/")} />
        </Rodal> */}
      </div>
    </div>
  )
}
