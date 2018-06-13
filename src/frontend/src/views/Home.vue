<template>
  <div class="home">
	<h2>
		{{name}}
	</h2>
	<Button type="default">默认按钮</Button>

    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"
		/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Button } from "vant";

@Component({
	components: {
		HelloWorld,
	}
})
export default class Home extends Vue {
    name: string = 123;
}
</script>
