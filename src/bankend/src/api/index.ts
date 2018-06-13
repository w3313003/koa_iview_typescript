
/*
 *@Description: axios
 *@author: ZJ
 *@Date: 2018/5/31
 *@Time: 22:04
*/


import api from "./resource";
import { AxiosPromise} from "axios";
import { Inspect } from "../interface/Inspect";


export default {
	...(api as Inspect.apiMethod)
};
