<template>
    <div class="list-shortcut">
        <ul @touchstart.stop.prevent="onTouchStart"
            @touchmove.stop.prevent="onTouchMove">
            <li class="item"
                v-for="(item, index) of data"
                :key="index"
                :data-index="index"
                :class='{"current":currentIndex===index}'
            >
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
    @Prop({default: []})
        data: object[];
    @Prop({default: 0})
        currentIndex: number;
    
    touchStartPos: any = {};
    ownIndex: number = 0;

    onTouchStart(e: TouchEvent) {
        this.ownIndex = Number((e.target as HTMLElement).dataset.index);
        this.touchStartPos = e.touches[0];
        this.$emit("tStart", this.ownIndex)
    }
    onTouchMove(e: TouchEvent) {
        const finger = e.touches[0];
        const delta = (finger.pageY - this.touchStartPos.pageY) / 20 | 0;
        this.$emit("tMove", delta + this.ownIndex);
    }
}
</script>


<style lang="stylus" scoped>
@import "../../common/stylus/base";
.list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
            color: $color-theme

</style>
