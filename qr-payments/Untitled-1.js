
// const fetchTransaction = async () => {
//   const ref_code = id;
//   const config = {
//     headers: {
//       HTTP_AUTHORIZATION_TOKEN: process.env.REACT_APP_TOKEN,
//     },
//   };

//   try {
//     const { data } = await axios.post(
//       `http://localhost:5000/fetch_payment`,
//       { ref_code },
//       config
//     );
//     // console.log(data?.data)
//     if (data?.data?.status === "error") {
//       setError(data?.data?.message);
//     }
//     if (data) {
//       setLoading(false);
//       setName(data?.data?.data?.outlet?.name);
//       setBank(data?.data?.data?.title);
//       setAccountNumber(data?.data?.data?.sub_title);
//       setNameRequired(data?.data?.names_required);
//       setEmailRequired(data?.data?.emailRequired);
//       setAmount(data?.data?.amount);
//     }
//   } catch (error) {
//     // setError(error?.message);
//     console.log(error);
//   }
// };

import { createRef, useEffect, useRef, useState } from "react";

import { PAYMENT_STEP } from "../../services/constants";
import { exitScreen, detailsInteraction } from "../../services/animations";
import MerchantCard from "../MerchantCard";
import Footer from "../Footer";
import LinearLoader from "../LinearLoader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTransaction } from "../../actions/paymentAction";

function Details({ handleClick }) {
    const dispatch = useDispatch();
    let { id } = useParams();
    let wrapper = useRef(null);
    let card = createRef(null);
    let text = useRef(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [bank, setBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [error, setError] = useState("");
    const [nameRequired, setNameRequired] = useState("");
    const [emailRequired, setEmailRequired] = useState("");
    const [amount, setAmount] = useState("");
    // const transactionFetch = useSelector((state) => state.transactionFetch);
    // const { loading: loadingTransaction, success: success, transaction: transaction } = transactionFetch;
    // console.log(transactionFetch)

    useEffect(() => {
        detailsInteraction(wrapper, card, text);
        dispatch(fetchTransaction(id))
    }, [card, dispatch, id]);

    return (
        <>
            { }
            {loading ? (
                <LinearLoader />
            ) : error ? (
                <h4>{error}</h4>
            ) : (
                <div
                    ref={(el) => {
                        wrapper = el;
                    }}
                    className="payment--details"
                >
                    <div className="app--container">
                        {/* <MerchantCard
              ref={card}
              name={name}
              accountNumber={accountNumber}
              bank={bank}
              Confirm={() => exitScreen(wrapper, handleClick, PAYMENT_STEP.AMOUNT)}
            /> */}
                        <MerchantCard
                            ref={card}
                            name="Ahmed John"
                            accountNumber="9023475834"
                            bank="GT Bank"
                            Confirm={() => exitScreen(wrapper, handleClick, PAYMENT_STEP.AMOUNT)}
                        />
                        <p
                            ref={(el) => {
                                text = el;
                            }}
                            className="p-text text-center payment--intro"
                        >
                            PaywithQR lets you make payment with a special code. Ensure that
                            the details above are correct and tap “proceed to payment”
                        </p>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default Details;


const fetchTransaction = async () => {
    const ref_code = id;
    const config = {
        headers: {
            HTTP_AUTHORIZATION_TOKEN: process.env.REACT_APP_TOKEN,
        },
    };

    try {
        const { data } = await axios.post(
            `http://localhost:5000/fetch_payment`,
            { ref_code },
            config
        );
        console.log(data?.data)
        if (data?.data?.status === "error") {
            setError(data?.data?.message);
        }
        if (data) {
            setLoading(false);
            setName(data?.data?.data?.outlet?.name);
            setBank(data?.data?.data?.title);
            setAccountNumber(data?.data?.data?.sub_title);
            setNameRequired(data?.data?.data?.names_required);
            setEmailRequired(data?.data?.data?.email_required);
            setAmount(data?.data?.data?.amount);
            setCurrency(data?.data?.data?.currency);
            // save to localStorage
            if (name !== "" && bank !== "" && nameRequired !== "") {
                console.log(nameRequired)
                localStorage.setItem('AmountScreen', JSON.stringify({
                    ref_code: id, name, bank, emailRequired, nameRequired, amount, accountNumber, currency
                }))
            }
        }
    } catch (error) {
        // setError(error?.message);
        console.log(error);
    }
};