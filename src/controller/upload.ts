import * as Koa from "koa";
import query from "../util/db_util";
import * as multer from "multer";
const path = require("path");


const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname + "/upload"));
		},
		filename: function (req, file, cb) {
			//file.originalname上传文件的原始文件名
			var changedName = (new Date().getTime()) + '-' + file.originalname;
			cb(null, changedName);
		}
	})
})


export default {
	handler: upload.single('files'),
	post: async (ctx: any) => {
		ctx.body = {
			filename:123
		}
	}
}