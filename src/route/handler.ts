const router = require("koa-router")();
import controller from "../controller/upload";

router.post("/upload", controller.handler, controller.post);

export default router;