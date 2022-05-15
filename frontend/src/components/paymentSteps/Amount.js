import { useState, useEffect, useRef } from "react";
import { CURRENCY_SYMBOL, PAYMENT_STEP } from "../../services/constants";
import { exitScreen, amountInteraction } from "../../services/animations";

import CurrencyInput from "react-currency-input";
import Footer from "../Footer";
import Button from "../Button";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Amount({ handleClick }) {
  const navigate = useNavigate();
  // State variables
  // const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState({});
  const [amountObj, setAmountObj] = useState();
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [nameRequired, setNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [amount, setAmount] = useState(0);
  const [defaultAmount, setDefaultAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [ref_code, setRefCode] = useState("");
  const fetchTransaction = useSelector((state) => state.fetchTransaction);
  const { loading, success, transaction } = fetchTransaction;

  // Functions
  const handleInput = (e, maskedvalue, floatvalue) => {
    setAmount(floatvalue);
  };
  let image = useRef(null);
  let wrapper = useRef(null);
  let heading = useRef(null);
  let input = useRef(null);
  let button = useRef(null);
  let emailField = useRef(null);
  let nameField = useRef(null);

  useEffect(() => {
    amountInteraction(
      wrapper,
      image,
      heading,
      input,
      emailField,
      nameField,
      button
    );
    let componentDidMount_super = CurrencyInput.prototype.componentDidMount;
    CurrencyInput.prototype.componentDidMount = function () {
      if (!this.props.autoFocus) {
        let setSelectionRange_super = this.theInput.setSelectionRange;
        this.theInput.setSelectionRange = () => { };
        componentDidMount_super.call(this, ...arguments);
        this.theInput.setSelectionRange = setSelectionRange_super;
      } else {
        componentDidMount_super.call(this, ...arguments);
      }
    };

    let componentDidUpdate_super = CurrencyInput.prototype.componentDidUpdate;
    CurrencyInput.prototype.componentDidUpdate = function () {
      if (!this.props.autoFocus) {
        let setSelectionRange_super = this.theInput.setSelectionRange;
        this.theInput.setSelectionRange = () => { };
        componentDidUpdate_super.call(this, ...arguments);
        this.theInput.setSelectionRange = setSelectionRange_super;
      } else {
        componentDidMount_super.call(this, ...arguments);
      }
    };
    if (!loading && success && transaction?.status === "success") {
      setName(transaction?.data?.outlet?.name);
      setBank(transaction?.data?.title);
      setAccountNumber(transaction?.data?.sub_title);
      setNameRequired(transaction?.data?.names_required);
      setEmailRequired(transaction?.data?.email_required);
      setAmount(transaction?.data?.amount);
      setDefaultAmount(transaction?.data?.amount);
      setCurrency(transaction?.data?.currency);
      setRefCode(transaction?.data?.ref_code);
    } else if (name === "") {
      navigate("/")
    }
  }, []);

  const handleInputChange = ({ target }) => {
    setDetails({ ...details, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "ConfirmationScreen",
      JSON.stringify({
        email: details?.email,
        fullname: details?.name,
        amount,
        ref_code,
      })
    );
    exitScreen(wrapper, handleClick, PAYMENT_STEP.METHOD);
  };

  return (
    <>
      <div
        ref={(el) => {
          wrapper = el;
        }}
        className="payment--amount"
      >
        <div className="app--container">
          <div className="payment--amount__heading">
            <img
              ref={(el) => {
                image = el;
              }}
              src="./images/avatar.jpg"
              alt="Merchant-Profile"
            />

            <div
              className="payment--amount__heading-text"
              ref={(el) => {
                heading = el;
              }}
            >
              <h6>{name}</h6>
              <p>
                {accountNumber}- {bank}
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div
              ref={(el) => {
                nameField = el;
              }}
            >
              <p className="p-text label-text">
                Full Name <i>{nameRequired === 0 && "(optional)"}</i>
              </p>
              <input
                type="text"
                name="name"
                className="text-field"
                onChange={handleInputChange}
                required={nameRequired === 1 ? true : false}
              />
            </div>
            <div
              ref={(el) => {
                emailField = el;
              }}
            >
              <p className="p-text label-text">
                Email <i>{emailRequired === 0 && "(optional)"}</i>
              </p>
              <input
                type="email"
                name="email"
                className="text-field"
                onChange={handleInputChange}
                required={emailRequired === 1 ? true : false}
              />
            </div>
            <div
              ref={(el) => {
                input = el;
              }}
            >
              <p className="p-text label-text">Enter amount to pay</p>
              <CurrencyInput
                className="text-field text-field--large"
                thousandSeparator=","
                inputType="tel"
                prefix={CURRENCY_SYMBOL}
                value={defaultAmount !== 0 ? defaultAmount : amount}
                onChangeEvent={handleInput}
                disabled={defaultAmount === 0 ? false : true}
              />
            </div>

            <div
              ref={(el) => {
                button = el;
              }}
            >
              <Button
                color="primary"
                disabled={!amount}
                text="Proceed"
                type="submit"
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
