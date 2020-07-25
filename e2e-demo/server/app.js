const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(bodyParser());

// app.use(async (ctx, next) => {
//   ctx.body = ctx.request.body;
//   next();
// });

router.get('/user', (ctx, next) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
