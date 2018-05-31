"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const login_vue_1 = require("./views/login.vue");
vue_1.default.use(vue_router_1.default);
exports.default = new vue_router_1.default({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login_vue_1.default
        }
    ],
});
//# sourceMappingURL=router.js.map