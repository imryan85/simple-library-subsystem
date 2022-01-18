const axios = require("axios");

module.exports.processJob = async (msg) => {
  try {
    console.log(`[overdue-queue] message received: ${JSON.stringify(msg)}`);

    const endpoint = `${process.env.SVC_API_URI}/overdue/handle`;    
    const res = await axios.post(endpoint, msg);
  } catch (err) {
    console.error(err);
  }
}