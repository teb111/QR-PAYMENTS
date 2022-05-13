import { useEffect, useRef, createRef, useState } from "react";
import Button from "../Button";
import axios from "axios"
import { BUTTON_ICONS, PAYMENT_STEP } from "../../services/constants";
import { exitScreen, methodInteraction } from "../../services/animations";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { initialisePaymentAction } from "../../actions/paymentAction";

export default function Method({ handleClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmObj, setConfirmObj] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchTransaction = useSelector(state => state.fetchTransaction);
  const { transaction } = fetchTransaction
  const paymentReducer = useSelector(state => state.paymentReducer);
  const { loading: paymentLoading, success, payment } = paymentReducer
  if (!paymentLoading && !(Object.keys(payment).length === 0) &&
    payment.constructor === Object) {
    localStorage.setItem('Payment', JSON.stringify(payment?.data));
    navigate('/confirmation')
  }
  const doNothing = () => {
    alert('Coming Soon')
  }
  const initialisePayment = async () => {
    setLoading(true);
    try {
      const data = {
        email: confirmObj?.email,
        fullname: confirmObj?.fullname,
        amount: confirmObj?.amount,
        ref_code: confirmObj?.ref_code
      }
      dispatch(initialisePaymentAction(data))


    } catch (error) {
      return error
    }
  }
  const buttons = [
    {
      text: "Paystack",
      icon: BUTTON_ICONS.PAYSTACK,
      color: "paystack",
      textFunction: () => initialisePayment(),
      disabled: false,
    },
    {
      text: "National Bank of Kenya",
      icon: BUTTON_ICONS.NBK,
      color: "warning",
      textFunction: () => doNothing(),
      disabled: true,
    },
    {
      text: "Kenya Commercial Bank",
      icon: BUTTON_ICONS.KCB,
      color: "success",
      textFunction: () => doNothing(),
      disabled: true,
    },
    {
      text: "ABSA Bank Kenya",
      icon: BUTTON_ICONS.ABSA,
      color: "error",
      textFunction: () => doNothing(),
      disabled: true,
    },
    {
      text: "Apple Pay",
      icon: BUTTON_ICONS.APPLE,
      color: "dark",
      textFunction: () => doNothing(),
    },
    {
      text: "Google Pay",
      icon: BUTTON_ICONS.GOOGLE_PAY,
      color: "light",
      textFunction: () => doNothing(),
    },
    {
      text: "Debit/Credit card",
      icon: BUTTON_ICONS.CARD,
      color: "primary",
      textFunction: () => doNothing(),
    },
  ];

  let buttonsRef = useRef([]);
  buttonsRef.current = buttons.map(
    (element, i) => buttonsRef.current[i] ?? createRef()
  );
  let text = useRef(null);
  let wrapper = useRef(null);

  let obj;
  const fetchFromLocalStorage = () => {
    obj = localStorage.getItem("ConfirmationScreen")
    obj = JSON.parse(obj);
    setConfirmObj(obj)

  }
  useEffect(() => {
    methodInteraction(wrapper, text, buttonsRef);
    fetchFromLocalStorage();
    if (confirmObj.ref_code === "") {
      navigate("/");
    }
  }, [buttonsRef, transaction]);

  return (
    <div
      ref={(el) => {
        wrapper = el;
      }}
      className="payment--method"
    >
      <div className="app--container">
        <h6
          ref={(el) => {
            text = el;
          }}
          className="title-text"
        >
          Select Payment method
        </h6>

        {loading ? <Loading payment={"Please hold on"} /> : error ? (<h3 className="p-text text-center">{error}</h3>) : (
          buttons.map((button, index) => {
            return (
              <div key={index} ref={buttonsRef.current[index]}>
                <Button
                  icon={button.icon}
                  color={button.color}
                  text={button.text}
                  Click={() =>
                    // exitScreen(wrapper, handleClick, PAYMENT_STEP.CARD)
                    button.textFunction()
                  }
                />
              </div>

            )
          }))
        }
      </div>
    </div>
  );
}
