"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *@Description: 封装axios
 *@author: ZJ
 *@Date: 2018/5/31
 *@Time: 22:05
*/
const axios_1 = require("axios");
const { Notice } = require("iview");
const BASE_URL = "http://localhost:3000";
axios_1.default.defaults.baseURL = BASE_URL;
axios_1.default.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});
axios_1.default.interceptors.response.use((res) => {
    if (res.data.code !== 0) {
        Notice.open({
            title: '请求失败',
            desc: res.data.message
        });
    }
    return res;
}, error => {
    let response = error.response;
    Notice.open({
        title: '请求失败',
        desc: response.status + " " + response.statusText
    });
    return Promise.reject(error);
});
exports.default = {
    BASE_URL,
    get(url, params = {}, config = {}) {
        const temp = Object.assign({}, params, config);
        return axios_1.default.get(url, temp);
    },
    post(url, data = {}, config = {}) {
        return axios_1.default.post(url, data, config);
    },
    delete(url, data = {}, config = {}) {
        const temp = Object.assign({}, data, config);
        return axios_1.default.delete(url, temp);
    },
    put(url, data = {}, config = {}) {
        return axios_1.default.put(url, data, config);
    }
};
//# sourceMappingURL=resource.js.map