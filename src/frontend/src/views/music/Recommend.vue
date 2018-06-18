<template>
	<div class="recommend">
		<div class="swiper">
			<Swipe>
				<SwipeItem v-for="item of swiperList" :key="item.id">
					<img :src="item.coverImgUrl" alt="">
				</SwipeItem>
			</Swipe>
		</div>
		<div class="list-wrapper">
			<Scroll class="recommendContent" :data="recommendList">
				<div class="recommend-list">
					<h1 class='list-title'>热门歌单推荐</h1>
					<ul>
						<li class="item" v-for="item of recommendList" :key="item.id">
							<div class="icons">
								<img :src="item.picUrl" alt="" width='60' height="60">
							</div>
							<div class="text">
								<h2 class="name">
									{{item.name}}
								</h2>
								<p class="desc van-ellipsis">
									{{item.copywriter}}
								</p>
							</div>
						</li>
					</ul>
				</div>
			</Scroll>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "../../api/index";
import { Swipe, SwipeItem } from "vant";
import Scroll from "@/components/Scroll.vue"
@Component({
	components: {
		Swipe,
		SwipeItem,
		Scroll
	}
})
export default class extends Vue {
	created() {
		this._getRecommendSwiper();
		this._getRecommendList();
	}
	//  initData
	swiperList: object[] = [];
	recommendList: object[] = [];
	// methods
	_getRecommendSwiper() {
		api.post("/music", {
			path: "/top/playlist/highquality",
			params: {
				limit: 5
			}
		}).then(res => {
			if(res.data.code === 200) {
				this.swiperList = res.data.playlists;
			}
		})
	};
	_getRecommendList() {
		api.post("/music", {
			path: "/personalized"
		}).then(res => {
			if(res.data.code === 200) {
				this.recommendList = res.data.result;
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/base"
.recommend
	.swiper
		width 100%
		height 180px
		img 
			width 100%
			display block
			height 180px
	.recommend-list
		.list-title
			height: 65px
			line-height: 65px
			text-align: center
			font-size: $font-size-medium
			color: $color-theme
		.item
			display: flex
			box-sizing: border-box
			align-items: center
			padding: 0 20px 20px 20px
			.icons
				flex 0 0 60px
				width 60px
				padding-right 20px
			.text
				display: flex
				flex-direction: column
				justify-content: center
				flex: 1
				overflow: hidden
				.name
					margin-bottom 10px
					font-size: 13px
					color $color-text
				.desc
					color $color-text-d
					font-size: 13px
.list-wrapper
	position fixed
	width 100%
	top 268px
	bottom 0
.recommendContent
	height 100%
	overflow hidden
</style>
