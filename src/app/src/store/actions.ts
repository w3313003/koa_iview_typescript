import * as Types from "./mutations/types";
import { collectAncestor } from "../common/util";
import { Inspect } from "../interface/Inspect";

export default {
	userLogin({ commit , state}: any, payload: any) {
		commit(Types.LOGIN, true);
		commit(Types.SET_USERINFO, payload);
	},
	onRouteChange({commit, state}: any) {
		commit(Types.SET_CURRENT_PAGE);
		Promise.resolve(state.currentPage).then((page: Inspect.classPage) => {
			commit(Types.PUT_TOCACHE, page);
			return page;
		}).then((page: Inspect.classPage) => {
			const breadList: Inspect.classPage[] = collectAncestor(state.userInfo.menu, page);
			commit(Types.SET_BREADCRUMB_LIST, breadList);
			return breadList;
		}).then(list => {
			const openMenusIdList = list.filter(v => v.child.length > 0).map(v => v.id);
			commit(Types.SET_OPEN_MENUS, openMenusIdList);
		});
	}
}