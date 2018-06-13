<template>
    <div class="wrap">
	    <div class="logo-ico">
		    <img src="../../assets/img/logo.jpg"/>
	    </div>
	    <div class="menu-wrap" ref="wrap">
            <Menu @on-select="handlerSelect"
                  @on-open-change="getNameList"
                  theme="dark"
                  :open-names="openMenus"
                  :active-name="activePath"
                  :accordion="true"
				  ref="menu"
            >
	            <Submenu v-for="(item, index) of menus" :key="index" :name="item.id">
		            <template slot="title">
		                <Icon :type="item.icon"></Icon>
		                {{item.title}}
		            </template>
	                <recursionSub :submenu="item.child" />
	            </Submenu>
            </Menu>
	    </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
const Scroll = require("iscroll");
import { mapGetters, mapMutations, mapState } from "vuex";
import * as Types from "../../store/mutations/types";
import recursionSub from "./Submenu.vue";
import { searchMenuByPath } from "../../common/util";

export default Vue.extend({
	components: {
		recursionSub
	},
    created() {
        this.$nextTick(() => {
        	this.initScroll();
        });
	},
	mounted() {
		// this.$nextTick(() => {
		// 	this.$refs.menu.updateOpened();
		// })
	},
	data() {
		return {
		}
	},
	watch: {
		openMenus: {
			handler(newList) {
				setTimeout(() => {
					this.$refs.menu.updateOpened();
				}, 17)
			},
			deep: true
		}
	},
    computed: {
		...mapGetters({
			menus: "getMenus",
			openMenus: "getOpenMenus",
			lastOpenMenus: "lastingOpenMenus"
		}),
    	needScroll() {
            const ulHeight = this.$refs.wrap.querySelector("ul").clientHeight;
            return this.$refs.wrap.clientHeight < ulHeight;
        },
	    activePath(): string {
			return this.$route.path;
	    }
    },
    methods: {
		getNameList(nameList: Array<number>) {
			this.setOpenMenus(nameList);
			this.initScroll();
		},
		handlerSelect(path: string) {
			this.$router.push(`${path}`)
		},
    	initScroll() {
    		if(!this.scroll) {
    			this.scroll = new Scroll(this.$refs.wrap, {
					mouseWheel: true,
					scrollbars: true
				});
            } else {
    			setTimeout(() => {
					this.scroll.refresh();
				}, 300);// this.needScroll ? this.scroll.refresh() : this.scroll.destroy();
			}
    	},
	    ...mapMutations({
			setOpenMenus: Types.SET_OPEN_MENUS
		})
    }

});

</script>

<style lang="stylus" scoped>
.wrap
	height 100%;
	position absolute;
	top 0;
	left 0;
	z-index 21;
	transition width .3s;
	background #495060
	width 240px
	.logo-ico
		padding: 8px;
		text-align: center;
		width 100%
		img
			height 44px
			width auto
	.menu-wrap
		height calc(100% - 64px)
		position absolute
		overflow-y hidden
</style>
