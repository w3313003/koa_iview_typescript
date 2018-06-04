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
	},
	
	[Types.SET_BREADCRUMB_LIST](state:Inspect.State, payload: any) {
		vueX2stoage("breadcrumbList", payload);
		state.breadcrumbList = payload;
	},
	[Types.SET_CURRENT_PAGE](state: Inspect.State, payload: any) {
		const path = location.hash.replace(/#/, ""),
			currentPage = state.cachePages.find((v: any) => v.path === path);
		vueX2stoage("currentPage", currentPage || {});
		state.currentPage = currentPage || {};
	}
	
};
