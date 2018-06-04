import * as Types from "./mutations/types";
import { collectAncestor } from "../common/util";

export default {
	userLogin({ commit , state}: any, payload: any) {
		commit(Types.LOGIN, true);
		commit(Types.SET_USERINFO, payload);
	},
	onRouteChange({commit, state}: any) {
		commit(Types.SET_CURRENT_PAGE);
		const currentPage = state.currentPage;
		Promise.resolve(currentPage).then(page => {
			const breadList = collectAncestor(state.userInfo.menu, page.id);
			commit(Types.SET_BREADCRUMB_LIST, breadList);
		});
	}
}