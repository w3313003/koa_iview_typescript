<template>
	<div class="hello">
		<Button @click="test('sadas')">{{ msg }}</Button>
        <h5>{{count}}</h5>
        <h4>{{formateAge}}</h4>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Provide, Inject } from 'vue-property-decorator';
import { Button } from "vant";

@Component({
	components: {
		Button
	}
})
export default class HelloWorld extends Vue {
    @Prop({ default: 'default value' }) msg: string;

	@Provide() foo = 'foo'

    @Inject() count: number;
    // data
    private age: number = 3;
    
    get formateAge(): number {
        return Number(this.age) + 2;
    }
	test() {
        this.$emit("B", {a: 123})
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
