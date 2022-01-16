const Queue = require("bull");
const { processOrder } = require("./checkout-queue-consumer");

const checkoutQueue = new Queue("checkout", {
  redis: {
    port: Number(process.env.REDIS_PORT), 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASS, 
  },
});

checkoutQueue.process(processOrder);