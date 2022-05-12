import { createRef, useState, useEffect, useRef } from "react";
import axios from "axios"
import { PAYMENT_STEP } from "../../services/constants";
import { exitScreen, detailsInteraction } from "../../services/animations";
import MerchantCard from "../MerchantCard";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionAction } from "../../actions/paymentAction";

function Details({ handleClick }) {
  const dispatch = useDispatch()
  let { id } = useParams();
  let wrapper = useRef(null);
  let card = createRef(null);
  let text = useRef(null);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [nameRequired, setNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("")
  const transactionRef = useRef(true)

  const fetchTransaction = useSelector(state => state.fetchTransaction);
  const { loading, success, transaction } = fetchTransaction
  console.log(transaction);


  useEffect(() => {
    if (transactionRef.current) {
      detailsInteraction(wrapper, card, text);
      dispatch(fetchTransactionAction(id));
      transactionRef.current = false;
    }
    if (!loading && success && transaction?.status === "success") {
      setName(transaction?.data?.outlet?.name);
      setBank(transaction?.data?.title);
      setAccountNumber(transaction?.data?.sub_title);
      setNameRequired(transaction?.data?.names_required);
      setEmailRequired(transaction?.data?.email_required);
      setAmount(transaction?.data?.amount);
      setCurrency(transaction?.data?.currency);
      localStorage.setItem('Customer', JSON.stringify(transaction?.data));
      console.log(name, bank, accountNumber)
    } else if (!loading && success && transaction?.status === "error") {
      setError(transaction?.message)
    }
  }, [card, id]);

  return (
    <>
      <div
        ref={(el) => {
          wrapper = el;
        }}
        className="payment--details"
      >
        <div className="app--container">
          {loading ? <Loading /> : error ? (<h3 className="p-text text-center">{error}</h3>) : null}
          {!loading && success && transaction?.status === "success" ? (
            <>
              <MerchantCard
                ref={card}
                name={name}
                accountNumber={accountNumber}
                bank={bank}
                Confirm={() => exitScreen(wrapper, handleClick, PAYMENT_STEP.AMOUNT)}
              />
              <p
                ref={(el) => {
                  text = el;
                }}
                className="p-text text-center payment--intro"
              >
                PaywithQR lets you make payment with a special code. Ensure that the
                details above are correct and tap “proceed to payment”
              </p>
            </>
          ) : null}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;