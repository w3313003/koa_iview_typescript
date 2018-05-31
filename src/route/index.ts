const router = require("koa-router")();
import home from './home';
import login from "./loginabout";

router.use("/", home.routes(), home.allowedMethods());
router.use("/login", login.routes(), login.allowedMethods());

export default router;