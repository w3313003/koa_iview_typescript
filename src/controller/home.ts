import * as Koa from "koa";
import query from "../util/db_util";

export default {
    get: async (ctx: Koa.Context) => {
        const title = "home";
        let data = await query.select("user", "*");
        await ctx.render("index", {
            title,
            data
        })
    }
}