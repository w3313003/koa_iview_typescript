const router = require("koa-router")();
import controller from ".././controller/music";

router.get("/", controller.get);

export default router;
