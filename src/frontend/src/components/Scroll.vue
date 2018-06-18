<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import BScroll from "better-scroll";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
	mounted() {
		this.$nextTick(() => {
			this._initScroll()
		})
	};
	@Prop({default: 1})
		probeType: number;
	@Prop({default: true})
		click: boolean;
	@Prop({default: false})
		listenScroll: boolean;
	@Prop({default: []})
		data: any[];
	@Prop({default: false})
		pullup: boolean;
	@Prop({default: false})
		beforeScroll: boolean;
	@Prop({default: 20})
		refreshDelay: number;
	// init_data
	scroll: any =  {};

	//  methods
	_initScroll() {
		if(!this.$refs.wrapper) {
			return;
		}
		this.scroll = new BScroll(<HTMLElement>this.$refs.wrapper, {
			probeType: this.probeType,
        	click: this.click
		});
		if(this.listenScroll) {
			this.scroll.on("scroll", (pos: any) => {
				this.$emit('scroll', pos)
			})
		};
		if(this.beforeScroll) {
			this.scroll.on("beforeScrollStart", () => {
				this.$emit("beforeScroll")
			})
		}
	};
	disable() {
		this.scroll && this.scroll.disable();
	};
	enable() {
		this.scroll && this.scroll.enable();
	};
	refresh() {
		this.scroll && this.scroll.refresh();
	};
	scrollToElement() {
		this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
	}
	//  watch
	@Watch("data", {immediate: true, deep: true})
		onDataChange(val: any, oldVal: any) {
			setTimeout(() => {
				this.refresh();
			}, this.refreshDelay);
		}
	
}

</script>

<style lang="stylus" scoped>
</style>

