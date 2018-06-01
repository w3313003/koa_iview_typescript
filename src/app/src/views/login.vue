<template>
	<div class="bg">
		<div class="login">
			<Card>
				<p slot="title">
					<Icon type="log-in"/>
					欢迎登陆
				</p>
				<Form ref="form" :model="formData" :rules="formRules">
					<FormItem prop="username">
						<i-input v-model="formData.username"  placeholder="请输入用户名" type="text">
							<Icon size="18" slot="prepend" type="person" />
						</i-input>
					</FormItem>
					<FormItem prop="password">
						<i-input v-model="formData.password" placeholder="请输入密码" type="password">
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


<script lang="ts">
import Vue from 'vue';
import api from "../api/resource";
import md5 from "md5";
import { validateUname, validatePassword } from "../common/util";
import { mapMutations } from "vuex";
import * as Types from "../store/mutations/types";
export default Vue.extend({
	data() {
		return {
			formData: {
				username: "",
				password: ""
			},
			formRules: {
				username: [
					{ validator: validateUname, trigger: 'blur' }
				],
				password: [
					{validator: validatePassword, trigger: 'blur'}
				]
			},
		};
	},
	methods: {
		login(): void {
			this.$refs.form.validate((valid: boolean) => {
				if(valid) {
					api.post("/login", {
						username: this.formData.username,
						password: md5(this.formData.password)
					}).then(res => {
						if(res.data.code === 0) {
							this.$Notice.success({
								title: "登陆成功",
								desc: "即将跳转到首页"
							});
							this.loginSuccess(true);
						}
					});
					return;
				};
				this.$Notice.warning({
					title: "登陆失败",
					desc: "请完善登陆信息后重试"
				});
			})
		},
		...mapMutations({
			loginSuccess: Types.LOGIN
		})
	}
});
</script>

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


