// api/stkpush.js
import axios from 'axios';
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' });

  const { phone, amount } = req.body;

  // 1. DARAJA SANDBOX CREDENTIALS
  // Replace these with the keys you copied from the portal!
  const consumerKey = "YOUR_CONSUMER_KEY_HERE"; 
  const consumerSecret = "YOUR_CONSUMER_SECRET_HERE";
  
  // Standard Sandbox Values (Do not change these for Test Mode)
  const businessShortCode = "174379";
  const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; 
  
  try {
    // 2. GENERATE ACCESS TOKEN
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;

    // 3. GENERATE PASSWORD & TIMESTAMP
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(
      `${businessShortCode}${passkey}${timestamp}`
    ).toString('base64');

    // 4. FORMAT PHONE NUMBER (Must be 2547...)
    let formattedPhone = phone.replace('+', ''); // Remove +
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }

    // 5. INITIATE STK PUSH
    const stkResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 1, // ALWAYS use 1 KES for testing in Sandbox
        PartyA: formattedPhone,
        PartyB: businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: "https://mydomain.com/api/callback", // Dummy URL for now
        AccountReference: "Nexora Shop",
        TransactionDesc: "Merch Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 6. RETURN SUCCESS
    res.status(200).json(stkResponse.data);

  } catch (error) {
    console.error("Daraja Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate M-Pesa payment" });
  }
}