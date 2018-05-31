"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_util_1 = require("../util/db_util");
exports.default = {
    get: async (ctx) => {
        const title = "home";
        let data = await db_util_1.default.select("user", "*");
        await ctx.render("index", {
            title,
            data
        });
    }
};
//# sourceMappingURL=home.js.map