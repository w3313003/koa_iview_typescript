"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const db_util_1 = require("./util/db_util");
const Path = require("path");
const app = new Koa();
async function getData() {
    let data = await db_util_1.default.count("user");
    return data;
}
getData().then(res => {
    console.log(res);
});
// 启用pug模板
app.use(views(Path.join(__dirname + "/views"), {
    extension: "pug"
}));
app.use(async (ctx, next) => {
    console.log('Url:', ctx.url);
    await next();
});
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = "hello, koa and ts";
});
app.use(router.routes());
app.listen(3000);
//# sourceMappingURL=server.js.map