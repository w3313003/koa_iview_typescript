import {parseStoage} from "../common/util";
export default {
	isLogin: parseStoage("isLogin") || false,
	userInfo: parseStoage("userInfo") || {},
	openmenus: parseStoage("openmenus") || [],
	cachePages: parseStoage("cachePages") || [],
	breadcrumbList: parseStoage("breadcrumbList") || []
};
