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
  return await processJob(msg.data);
});

module.exports.createOverdueHandler = (msg) => {
  console.log('createOverdueCheck')
  overdueQueue.add(msg);
};