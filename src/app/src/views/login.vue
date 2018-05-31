<template>
	<div class="bg">
		<div class="login">
			<Card>
				<p slot="title">
					<Icon type="log-in"/>
					欢迎登陆
				</p>
				<Form>
					<FormItem>
						<i-input placeholder="请输入用户名" type="text">
							<Icon size="18" slot="prepend" type="person" />
						</i-input>
					</FormItem>
					<FormItem>
						<i-input placeholder="请输入密码" type="password">
							<Icon size="18" slot="prepend" type="locked" />
						</i-input>
					</FormItem>
					<FormItem>
						<Button type="primary" long @click="login">
							登陆
						</Button>
					</FormItem>
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
import api from "../api/resource";
console.log(api);
export default Vue.extend({
	data() {
		return {
			name: 123
		};
	},
	methods: {
		login(): void {
		}
	}
});
</script>
