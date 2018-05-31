"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const router_1 = require("./router");
const store_1 = require("./store");
require("iview/dist/styles/iview.css");
const view = require('iview');
vue_1.default.config.productionTip = false;
vue_1.default.use(view);
new vue_1.default({
    router: router_1.default,
    store: store_1.default,
    render: (h) => h(App_vue_1.default),
}).$mount('#app');
//# sourceMappingURL=main.js.map