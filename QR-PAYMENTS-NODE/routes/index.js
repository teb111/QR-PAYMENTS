const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentsController");
const PaymentControllerHandler = PaymentController()

router.post('/fetch_payment', (req, res) => {
    PaymentControllerHandler.FetchPayment(req, res)
})

router.post('/initialise_payment', (req, res) => {
    PaymentControllerHandler.InitialisePayment(req, res)
})
router.post('/verify_payment', (req, res) => {
    PaymentControllerHandler.VerifyTransaction(req, res)
})

module.exports = router