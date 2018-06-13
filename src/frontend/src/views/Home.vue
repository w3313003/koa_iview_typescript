<template>
	<div>
		<Button type="primary" size="samll">
			你好啊
		</Button>
		<Hello @B="test" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hello from "@/components/HelloWorld.vue";
import { Button } from "vant";
@Component({
  components: {
    Button,
	Hello
  }
})
export default class Home extends Vue {
  name: number = 123;

  test(c: MouseEvent, d: any) {
	  console.log(d);
  }
}
</script>
