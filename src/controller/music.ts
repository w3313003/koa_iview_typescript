import * as Koa from "Koa";
import axios from "axios";
import { formatRes } from "../util/response";
import common from "../util/common";

const http = require("http");
const { musicApiProxy } = common;

export default {
    async get(ctx: any) {
		const { path, params, methods } = ctx.request.body;
		// await axios.get("http://192.168.1.109:4000/playlist/detail?id=24381616").then(async res => {
		// 	body = res.data;
		// });
		ctx.body = await musicApiProxy(path, params, methods);
    }
}