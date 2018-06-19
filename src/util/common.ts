import * as path from "path";
import axios from "axios";
const BASE_URL = "http://localhost:4000";

export function musicApiProxy(url: string, params?: object, method: string = "get") {
	return new Promise((resolve, reject) => {
		axios({
			method,
			url: BASE_URL + url,
			params,
			withCredentials: true
		}).then(res => {
			resolve(res.data);
		}).catch(e => {
			reject(e);
		})
	})
};

export default  {
    assetsPath: path.resolve("/study/koa/src/resource/upload"),
    musicApiProxy
};