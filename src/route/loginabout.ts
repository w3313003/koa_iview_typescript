const router = require("koa-router")();
import controller from ".././controller/login";

router.post("/", controller.post);


export default router;
