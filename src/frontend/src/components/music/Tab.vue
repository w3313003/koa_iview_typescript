<template>
	<div class="tab">
		<router-link tag="div" class="tab-item" to="/music/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/music/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/music/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/music/search">
            <span class="tab-link">搜索</span>
        </router-link>
	</div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

@Component
export default class extends Vue {

}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/base.styl";
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    z-index 100
    position relative
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme

</style>
