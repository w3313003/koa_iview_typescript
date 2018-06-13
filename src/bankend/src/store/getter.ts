import { Inspect } from "../interface/Inspect";

export default {
	getMenus(state: Inspect.State) {
		return state.userInfo.menu;
	},
	getOpenMenus(state: Inspect.State) {
		return state.openmenus;
	},
	getCurrentPage(state: Inspect.State) {
		let path = location.hash.replace(/#/, "");
		return state.cachePages.find((v: any) => v.path === path);
	},
	sortBread(state: Inspect.State) {
		return state.breadcrumbList.reverse();
	},
	lastingOpenMenus(state: Inspect.State) {
		return state.breadcrumbList.reverse().map((v: any) => v.id);
	}
}