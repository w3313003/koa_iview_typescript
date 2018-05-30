import * as Koa from "koa";
import * as Router from "koa-router";
import * as views from "koa-views";
const Path = require("path");
const app = new Koa();

// 启用pug模板
app.use(views(Path.join(__dirname + "/views"), {
    extension: "pug"
}));

app.use(async (ctx: Koa.Context, next) => {
    console.log('Url:', ctx.url);
    await next();
})

const router = new Router();

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = "hello, koa and ts";
});

app.use(router.routes());

app.listen(3000)