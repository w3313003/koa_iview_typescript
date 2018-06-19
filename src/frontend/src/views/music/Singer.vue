<template>
    <div class="singer">
        <div class="fixed-title" v-show="fixedShow" ref="fixedTitle">
            {{ fixedTitle }}
        </div>
        <Scroll
            class="listview"
            :data="singerList"
            :listenScroll="true"
            @scroll="onScroll"
            :probeType="3"
        >
            <ul>
                <li v-for="(group, index) in formatSingerList" 
                    :key="index" 
                    class="list-group" 
                    ref="listGroup"
                >
                    <h2 class="list-group-title">{{group.label}}</h2>
                    <ul>
                        <li class="list-group-item" v-for="(item, i) of group.list" :key="i">
                            <img :src="item.img1v1Url" alt="" class="avatar">
                            <span class="name">
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        </Scroll>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "../../api/index";
import { getPinyinBySinger } from "../../common/util";
import Scroll from "../../components/Scroll.vue";
import { setTimeout } from "timers";

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';
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
    // initData
    singerList: object[] = [];
    listHeight: Array<number> = [];
    scrollY: number = 0;
    fixedShow: boolean = true;
    currentIndex: number = 0;
    diff: number = -1;

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
            return ''
        };
        return this.formatSingerList[this.currentIndex] ? this.formatSingerList[this.currentIndex].label : ""; 
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
    onScroll(pos: pos) {
        this.scrollY = pos.y;
    }
    _calculateHeight() {
        const list: any = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        list.forEach((v: HTMLElement) => {
            height += v.clientHeight;
            this.listHeight.push(height);
        });
    };

    @Watch("singerList", { deep: true })
        onDataChange() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        }
    @Watch("scrollY", {immediate: true})
        onScrollChange(val: number) {
            if(val > -10) {
                this.fixedShow = false;
            } else {
                this.fixedShow = true;
                const list = this.listHeight;
                for(let i = 0; i < list.length - 1; i++) {
                    let height1 = list[i],
                        height2 = list[i + 1];
                    if(height2 && height1 <= -val && height2 > -val) {
                        console.log(height2);
                        this.currentIndex = i;
                        this.diff = height2 + val + 10;
                        return;
                    }
                }
            }
        }
    // @Watch("diff")
    //     onDiffChange(val: number) {
    //         const titleHeight = (this.$refs.fixedTitle as HTMLElement).clientHeight;
    //         const fixedTop = (val > 0 && val < titleHeight) ? val - titleHeight : 0;
    //         (this.$refs.fixedTitle as HTMLElement).style.transform = `translate3d(0,${fixedTop}px ,0)`;
    //     }
}


</script>

<style lang="stylus" scoped>
.singer 
    position fixed
    top 98px
    width 100%
    bottom 0
    overflow hidden
    .listview
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .list-group
            padding-bottom: 3vh;
        .list-group-title
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
            &:first-child
                padding-top 10px
            img.avatar
                width: 50px;
                height: 50px;
                border-radius: 50%;
            span.name
                margin-left: 20px;
                color: hsla(0,0%,100%,.5);
                font-size: 14px;
.fixed-title
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: hsla(0,0%,100%,.5);
    background: #333;
    z-index 33
</style>
