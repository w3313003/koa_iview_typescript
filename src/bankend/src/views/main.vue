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
import Store from "../store/index";
export default Vue.extend({
    components: {
		AsideMenu,
		Headers,
		Main
	},
	mounted() {
		if(!this.$store.state.currentPage.id) {
			this.$router.push('/main');
		} else {
			this.$router.push(this.$store.state.currentPage.path)
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
