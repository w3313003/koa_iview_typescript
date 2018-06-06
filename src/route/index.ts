const router = require("koa-router")();
import home from './home';
import login from "./loginabout";
import handler from "./handler";

router.use("/", home.routes(), home.allowedMethods());
router.use("/login", login.routes(), login.allowedMethods());
router.use("/handler", handler.routes(), handler.allowedMethods());

export default router;