export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    
    // In Vercel, this log will show up in your "Functions" tab
    console.log("----- MPESA CALLBACK RECEIVED -----");
    console.log(JSON.stringify(data, null, 2));
    
    // You must return 200 OK, or Safaricom keeps retrying
    res.status(200).json({ result: "Ok" });
  } else {
    res.status(405).end();
  }
}