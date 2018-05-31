<template>
	<div class="bg">
		<div class="login">
			<Card>
				<p slot="title">
					<Icon type="log-in"/>
					欢迎登陆
				</p>
				<Form>
					<i-input type="text">
						<Icon slot="prepend" type="log-in" />
					</i-input>
				</Form>
			</Card>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
.bg 
	width: 100vw;
	height: 100vh;
	background  url("../assets/img/bg.jpg") no-repeat
	background-size :cover
	background-position: center;
	position relative
	.login
		position: absolute
		width 300px
		transform translateY(-50%)
		right 160px
		top	50%
		
</style>


<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			name: 123
		};
	}
});
</script>
