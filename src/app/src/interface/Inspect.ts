import { AxiosPromise} from "axios";

export namespace Inspect {
	export interface apiMethod {
		BASE_URL: string;
		get: (url: string, params?: object, config?: object) => AxiosPromise;
		post: (url: string, data?: object, config?: object) => AxiosPromise;
		delete: (url: string, params?: object, config?: object) => AxiosPromise;
		put: (url: string, params?: object, config?: object) => AxiosPromise;
	}
	export interface State {
		isLogin: boolean;
		userInfo: {
			[property: string]: any
		};
		openmenus: Array<number | string>;
		cachePages: object[];
		breadcrumbList: object[];
		currentPage: object | undefined;
		shrink: boolean;

	}
}
