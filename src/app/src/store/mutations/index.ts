import * as Types from "./types";
import { vueX2stoage } from "../../common/util";
import { Inspect } from "../../interface/Inspect";
import State = Inspect.State;
export default {
	[Types.LOGIN](state: Inspect.State, payload: boolean) {
		vueX2stoage("isLogin", payload);
		state.isLogin = payload;
	},
	[Types.SET_USERINFO](state: Inspect.State, payload: object) {
		vueX2stoage("userInfo", payload);
		state.userInfo = payload;
	},
	[Types.SET_OPEN_MENUS](state: Inspect.State, payload: Array<number | string>) {
		vueX2stoage("openmenus", payload);
		state.openmenus = payload;
	},
	[Types.PUT_TOCACHE](state: Inspect.State, payload: any) {
		let idList = state.cachePages.map((v: any) => v.id),
			newId = payload.id;
		if(idList.some(v => v === newId)) return;
		state.cachePages.push(payload);
		vueX2stoage("cachePages", state.cachePages);
	}
	
};
