const Koa = require("koa");
const cors = require('@koa/cors');
const Router = require("@koa/router");

const { createNewEmail } = require("./queues/email-queue");
const { createNewOrder } = require("./queues/checkout-queue");
const { createOverdueHandler } = require("./queues/overdue-queue");

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
  try {
    console.log('/queue/email', ctx.request.body)
    await createNewEmail(ctx.request.body);
    ctx.body = {
      message: "Email is queued successfully.",
      data: ctx.request.body,
    };
  } catch (err) {
    console.log(err)
  }
})

router.post("/queue/checkout", async (ctx) => {
  console.log('/queue/checkout', ctx.request.body)
  await createNewOrder(ctx.request.body);
  ctx.body = {
    message: "Order placed successfully.",
    data: ctx.request.body,
  };
})

router.post("/queue/handleOverdue", async (ctx) => {
  await createOverdueHandler(ctx.request.body);
  ctx.body = {
    message: "handling overdue job queued.",
    data: ctx.request.body,
  };
})

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));