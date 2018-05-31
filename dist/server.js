"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const views = require("koa-views");
const index_1 = require("./route/index");
const _static = require("koa-static");
const Path = require("path");
const app = new Koa();
// async function getData() {
// 	let data = await _sql.count("user");
//     return data;
// }
// getData().then(res => {
//     console.log(res)
// });
// 启用pug模板
app.use(views(Path.join(__dirname + "/views"), {
    extension: "pug"
}));
// 静态资源托管
app.use(_static(Path.join(__dirname + "/resource")));
app.use(async (ctx, next) => {
    console.log('Url:', ctx.url);
    await next();
});
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
app.listen(3000);
//# sourceMappingURL=server.js.map