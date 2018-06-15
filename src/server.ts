import * as Koa from "koa";
import * as views from "koa-views";
import routers from "./route/index";
import _sql  from "./util/db_util";
const cors = require("koa2-cors");
const _static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaBody = require('koa-body');
const body = require("koa-better-body");

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

// 解析post
// app.use(bodyParser());
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
//     }
// }));

const koaBetterBody = require('koa-better-body')
app.use(koaBetterBody({
  fields: 'body'
}));


// CORS跨域
app.use(cors({
    origin: function (ctx: any) {
        return "*"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}));


// 静态资源托管
app.use(_static(Path.join(__dirname + "/resource")));


app.use(async (ctx: Koa.Context, next) => {
    console.log('Url:', ctx.url);
    console.log("method", ctx.method);
    await next();
});


app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000);


