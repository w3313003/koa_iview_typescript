<template>
	<div>
		<m-header />
		<Tab />
		<router-view/> 
	</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mHeader from "@/components/music/M_Header.vue";
import Tab from "@/components/music/Tab.vue";

@Component({
	components: {
		mHeader,
		Tab
	}
})
export default class extends Vue {
	
}
</script>

<style lang="stylus" scoped>

</style>
