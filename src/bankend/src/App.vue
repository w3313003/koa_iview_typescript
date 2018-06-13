<template>
	<div id="app">
		<router-view/>
	</div>
</template>


<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex"

export default Vue.extend({
	computed: {
		...mapState(["currentPage"])
	},
	methods: {
		...mapActions(["onRouteChange"])
	},
	watch: {
		$route: {
			handler(new_page) {
				if(new_page.fullPath === "/") {
					return;
				}
				if (new_page.path !== "/") {
					this.onRouteChange();
					document.title = `管理系统-${this.currentPage.title}`;
				} else if(new_page.path === "/login") {
					document.title = "欢迎登陆"
				} else {
					document.title = "管理系统"
				}
			},
			deep: true
		}
	}

});

</script>
