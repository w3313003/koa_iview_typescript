import { Inspect } from "../interface/Inspect";

export default {
	getMenus(state: Inspect.State) {
		return state.userInfo.menu;
	},
	getOpenMenus(state: Inspect.State) {
		return state.openmenus;
	}
}