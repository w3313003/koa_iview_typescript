import Vue from 'vue';
import Router , { Route } from 'vue-router';
import Login from './views/login.vue';
import Main from './views/main.vue';

import Store from "./store/index";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			component: Main
		},
		{
			path: '/login',
			component: Login,
			meta: {title: "登陆"}
		}
	],
});
router.beforeEach((to: Route, from: Route, next) => {
	console.log(to);
	if (to.path === "/login") {
		next();
		return;
	}
	if (!Store.state.isLogin) {
		next("login");
		return;
	}
	next();
});

export default router;
