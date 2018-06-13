<template>
	<div class="hello">
		<Button @click="test('sadas')">{{ msg }}</Button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Provide } from 'vue-property-decorator';
import { Button } from "vant";

@Component({
	components: {
		Button
	}
})
export default class HelloWorld extends Vue {
    @Prop({ default: 'default value' }) msg: string;

	@Provide() foo = 'foo'

	@Emit("B")
		test(n: string) {
			this.foo = n;
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
