import * as Koa from "koa";
import * as fs from "fs";
import query from "../util/db_util";
import { formatRes } from "../util/response";
const path = require("path");
const common = require("../util/common");
export default {
	post: async (ctx: any) => {
		try {
			const file = ctx.request.body.files[0],
				readerStream = fs.createReadStream(file.path),
				ext = file.name.split('.').pop();
			if(!fs.existsSync(common.assetsPath)) {
				fs.mkdirSync(common.assetsPath);
			};
			const filename = Math.random().toString().slice(2);
			const upStream = fs.createWriteStream(`./src/resource/upload/${filename}.${ext}`); 
			await readerStream.pipe(upStream); 
			ctx.body = formatRes(0, {upload: "ok", path: `/upload/${filename}.${ext}`} , "上传成功")
		} catch(e) {
			ctx.body = formatRes(-1, e, "error");
		}
	}
}