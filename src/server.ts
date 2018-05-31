import * as Koa from "koa";
import * as views from "koa-views";
import routers from "./route/index";
import _sql  from "./util/db_util";
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


app.use(async (ctx: Koa.Context, next) => {
    console.log('Url:', ctx.url);
    await next();
});


app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000);


