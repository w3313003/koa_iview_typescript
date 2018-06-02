<template>
    <div class="wrap">
        <div class="header">
            <div class="navicon-con" >
	           <Button type="text">
		           <Icon type="navicon" size="32" />
	           </Button>
            </div>
	        <div class="middle-con">
		        <div class="main-breadcrumb">
			        <!--<breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>-->
		        </div>
	        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({


});

</script>

<style lang="stylus" scoped>
.wrap
	box-sizing border-box
	position fixed;
	display block;
	padding-left 240px;
	width 100%;
	height 100px;
	z-index 20;
	box-shadow 0 2px 1px 1px rgba(100, 100, 100, 0.1)
	transition padding .3s;
	.header
		height: 60px;
		background: #fff;
		box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
		position: relative;
		z-index: 11;
		.navicon-con
			margin: 6px;
			display: inline-block;
		.midder-con
			position: absolute;
			left: 60px;
			top: 0;
			right: 340px;
			bottom: 0;
			padding: 10px;
			overflow: hidden;
			.main-breadcrumb
				padding 8px 15px 0
	
</style>