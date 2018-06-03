import * as Types from "./mutations/types";

export default {
	userLogin({ commit , state}: any, payload: any) {
		commit(Types.LOGIN, true);
		commit(Types.SET_USERINFO, payload);
	}
}