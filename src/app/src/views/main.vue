<template>
    <div class="main">
	   	<AsideMenu />
	   	<Headers />
		<Main />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideMenu from "@/components/Menu/index.vue";
import Headers from "@/components/Header.vue";
import Main from "@/components/mainBody.vue";
export default Vue.extend({
    components: {
		AsideMenu,
		Headers,
		Main
	},
	created() {
		if(!this.$store.state.currentPage) {
			this.$router.push('/main');
		}
	}
})
</script>

<style lang="stylus" scoped>
.main
	width: 100%;
	height: 100%;
	position: absolute;
</style>
