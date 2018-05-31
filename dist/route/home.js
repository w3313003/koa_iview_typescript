"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("koa-router")();
const home_1 = require("../controller/home");
router.get("/", home_1.default.get);
exports.default = router;
//# sourceMappingURL=home.js.map