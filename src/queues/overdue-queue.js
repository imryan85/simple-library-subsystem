const Queue = require("bull");
const { processJob } = require("./overdue-queue-consumer");
require('dotenv').config()

const overdueQueue = new Queue("overdue", {
  redis: {
    port: Number(process.env.REDIS_PORT), 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASS, 
  },
});

overdueQueue.process(async (msg) => {
  console.log(msg)
});

module.exports.createOverdueCheck = async (msg) => {
  await overdueQueue.add(msg, {
    // leave empty opts for now
  });
};