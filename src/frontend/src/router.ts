import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Map from "./views/Map.vue";
import Music from "./views/music/Index.vue";
import MusicRecommend from "./views/music/Recommend.vue";
import Singer from "./views/music/Singer.vue";
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
		},
		{
			path: "/music",
			name: 'music',
			component: Music,
			redirect: "/music/recommend",
			children: [{
				path: "recommend",
				component: MusicRecommend
			}, {
                path: "singer",
                component: Singer
            }]
		}
	],
});
