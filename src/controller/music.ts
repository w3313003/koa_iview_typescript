import * as Koa from "Koa";
import axios from "axios";
const http = require("http");
export default {
    async get(ctx: Koa.Context) {
        let body;
        await axios.get("http://192.168.1.202:4000/playlist/detail?id=24381616").then(res => {
            ctx.body = {
                name: 123
            };
        });
        ctx.body = {
            name: 2
        };
    }
}