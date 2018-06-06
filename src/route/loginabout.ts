const router = require("koa-router")();
import controller from ".././controller/login";

router.get("/", async (ctx: any) => {
	ctx.body = 321312;
})
router.post("/", controller.post);


export default router;
