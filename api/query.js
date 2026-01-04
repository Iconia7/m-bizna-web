import axios from 'axios';
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST allowed' });

  const { checkoutRequestID } = req.body;

  // --- SAME CREDENTIALS AS STKPUSH.JS ---
  const consumerKey = "YOUR_CONSUMER_KEY_HERE"; 
  const consumerSecret = "YOUR_CONSUMER_SECRET_HERE";
  const businessShortCode = "174379";
  const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; 

  try {
    // 1. Generate Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenResponse.data.access_token;

    // 2. Generate Password
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(
      `${businessShortCode}${passkey}${timestamp}`
    ).toString('base64');

    // 3. ASK SAFARICOM FOR STATUS
    const queryResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      {
        BusinessShortCode: businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID 
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // 4. Send safaricom's answer back to React
    res.status(200).json(queryResponse.data);

  } catch (error) {
    // Note: If the user hasn't typed their PIN yet, Safaricom returns an error. 
    // This is normal. We just tell frontend "Wait".
    res.status(500).json({ error: "Waiting for user action" });
  }
}