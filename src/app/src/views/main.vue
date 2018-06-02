<template>
    <div class="main">
	   <AsideMenu />
	   <Headers />
	    <Main />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideMenu from "@/components/Menu/index";
import Headers from "@/components/Header";
import Main from "@/components/mainBody";

export default Vue.extend({
    components: {
		AsideMenu,
		Headers,
		Main
    }
})
</script>

<style lang="stylus" scoped>
.main
	width: 100%;
	height: 100%;
	position: absolute;
</style>
