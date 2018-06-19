/*
 *@Description: 封装axios
 *@author: ZJ
 *@Date: 2018/5/31
 *@Time: 22:05
*/
import axios, { AxiosPromise } from "axios";
import { Toast } from "vant";
const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  (config: any) => {
    Toast.loading({
        mask: true,
        message: "加载中"
    });
    config.headers["Authorization"] = "zj";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res: any) => {
    Toast.clear();
    if (res.data.code !== 200) {
		Toast({
			mask: true,
			message: res.data.message
		});
    }
    return res;
  },
  error => {
	   const response = error.response;
	   Toast({
		   mask: true,
           message: response
	   });
   	return Promise.reject(error);
  }
);

export default {
  BASE_URL,
  get(url: string, params: object = {}, config: object = {}): AxiosPromise {
    const temp = Object.assign({}, params, config);
    return axios.get(url, temp);
  },
  post(url: string, data: object = {}, config: object = {}): AxiosPromise {
    return axios.post(
      url,
      data,
      Object.assign(
        {},
        {
          headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
            // 'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        config
      )
    );
  },
  delete(url: string, data: object = {}, config: object = {}): AxiosPromise {
    const temp = Object.assign({}, data, config);
    return axios.delete(url, temp);
  },
  put(url: string, data: object = {}, config: object = {}): AxiosPromise {
    return axios.put(url, data, config);
  }
};
