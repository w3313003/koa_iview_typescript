import * as path  from "path";
import axios from "axios";
const BASE_URL = "http://192.168.1.102:4000";

export function musicApiProxy(path: string, params?: object, method: string = "get") {
	return new Promise((resolve, reject) => {
		axios({
			method: method,
			url: BASE_URL + path,
			params,
			withCredentials: true
		}).then(res => {
			resolve(res.data);
		}).catch(e => {
			reject(e)
		})
	})
};

export default  {
    assetsPath: path.resolve("/study/koa/src/resource/upload"),
    musicApiProxy
};