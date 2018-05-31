"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("koa-router")();
const login_1 = require(".././controller/login");
router.get("/", login_1.default.post);
exports.default = router;
//# sourceMappingURL=loginabout.js.map