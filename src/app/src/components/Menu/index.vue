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
import Scroll from "iscroll";
import { mapGetters, mapMutations } from "vuex";
import * as Types from "../../store/mutations/types";
import recursionSub from "./Submenu";
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
	data() {
		return {
		}
	},
    computed: {
		...mapGetters({
			menus: "getMenus",
			openMenus: "getOpenMenus"
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
			this.putToCache(searchMenuByPath(this.menus, path));
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
			setOpenMenus: Types.SET_OPEN_MENUS,
		    putToCache: Types.PUT_TOCACHE
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
