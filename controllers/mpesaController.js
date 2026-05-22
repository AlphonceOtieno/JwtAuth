const axios = require("axios");
const { getAccessToken, getPassword } = require("../config/mpesa");

const stkPush = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({
        message: "Phone number and amount are required",
      });
    }

    const accessToken = await getAccessToken();
    const { pass, timestamp } = getPassword();

    const payload = {
      BusinessShortCode: process.env.BUSINESS_SHORTCODE,
      Password: pass,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.BUSINESS_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: process.env.ACCOUNT_REFERENCE || "CompanyXLTD",
      TransactionDesc: process.env.TRANSACTION_DESC || "Payment request",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      message: "Failed to initiate STK push",
      error: error.response?.data || error.message,
    });
  }
};

const callback = (req, res) => {
  console.log("MPESA callback received:", JSON.stringify(req.body, null, 2));
  return res.status(200).json({
    ResultCode: 0,
    ResultDesc: "Success",
  });
};

module.exports = {
  stkPush,
  callback,
};
