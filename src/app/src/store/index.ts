import Vue from 'vue';
import Vuex from 'vuex';
import createLogger, {LoggerOption} from 'vuex/dist/logger'
import state from './state';
import mutations from "./mutations/index";
import getters from './getter';
import actions from './actions';

Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production';
let option: any = {};
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	plugins: false ? [ createLogger((option as LoggerOption<any>)) ] : []
});

