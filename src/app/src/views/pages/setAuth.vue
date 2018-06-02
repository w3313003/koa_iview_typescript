<template>
    <div ref="div" style="height: 300px;background: red">
		test
	    <Button @click="big">
		    big
	    </Button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	methods: {
		big() {
			this.$refs.div.style.height = "3000px";
		}
	}

});

</script>

<style lang="stylus" scoped>

</style>
