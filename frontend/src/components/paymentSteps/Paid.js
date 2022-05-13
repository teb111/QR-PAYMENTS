import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from './Loading';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { verifyTransactionAction } from '../../actions/paymentAction';

const Paid = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const transaction_ref = searchParams.get("trxref");
    const [error, setError] = useState("");
    const reference = useRef(true);
    const verifyTransaction = useSelector(state => state.verifyTransaction);
    const { loading, success, transactionVerify } = verifyTransaction
    if (!loading && !(Object.keys(transactionVerify).length === 0) &&
        transactionVerify.constructor === Object) {
        if (transactionVerify?.data.payment_status === "confirmed") {
            navigate("/success")
        } else if (transactionVerify?.data?.status === "error") {
            setError(transactionVerify.message)
        }

    }
    useEffect(() => {
        if (reference.current) {
            dispatch(verifyTransactionAction(transaction_ref));
            reference.current = false
        }
    }, [transaction_ref, reference])

    return (
        <>
            {error && (<h3 className="p-text text-center">{error}</h3>)}
            {loading && (<Loading payment={"Confirming Payment"} />)}


        </>
    )
}

export default Paid