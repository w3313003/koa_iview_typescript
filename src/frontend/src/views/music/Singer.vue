<template>
    <div class="singer">
        <div class="list-fixed" v-show="fixedShow" ref="fixedTitle">
            <div class="fixed-title">
                {{ fixedTitle }}
            </div>
        </div>
        <Scroll
            class="listview"
            :data="singerList"
            :listenScroll="true"
            @scroll="onScroll"
            :probeType="3"
            ref="scroll"
        >
            <ul>
                <li v-for="(group, index) in formatSingerList" 
                    :key="index" 
                    class="list-group" 
                    ref="listGroup"
                >
                    <h2 class="list-group-title">{{group.label}}</h2>
                    <ul>
                        <li @click="select(item)" class="list-group-item" v-for="(item, i) of group.list" :key="i">
                            <img v-lazy="item.img1v1Url" alt="" class="avatar">
                            <span class="name">
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        </Scroll>
        <SideBar 
            :data="shortcutList"
            :currentIndex="currentIndex"
            @tStart="touchStartHandler"
            @tMove="touchMoveHandler"
        />
        <router-view />
    </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "../../api/index";
import { getPinyinBySinger } from "../../common/util";
import Scroll from "../../components/Scroll.vue";
import SideBar from "@/components/music/SideBar.vue";
import { setTimeout } from "timers";

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';
type pos = {
    x: number;
    y: number;
}
@Component({
    components: {
        Scroll,
        SideBar
    }
})
export default class extends Vue {
    // initData
    private singerList: object[] = [];

    private listHeight: Array<number> = [];

    private scrollY: number = 0;

    private fixedShow: boolean = true;

    private currentIndex: number = 0;

    private diff: number = -1;

    private fixedTop: number = -1;


    created() {
        this._getSinger().then(res => {
            // console.log(this.$refs.listGroup)
        });
    }

    // computed
    get formatSingerList() {
        const map: any = {
            hot: {
                label: HOT_NAME,
                list: [],
            }
        };
        const list: any = [];
        this.singerList.forEach((v: any, i: number) => {
            list.push(v);
            if(i < HOT_SINGER_LEN) {
                map['hot'].list.push(v);
            }
        });
        list.forEach((v: any) => {
            const { pinyin } = v;
            if(!/[A-Z]/.test(pinyin)) {
                return false;
            }
            if(!Reflect.has(map, pinyin)) {
                map[pinyin] = {
                    label: pinyin,
                    list: []
                }
            };
            map[pinyin].list.push(v);
        });
        const ret: any[] = [];
        const hot: any[] = [];
        Object.keys(map).forEach((v: string) => {
            if(v === "hot") {
                hot.push(map[v])
            } else {
                ret.push(map[v])
            }
        });
        ret.sort((a: any, b: any) => {
            return a.label.charCodeAt(0) - b.label.charCodeAt(0);
        });
        return [...hot ,...ret];
    }
    get fixedTitle() {
        if(this.scrollY > -10) {
            this.fixedShow = false;
            return ''
        };
        return this.formatSingerList[this.currentIndex] ? this.formatSingerList[this.currentIndex].label : ""; 
    }
    get shortcutList() {
        return this.formatSingerList.map(v => v.label[0]);
    }
    // methods
    _getSinger() {
        return api.post("/music", {
            path: "/top/artists",
            params: {
                limit: 100
            }
        }).then(res => {
            if (res.data.code === 200) {
                const data = res.data;
                this.singerList = data.artists.map((v: any) => {
                    const { albumSize, alias, id, img1v1Url, name, musicSize, lastRank} = v;
                    const pinyin = getPinyinBySinger(v.name)[0][0].toUpperCase();
                    return {
                        albumSize, 
                        alias, 
                        id, 
                        img1v1Url, 
                        name, 
                        musicSize, 
                        lastRank,
                        pinyin
                    };
                });
            }
        })
    };
    select(item: any) {
        this.$router.push(`/music/singer/${item.id}`);
    }
    onScroll(pos: pos) {
        this.scrollY = pos.y + 5;
    }
    touchStartHandler(index: number) {
        (this.$refs.scroll as any).scrollToElement((this.$refs.listGroup as HTMLElement[])[index], 500);
    }
    touchMoveHandler(index: number) {
        (this.$refs.scroll as any).scrollToElement((this.$refs.listGroup as HTMLElement[])[index], 500);
    }
    _calculateHeight() {
        const list: any = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            height += item.clientHeight;
            this.listHeight.push(height)
        };
    };

    @Watch("singerList", { deep: true })
        onDataChange() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        }
    @Watch("scrollY", {immediate: true})
        onScrollChange(Y: number) {
            if(Y <= 0) {
                this.fixedShow = true;
            }
            const listHeight = this.listHeight;
            if (Y > 0) {
                this.currentIndex = 0;
                return;
            };
            for (let i = 0; i < listHeight.length; i++) {
                let height1 = listHeight[i],
                    height2 = listHeight[i + 1];
                if (!height2 || -Y + 10 >= height1 && -Y + 10 <= height2) {
                    this.currentIndex = i;
                    this.diff = height2 + Y;
                    return;
                }
            }
            this.currentIndex = 0;
        }
    @Watch("diff")
        onDiffChange(newVal: number) {
            const TITLE_HEIGHT = (this.$refs.fixedTitle as HTMLElement).clientHeight;
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop;
            (this.$refs.fixedTitle as HTMLElement).style.transform = `translate3d(0,${fixedTop}px,0)`
        }
}


</script>

<style lang="stylus" scoped>
@import "../../common/stylus/base"

.singer 
    position fixed
    top 98px
    width 100%
    bottom 0
    z-index 101
    overflow hidden
    .listview
        position: relative;
        width: 100%;
        height: 100%;
        .list-group
            padding-bottom: 3vh;
        .list-group-title
            margin: 0;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            color: hsla(0,0%,100%,.5);
            background: #333;
        .list-group-item
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            img.avatar
                width: 50px;
                height: 50px;
                border-radius: 50%;
            span.name
                margin-left: 20px;
                color: hsla(0,0%,100%,.5);
                font-size: 14px;
.list-fixed
        position: absolute
        top: 0
        left: 0
        width: 100%
        z-index 100
        .fixed-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-highlight-background
</style>
