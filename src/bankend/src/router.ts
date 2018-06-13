import Vue from 'vue';
import Router , { Route } from 'vue-router';
import Login from './views/login.vue';
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
				// 首页信息
				{
					path: "/main",
					component: () => import('./views/pages/main/platformInfo.vue')
				},
				// 店铺相关
				{
					path: "/store/settings",
					component: () => import("./views/pages/store/settings.vue"),
					props: {
						age: 12312312
					}
				}, {
					path: "/store/info",
					component: () => import("./views/pages/store/info.vue")
				}, {
					path: "/setting/action/test",
					component: () => import("./views/pages/store/settings.vue")
				}
			]
		},
		{
			path: '/login',
			component: Login,
			beforeEnter(to, from, next) {
				console.log(Store.state.isLogin);
				if (Store.state.isLogin) {
					next("/");
				} else {
					next();
				}
			},
			meta: {title: "登陆"}
		},
		{
			path: "/404",
			component: () => import("./views/pages/error/404.vue")
		},
		{
			path: "*",
			redirect: '/404',
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
