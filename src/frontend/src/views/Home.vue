<template>
	<div>
        <div class="swiper">
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
        </div>
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
  test(d: any) {
	  console.log(d);
  }
  @Provide() count = 123;
}
</script>

<style lang="stylus" scoped>
.swiper
    width 100%
    .van-swipe
        height 100%
    height 180px
    img 
        width 100%
        height 180px
.search
    position relative
    &:before
        position absolute
        z-index 10
        left 0
        width 100%
        background rgb(242, 242, 242);
        height 20px
        top -10px
        border-radius 100% 100% 0 0 
</style>
