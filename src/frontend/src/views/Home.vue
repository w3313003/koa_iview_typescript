<template>
	<div class="wrap">
        <div class="search-box-cover"></div>
        <div class="search-wrapper">
            <div class="logo-wrapper">
                <svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-tubiaozhizuomoban" />
				</svg>
				<img class="logo" src="../assets/pic/logo.webp" alt="">
				<span class="login">登陆</span>
			</div>
            <div class="search">
                <Search placeholder="请输入商品名称" />
            </div>
        </div>
        <div class="nav">
            <div class="nav-item" v-for="item of navItem" :key="item.text">
                <img :src="item.pic" alt="">
                <span>{{item.text}}</span>
            </div>
        </div>
        <!-- <div class="swiper">
            <Swipe>
                <SwipeItem>
                    <img src="../assets/pic1.webp" alt="">
                </SwipeItem>
                <SwipeItem>
                    <img src="../assets/pic2.webp" alt="">
                </SwipeItem>
            </Swipe>
        </div>
        <div class="search">
            <Search placeholder="请输入商品名称" />
        </div> -->
	</div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { Button, Swipe, SwipeItem, Search  } from "vant";
@Component({
  components: {
    Button,
    Swipe, 
    SwipeItem,
    Search
  }
})
export default class Home extends Vue {
  name: number = 123;
  private navItem: object[] = [
      {
          pic: require("../assets/pic/suning.webp"),
          text: "苏宁易购"
      },
      {
          pic: require("../assets/pic/supermarket.png"),
          text: "天猫超市"
      },
      {
          pic: require("../assets/pic/travel.webp"),
          text: "天猫国际"
      },
      {
          pic: require("../assets/pic/ju.webp"),
          text: "聚划算"
      },
      {
          pic: require("../assets/pic/category.webp"),
          text: "分类"
      },
  ]
  @Provide() count = 123;
}
</script>

<style lang="stylus" scoped>
.wrap
    background-image url("../assets/pic/bg.webp")
    background-size cover
    min-height 100vh
    .search-box-cover
        position fixed
        width 100%
        height 50px
        left: 0;
        top: 0;
        z-index: 16;
        background: linear-gradient(#000,transparent);
        opacity 1
    .search-wrapper
        width 100%
        border: 0px solid black;
        position: fixed;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        flex-shrink: 0;
        top: 0px;
        z-index: 99;
        align-items: center;
        overflow: hidden;
        visibility: visible;
        opacity: 1;
        .logo-wrapper
            display flex
            width 100%
            padding 7px 10px
            box-sizing border-box
            justify-content space-between
            align-items center
            img.logo
                width: 118.5px;
                height: 20.5px;
            .icon 
                font-size 30px
                color #fff
            span.login
                font-size 14px
                color #fff
        .search
            width 100%
            padding 0 10px 10px
            box-sizing border-box
            .van-search
                background #fff!important
                border-radius 10px
    .nav
        display flex
        flex-wrap wrap
        padding 100px 10px 0
        justify-content flex-start
        .nav-item
            width 70px
            text-align center
            color #fff
            margin-right 1px
            margin-bottom 10px
            &:nth-child(5n)
                margin-right 0
            img 
                display block
                width 48px
                height 48px
                margin 0 auto
            span 
                font-size 13px
                margin-top 5px
                display block
                text-align center
.swiper
    width 100%
    .van-swipe
        height 100%
    height 180px
    img 
        width 100%
        height 180px
</style>
