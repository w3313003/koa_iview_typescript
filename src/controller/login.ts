import * as Koa from "koa";
import query from "../util/db_util";
import { formatRes } from "../util/response";

export default {
	async post(ctx: any) {
		const { password, username } = ctx.request.body;
		let data = await query.query("SELECT * FROM userInfo WHERE username = ?", [`${username}`]);
		if((data as any[]).length === 0) {
			ctx.body = formatRes(-1, null, "用户名不存在");
			return;
		} else {
			const result = (<any[]>data)[0],
				  { password: realPwd } = result;
			if(password === realPwd) {
				ctx.body = formatRes(0, {data: result}, "登陆成功");
			} else {
				ctx.body = formatRes(-1, null, "密码错误");
			}
		}
	}
}


// const userId = `${Math.random().toString(32).slice(2)}${Date.now()}`,
		// 		nickName = `zj_${Math.random().toString(31).slice(2)}`;
		// let data = await query.query(
		// 	"INSERT INTO userInfo (nickName, userId, username, password, authority) VALUE (?, ?, ?, ?, ?)", 
		// 	[ nickName, userId, username, password , 'admin']
		// );
		// ctx.body = formatRes(0, data, "ok");