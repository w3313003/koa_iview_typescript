import * as Koa from "koa";
import query from "../util/db_util";

export default {
	async post(ctx: Koa.Context) {
		ctx.body = {
			"hello": "欢迎"
		}
	}
}