import Vue from 'vue';
import Router , { Route } from 'vue-router';
import Login from './views/login.vue';
import Main from './views/main.vue';
import Store from "./store/index";
const iView = require("iview");

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			component: () => import('./views/main.vue'),
			children: [
				{
					path: "/setAuth",
					component: () => import('./views/pages/setAuth.vue'),
				},
			//	店铺信息
				{
					path: "/store/settings",
					component: () => import("./views/pages/store/settings.vue")
				},
			]
		},
		{
			path: '/login',
			component: Login,
			beforeEnter(to, from, next) {
				console.log(Store.state.isLogin);
				if(Store.state.isLogin) {
					next("/");
				} else {
					next();
				}
			},
			meta: {title: "登陆"}
		}
	],
});
router.beforeEach((to: Route, from: Route, next) => {
	iView.LoadingBar.start();
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
router.afterEach((to: Route) => {
	iView.LoadingBar.finish();
});


export default router;
