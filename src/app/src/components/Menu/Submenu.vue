<template>
	<div>
		<div v-for="(item, index) of submenu" :key="index">
			<div v-if="item.child.length < 1 && item.type !== 'dropdown'">
				<MenuItem :name="item.path" :key="index">
					<Icon :type="item.icon"/>
					{{item.title}}
				</MenuItem>
			</div>
			<Submenu :name="item.id" :key="index" v-else>
				<template slot="title">
					<Icon :type="item.icon"/>
					{{item.title}}
				</template>
				<!-- 组件递归 -->
				<sub_menu :submenu="item.child" />
			</Submenu>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "sub_menu",
	props: {
		submenu: {
			type: Array,
			default: []
		}
	}

});

</script>

<style lang="stylus" scoped>


</style>
