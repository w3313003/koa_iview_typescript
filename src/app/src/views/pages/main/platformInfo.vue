<template>
    <div>
		123
    </div>    
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from "vuex";
export default Vue.extend({
	mounted () {
    	this.$nextTick(() => {
    		setTimeout(() => {
				this.onRouteChange();
			}, 17)
		})
	},
	methods: {
		...mapActions(["onRouteChange"])
	}
})
</script>
