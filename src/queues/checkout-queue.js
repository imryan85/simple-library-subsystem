const Queue = require("bull");
const { processOrder } = require("./checkout-queue-consumer");
require('dotenv').config()

const checkoutQueue = new Queue("checkout", {
  redis: {
    port: Number(process.env.REDIS_PORT), 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASS, 
  },
});

checkoutQueue.process(async (msg) => {
  return await processOrder(msg.data)
});

module.exports.createNewOrder = (msg) => {
  checkoutQueue.add(msg, {
    // leave empty opts for now
  });
};