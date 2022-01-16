const Queue = require("bull");
const { processEmail } = require("./email-queue-consumer");

const emailQueue = new Queue("email", {
  redis: {
    port: Number(process.env.REDIS_PORT), 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASS, 
  },
});

emailQueue.process(processEmail);

// module.exports.createNewEmail = (msg) => {
//   emailQueue.add(msg, {

//   });
// };
