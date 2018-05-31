"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("koa-router")();
const home_1 = require("./home");
const loginabout_1 = require("./loginabout");
router.use("/", home_1.default.routes(), home_1.default.allowedMethods());
router.use("/login", loginabout_1.default.routes(), loginabout_1.default.allowedMethods());
exports.default = router;
//# sourceMappingURL=index.js.map