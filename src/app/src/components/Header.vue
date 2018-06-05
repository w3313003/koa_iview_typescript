<template>
    <div class="headWrapper">
        <div class="header">
            <div class="navicon-con" >
	           <Button type="text" :loading="false" @click="toggleClick">
		           <Icon type="navicon" size="32" />
	           </Button>
            </div>
	        <div class="middle-con">
		        <div class="main-breadcrumb">
					<Breadcrumb>
						<BreadcrumbItem to="/">
							首页
						</BreadcrumbItem>
						<BreadcrumbItem
							v-for="(item) of sortBread"
							:key="item.id"
							v-if="item.title !== '首页'"
							:to="item.type === 'menu' ? item.path : null"
						>
							<Icon :type="item.icon"/>
							{{item.title}}
						</BreadcrumbItem>
					</Breadcrumb>
		        </div>
	        </div>
        </div>
        <div class="tags-con">
	        <div class="tags-outer-scroll-con" ref="scrollX">
		        <div class="tag-wrapper">
			        <div>
				        <Tag :key="index"
				             v-for="(item, index) of cachePages"
				             type="dot"
				             :closable="item.title !== '首页'"
				             :color="item.id === currentPage.id ? 'blue' : ''"
				             @click.native="linkTo(item)"
				        >
					        {{item.title}}
				        </Tag>
			        </div>
			        
		        </div>
	        </div>
	        <div class="close-all-tag-con">
		        <Dropdown transfer  slot="list">
			        <Button size="small" type="primary">
				        标签选项
				        <Icon type="arrow-down-b" />
			
			        </Button>
			        <DropdownMenu slot="list">
				        <DropdownItem>关闭所有</DropdownItem>
				        <DropdownItem>关闭其他</DropdownItem>
			        </DropdownMenu>
		        </Dropdown>
	        </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import * as Types from "../store/mutations/types";
const IScroll = require("iscroll");
export default Vue.extend({
	data() {
		return {
			caches: [{
				title: "测试出差是",
				id: 20
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},{
				title: "测试出差是"
			},]
		}
	},
	computed: {
		...mapGetters({
			currentPage: "getCurrentPage",
			menus: "getMenus",
			sortBread: "sortBread"
		}),
		...mapState(["cachePages", "currentPage"])
	},
	watch: {
		cachePages: {
			handler() {
				setTimeout(() => {
					this.initScroll()
				}, 17);
			},
			deep: true
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initScroll();
		})
	},
	methods: {
		initScroll() {
			if(!this.scroll) {
				this.scroll = new IScroll(this.$refs.scrollX, {
					scrollX: true,
					scrollY: false,
					mouseWheel: true
				})
			} else {
				this.scroll.refresh();
			}
		},
		toggleClick() {
			this.set_shrink();
			return false;
		},
		linkTo(item) {
			this.$router.push(item.path);
		},
		...mapMutations({
			set_shrink: Types.SET_SHRINK
		})
	}
});

</script>

<style lang="stylus" scoped>
.headWrapper
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
		.middle-con
			position: absolute;
			left: 60px;
			top: 0;
			right: 340px;
			bottom: 0;
			padding: 10px;
			overflow: hidden;
			.main-breadcrumb
				padding 8px 15px 0
	.tags-con
		height: 40px;
		z-index: -1;
		background: #f0f0f0;
		position: relative
		.tags-outer-scroll-con
			position: absolute;
			left 0
			box-sizing: border-box;
			width: calc(100% - 110px);
			padding: 0 10px
			height: 100%;
			overflow: hidden;
			white-space: nowrap
			.tag-wrapper
				display: block;
				position: absolute
				overflow visible
				z-index: 999
		.close-all-tag-con
			position absolute
			right 0
			box-sizing: border-box;
			padding-top: 8px;
			text-align: center;
			width: 110px;
			height: 100%;
			background: white;
			box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
			z-index: 10;
	
</style>