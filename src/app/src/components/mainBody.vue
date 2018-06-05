<template>
    <div class="mainbody">
        <div class="page" ref="pages">
	        <div>
		        <router-view/>
	        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
var Scroll = require("iscroll");
export default Vue.extend({
	created() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.initScroll();
			})
		})
	},
	watch: {
		$route: {
			handler() {
				setTimeout(() => {
					this.initScroll();
				}, 17)
			},
			deep: true
		}
	},
	methods: {
		initScroll() {
			if(!this.scroll) {
				this.scroll = new Scroll(this.$refs.pages, {
					mouseWheel: true,
					scrollbars: true
				})
			} else {
				this.scroll.refresh();
			}
		}
	}

});

</script>

<style lang="stylus" scoped>
.mainbody
	position: fixed;
	top: 100px;
	padding-left 240px
	background-color: #F0F0F0;
	z-index: 1;
	transition: left .3s;
	height calc(100% - 100px)
	width 100%
	.page
		margin 10px
		width calc(100% - 20px)
		height calc(100% - 20px)
		overflow: hidden;

</style>
