<template>
    <div class="music-list">
        <div class="back" @click="back">
            <svg class="icon icon-back " aria-hidden="true">
                <use xlink:href="#icon-fanhui" />
            </svg>
        </div>
        <h1 class='title' ref="title">
            {{title}}
        </h1>
        <div class='bg-image' :style='bgStyle' ref='bgImage'>
            <div class='play-wrapper' ref='playBtn'>
                <div class='play'>
                    <svg class="icon icon-play " aria-hidden="true">
                        <use xlink:href="#icon-suiji" />
                    </svg>
                    <span class='text'>随机播放全部</span>
                </div>
            </div>
            <div class='filter' ref='filter'></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <Scroll :listenScroll="true" 
                :probeType="3"  
                class="list" 
                ref='list' 
                :data="musicList"
                @scroll="scroll"
        >
            <div class="song-list-wrapper">
                <div class="song-list">
                    <ul>
                        <li class="item" v-for="(item, index) of musicList" :key="index">
                            <div class="content">
                                <h2 class="name">
                                    {{item.songName}}
                                </h2>
                                <p class="desc">
                                    {{title}}·{{item.album.name}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>    
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Scroll from "../../components/Scroll.vue";
import music from "../../../../controller/music";

type music = {
    songName: string;
    id: number;
    album: any
}
type pos = {
    x: number;
    y: number;
}

@Component({
    components: {
        Scroll
    }
})
export default class extends Vue {
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.imageHeight = (this.$refs.bgImage as HTMLElement).clientHeight;
                this.reservedHeight = (this.$refs.title as HTMLElement).clientHeight;
                console.log((this.$refs.title as HTMLElement))
                this.minTranslateY = -this.imageHeight + this.reservedHeight;
                (this.$refs.list as any).$el.style.top = `${(this.$refs.bgImage as HTMLElement).clientHeight}px`
            }, 20)
        })
    }
    @Prop({default: "标题"})
        title: string;
    @Prop({default: ""})
        bgImage: string;
    @Prop({default: () => ([] as any[])})
        musicList: music[]

    private imageHeight: number = 0;
	private reservedHeight: number = 0;
    private scrollY: number = 0;
    private minTranslateY: number = 0;
    get bgStyle() {
        return `background-image:url(${this.bgImage})`
    }

    scroll(pos: pos) {
        this.scrollY = pos.y;
    }
    back() {
        this.$router.back();
    }
    @Watch("scrollY")
        onScrollYChange(newY: number) {
            const layer = <HTMLElement>this.$refs.layer;
            const listEl = <HTMLElement>(this.$refs.list as Vue).$el;
            const filter = <HTMLElement>this.$refs.filter;
            const bgImage = <HTMLElement>this.$refs.bgImage;
            const btn = <HTMLElement>this.$refs.playBtn;
            // 滚动到一定程度取定值 
            let transLateY = Math.max(this.minTranslateY, newY);

            let zIndex = 0;
            let scale = 1;
            let blur = 0;
            const percent = Math.abs(newY / this.imageHeight);
            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
            } else {
                blur = Math.min(20 * percent, 20)
            }
            (filter.style as any)['backdrop-filter'] = `blur(${blur}px)`;
            layer.style.transform = `translate3d(0,${transLateY}px,0)`;
            if (newY < this.minTranslateY) {
                zIndex = 10;
                bgImage.style.paddingTop = '0';
                bgImage.style.height = `${this.reservedHeight}px`;
                btn.style.display = "none";
                console.log(2);
            } else {
                console.log(1);
                bgImage.style.paddingTop = '70%';
                bgImage.style.height = `0`;
                btn.style.display = "block";
            }
            bgImage.style.zIndex = "" + zIndex;
            bgImage.style.transform = `scale(${scale})`;
            // if(newY < 0) {
            //     layer.style.transform = `translate3d(0,${newY}px,0)`
            // } else {
            //     // layer.style.transform = `translate(0, 0)`
            //     layer.style.transform = `translate3d(0,${newY}px,0)`
            //     listEl.style.transform = `translate3d(0,${newY}px,0)`
            // }
        }
}


</script>

<style lang="stylus" scoped>
@import "../../common/stylus/base"
@import "../../common/stylus/func"
  .music-list
    position: fixed
    z-index: 101
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      margin 0
      no-wrap()
      text-align: center
      line-height: 40px
      height 40px
      font-size: $font-size-medium
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

.song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            $bg-image('first')
          &.icon1
            $bg-image('second')
          &.icon2
            $bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin 0
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size 15px
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
