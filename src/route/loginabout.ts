const router = require("koa-router")();
import controller from ".././controller/login";

router.get("/", controller.post);

export default router;
