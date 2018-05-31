import { AxiosPromise} from "axios";

export namespace Inspect {
	interface apiMethod {
		BASE_URL: string;
		get: (url: string, params?: object, config?: object) => AxiosPromise;
		post: (url: string, data?: object, config?: object) => AxiosPromise;
		delete: (url: string, params?: object, config?: object) => AxiosPromise;
		put: (url: string, params?: object, config?: object) => AxiosPromise;
	}
}