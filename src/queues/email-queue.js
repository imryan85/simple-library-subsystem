const Queue = require("bull");
const { processEmail } = require("./email-queue-consumer");
require('dotenv').config()

const emailQueue = new Queue("email", {
  redis: {
    port: Number(process.env.REDIS_PORT), 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASS, 
  },
});

emailQueue.process(async (msg) => {
  return await processEmail(msg.data)
});

module.exports.createNewEmail = async (msg) => {  
  await emailQueue.add(msg, {
    // leave empty opts for now
  });
};
