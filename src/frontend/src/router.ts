import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Map from "./views/Map.vue";
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
        },
        {
			path: '/map',
			name: 'map',
			component: Map
		}
	],
});
