import { useEffect, useRef, useState, createRef } from "react";
import { PAYMENT_STEP } from "../../services/constants";
import { exitScreen, confirmationInteraction } from "../../services/animations";
import Button from "../Button";
import Loading from "./Loading";
import { useSelector } from "react-redux";

export default function Confirmation({
  name,
  accountNumber,
  bank,
  handleClick,
}) {
  // Variables
  const [paymentObj, setPaymentObj] = useState({});
  const [customerObj, setCustomerObj] = useState({});
  const paymentReducer = useSelector(state => state.paymentReducer);
  const { loading, success, payment } = paymentReducer
  console.log(payment)

  const confirmationDetails = [
    {
      text: "Amount",
      value: "N4,000",
      total: false,
    },
    {
      text: "Transaction charge",
      value: "N100",
      total: false,
    },
    {
      text: "Payment method",
      value: "Card",
      total: false,
    },
    {
      text: "Total Charge",
      value: "N4,100",
      total: true,
    },
  ];

  let detailRef = useRef([]);
  let text = useRef(null);
  let image = useRef(null);
  let title = useRef(null);
  let paragraph = useRef(null);
  let button = useRef(null);
  let wrapper = useRef(null);

  detailRef.current = confirmationDetails.map(
    (element, i) => detailRef.current[i] ?? createRef()
  );

  let obj;
  let obj2;
  let obj3;
  const fetchFromLocalStorage = () => {
    if (!localStorage.getItem("Payment") && localStorage.getItem("AmountScreen")) {
      window.location.href = process.env.REACT_APP.REDIRECT_URL
    }
    obj = localStorage.getItem("Payment");
    obj2 = localStorage.getItem("Customer")
    obj = JSON.parse(obj);
    obj2 = JSON.parse(obj2);
    console.log(obj2)
    setPaymentObj(obj)
    setCustomerObj(obj2)
    console.log(paymentObj?.payment_url)

  }

  const initialisePayment = async () => {
    window.location.href = paymentObj.payment_url
  }


  useEffect(() => {
    confirmationInteraction(wrapper, [
      text,
      image,
      title,
      paragraph,
      ...detailRef.current.map((el) => el.current),
      button,
    ]);
    fetchFromLocalStorage()
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: customerObj?.currency ?? "NGN",
  });


  return (
    <div
      ref={(el) => {
        wrapper = el;
      }}
      className="payment--confirmation"
    >
      <div className="app--container">
        <h6
          ref={(el) => {
            text = el;
          }}
          className="title-text text-center"
        >
          Confirm Payment
        </h6>

        {console.log(loading, success, payment)}
        {loading && <Loading />}
        {!loading && success ? (
          <>
            <div className="card--merchant card--merchant__sm">
              <img
                ref={(el) => {
                  image = el;
                }}
                src="./images/avatar.jpg"
                alt="Merchant-Avatar"
              />
              <h4
                ref={(el) => {
                  title = el;
                }}
              >
                {customerObj && customerObj?.outlet?.name}
              </h4>
              <p
                ref={(el) => {
                  paragraph = el;
                }}
              >
                {customerObj && customerObj?.title} - {customerObj && customerObj?.subTitle}
              </p>
            </div>

            <div className="payment--confirmation__details">


              <div>
                <p className="body-text">Amount</p>

                <p className="body-text">
                  <b>{paymentObj && formatter.format(paymentObj?.amount)}</b>
                </p>

              </div>
              <div>
                <p className="body-text">Transaction Charge</p>

                <p className="body-text">
                  <b>{paymentObj && formatter.format(paymentObj?.transaction_charge)}</b>
                </p>

              </div>
              <div>
                <p className="body-text">Payment Method</p>

                <p className="body-text">
                  <b>{paymentObj && paymentObj?.payment_method}</b>
                </p>

              </div>
              <div>
                <p className="body-text">Total Amount</p>

                <p className="body-text">
                  <b>{paymentObj && formatter.format(paymentObj?.total_amount)}</b>
                </p>

              </div>


            </div>
          </>
        ) : null}
        <div
          ref={(el) => {
            button = el;
          }}
        >
          <Button
            color="primary"
            text="Proceed"
            Click={() =>
              // exitScreen(wrapper, handleClick, PAYMENT_STEP.LOADING)
              initialisePayment()
            }
          />
        </div>
      </div>
    </div>
  );
}
