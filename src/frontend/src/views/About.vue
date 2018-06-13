<template>
  <div class="about">
    <h1>This is an about page {{name}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			name: 12312
		}
	}
})
</script>
