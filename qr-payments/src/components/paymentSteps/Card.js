import { useState, useEffect, useRef } from "react";
import { exitScreen, cardInteraction } from "../../services/animations";

import Button from "../Button";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  getCardType,
} from "../../services/utils";
import { PAYMENT_STEP } from "../../services/constants";

export default function Card({ handleClick }) {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    cvc: "",
  });
  const [issuer, setIssuer] = useState("");
  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setIssuer(getCardType(target.value));
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setCardDetails({ [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    exitScreen(wrapper, handleClick, PAYMENT_STEP.CONFIRMATION);
  };

  let fieldOne = useRef(null);
  let fieldTwo = useRef(null);
  let text = useRef(null);
  let button = useRef(null);
  let wrapper = useRef(null);

  useEffect(() => {
    cardInteraction(wrapper, [text, fieldOne, fieldTwo, button]);
  }, []);

  const getImageSrc = () => {
    switch (issuer) {
      case "mastercard":
        return "http://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_1.gif";

      case "visa":
        return "http://www.credit-card-logos.com/images/visa_credit-card-logos/new_visa_big.gif";

      default:
        return "http://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_1.gif";
    }
  };

  return (
    <div
      ref={(el) => {
        wrapper = el;
      }}
      className="payment--card"
    >
      <form
        className="app--container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h6
          ref={(el) => {
            text = el;
          }}
          className="title-text"
        >
          Enter Card details
        </h6>
        <div
          ref={(el) => {
            fieldOne = el;
          }}
        >
          <p className="p-text label-text">Enter your card number</p>
          <div className="payment--card__number">
            <input
              name="number"
              className="text-field"
              type="tel"
              placeholder="0000 0000 0000 0000"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
            />
            {issuer && <img src={getImageSrc()} alt={issuer} />}
          </div>
        </div>

        <div
          ref={(el) => {
            fieldTwo = el;
          }}
          className="payment--card__cvc"
        >
          <div>
            <p className="p-text label-text">Name on Card</p>
            <input
              type="text"
              name="name"
              className="text-field"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="p-text label-text">CVV</p>
            <div className="payment--card__number">
              <input
                type="tel"
                name="cvc"
                className="text-field"
                pattern="\d{3}"
                required
                onChange={handleInputChange}
              />
              <img src="./images/credit-card-debit.svg" alt="Credit Card" />
            </div>
          </div>
        </div>
        <div
          ref={(el) => {
            button = el;
          }}
        >
          <Button type="submit" color="primary" text="Pay now" />
        </div>
      </form>
    </div>
  );
}
