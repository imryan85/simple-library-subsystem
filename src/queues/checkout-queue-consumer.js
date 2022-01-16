const axios = require("axios");

module.exports.processOrder = async (msg) => {
  try {
    console.log(`[checkout-queue] message received: ${JSON.stringify(msg)}`);

    const endpoint = `${process.env.SVC_API_URI}/checkout/process`;    
    const res = await axios.post(endpoint, msg);
  } catch (err) {
    console.error(err);
  }
}