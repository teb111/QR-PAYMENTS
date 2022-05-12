const axios = require("axios");
const asyncHandler = require("express-async-handler");
const errorResponse = require("../response/error");
const ResponseMsg = require("../response/message");
const successResponse = require("../response/success");

const PaymentController = () => {
    const FetchPayment = asyncHandler(async (req, res) => {
        try {
            if (req.body.hasOwnProperty("ref_code")) {
                const { ref_code } = req.body;

                const config = {
                    headers: {
                        HTTP_AUTHORIZATION_TOKEN: process.env.HTTP_AUTHORIZATION_TOKEN,
                    },
                };

                try {
                    const { data } = await axios.post(
                        `${process.env.BASE_URL}/extensions/feego/pay/get_info`,
                        { ref_code },
                        config
                    );
                    return successResponse(res, data);
                } catch (error) {
                    return errorResponse(res, error);
                }
            } else {
                return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA);
            }
        } catch (error) {
            return errorResponse(res, error);
        }
    });

    const InitialisePayment = asyncHandler(async (req, res) => {
        try {
            if (
                req.body.hasOwnProperty("ref_code") &&
                req.body.hasOwnProperty("amount") &&
                req.body.hasOwnProperty("phone_number")
            ) {
                const { ref_code, amount, email, phone_number, fullname } = req.body;

                const config = {
                    headers: {
                        HTTP_AUTHORIZATION_TOKEN: process.env.HTTP_AUTHORIZATION_TOKEN,
                    },
                };

                // if (req.headers.HTTP_AUTHORIZATION_TOKEN !== config.headers.HTTP_AUTHORIZATION_TOKEN) {
                //     return errorResponse(res, ResponseMsg.ERROR.INVALID_TOKEN)
                // }

                try {
                    const { data } = await axios.post(
                        `${process.env.BASE_URL}/extensions/feego/pay/initialise`,
                        {
                            ref_code,
                            amount,
                            email,
                            phone_number,
                            fullname,
                        },
                        config
                    );
                    return successResponse(res, data);
                } catch (error) {
                    return errorResponse(res, error);
                }
            } else {
                return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA);
            }
        } catch (error) {
            return errorResponse(res, error);
        }
    });

    const VerifyTransaction = asyncHandler(async (req, res) => {
        try {
            if (req.body.hasOwnProperty("transaction_ref")) {
                const { transaction_ref } = req.body;

                const config = {
                    headers: {
                        HTTP_AUTHORIZATION_TOKEN: process.env.HTTP_AUTHORIZATION_TOKEN,
                    },
                }

                try {
                    const { data } = await axios.post(
                        `${process.env.BASE_URL}/extensions/feego/pay/checkPayment`,
                        {
                            transaction_ref
                        },
                        config
                    );
                    return successResponse(res, data);
                } catch (error) {
                    return errorResponse(res, error);
                }

            } else {
                return errorResponse(res, ResponseMsg.ERROR.INCOMPLETE_DATA);
            }

        } catch (error) {
            return errorResponse(res, error);
        }
    })

    return {
        FetchPayment,
        InitialisePayment,
        VerifyTransaction
    };
};

module.exports = PaymentController;
