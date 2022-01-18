const axios = require("axios");

module.exports.processJob = async (msg) => {
  try {
    console.log(`[overdue-queue] message received: ${JSON.stringify(msg)}`);
  } catch (err) {
    console.error(err);
  }
}