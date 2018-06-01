import * as Types from "./types";
import { Inspect } from "../../interface/Inspect";
export default {
	[Types.LOGIN](state: Inspect.State, payload: boolean) {
		state.isLogin = payload;
	}
};
