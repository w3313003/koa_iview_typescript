const router = require("koa-router")();
import home from './home';

router.use("/", home.routes(), home.allowedMethods());

export default router;