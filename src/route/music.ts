const router = require("koa-router")();
import controller from ".././controller/music";

router.post("/", controller.get);

export default router;
