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
			handler() {
				if (this.currentPage) {
					this.onRouteChange();
				}
			},
			deep: true
		}
	}

});

</script>
