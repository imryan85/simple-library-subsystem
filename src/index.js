const Koa = require("koa");
const cors = require('@koa/cors');
const Router = require("@koa/router");

const { processEmail } = require("./queues/email-queue-consumer");
const { processOrder } = require("./queues/checkout-queue-consumer");

const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");

require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get("/health", (ctx) => {
  ctx.body = {
    status: "ok",
    data: "Server is working",
  };
});

router.post("/queue/email", async (ctx) => {
  await processEmail(ctx.request.body);
  ctx.body = {
    message: "Email is queued successfully.",
    data: ctx.request.body,
  };
})

router.post("/queue/checkout", async (ctx) => {
  await processOrder(ctx.request.body);
  ctx.body = {
    message: "Order placed successfully.",
    data: ctx.request.body,
  };
})

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));