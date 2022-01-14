const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");

require('dotenv').config()

const PORT = process.env.PORT || 5000;

router.get("/health", (ctx) => {
  ctx.body = {
    status: "ok",
    data: "Server is working",
  };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));