const router = require("koa-router")();
import controller from "../controller/home";

router.get("/", controller.get);

export default router;