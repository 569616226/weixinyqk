<template>
	<div v-title :data-title="title">
		<div class="auth-cusomer">
			<van-cell-group class="auth-cusomer-cell">
				<van-field class="auth-cusomer-cell-field1" v-model="ruleForm.phone" clearable label="手机号" placeholder="输入11位手机号" />
				<van-field class="auth-cusomer-cell-field2" v-model="ruleForm.sms_code" center clearable label="验证码" placeholder="输入4位验证码">
					<button @click="send" slot="button" class="auth-cusomer-cell-field2-seed">
			  			<span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
			  			<span v-if="!sendMsgDisabled">获取验证码</span>
			 		</button>
				</van-field>
			</van-cell-group>
		</div>
		<div class="NonCompulsoryItems">
			<p class="NonCompulsoryItems-no">非必填项</p>
			<van-cell-group class="auth-cusomer-cell">
				<van-field class="auth-cusomer-cell-field1" v-model="ruleForm.invitation_code" clearable label="邀请码" placeholder="输入6位邀请码(非必填)" />
				<van-field class="auth-cusomer-cell-field1" v-model="ruleForm.username" clearable label="姓名" placeholder="输入您的姓名(非必填)" />
			</van-cell-group>
		</div>
		<button @click="postAuth" class="auth-cusomer-post">
			<span>提交</span>
		</button>
	</div>
</template>

<script>
	import api from '../utils/api'
	import { getCookie, setCookie } from '../utils'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				ruleForm: {
					phone: '',
					sms_code: '',
					invitation_code: null,
					username: '',
					open_id: getCookie('openid'),
					wechat_name: decodeURIComponent(getCookie('nickname')),
					wechat_avatar: decodeURIComponent(getCookie('headimgurl'))
				},
				time: 60, // 发送验证码倒计时
				sendMsgDisabled: false
			}
		},
		computed: {

		},
		methods: {
			async send() {
				if(this.sendMsgDisabled == false) {
					const data = await api.postSmsCode(this.ruleForm.phone)
					this.$toast({
						message: data.msg,
						duration: 1000
					})
				}
				this.sendMsgDisabled = true
				const interval = window.setInterval(() => {
					if((this.time--) <= 0) {
						this.time = 60
						this.sendMsgDisabled = false
						window.clearInterval(interval)
					}
				}, 1000)
			},
			async postAuth() {
				if(this.ruleForm.phone == '' || !(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.ruleForm.phone))) {
					this.$toast({
						message: '请正确输入手机号码',
						duration: 1000
					})
					return false
				}
				if(this.ruleForm.sms_code == '') {
					this.$toast({
						message: '请正确输入验证码',
						duration: 1000
					})
					return false
				}

				const data = await api.postCheckSmsCode(this.ruleForm)
				this.$toast({
					message: data.msg,
					duration: 1000
				})
				if(data.status) {
					const wx_data = await api.getToken(this.ruleForm.open_id)
					setCookie('mobile_token', wx_data.access_token)
					this.$router.replace({
						name: 'AuthSuccess',
						query: {
							is_client: wx_data.is_client
						}
					})
				}

			}
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.auth-cusomer {
		margin-top: 1rem;
		&-cell {
			&-field1 {
				font-size: 1rem;
				padding: 1.1rem 1rem;
			}
			&-field2 {
				font-size: 1rem;
				padding: .5rem 1rem;
				&-seed {
					background: transparent;
					border: 1px solid rgb(24, 144, 255);
					border-radius: 6px;
					color: rgb(24, 144, 255);
					font-size: .9rem;
					padding: .5rem .7rem;
				}
			}
		}
	}
	
	.NonCompulsoryItems {
		&-no {
			color: rgb(111, 115, 138);
			font-size: .9rem;
			padding: 1.5rem 0 .6rem 1rem;
		}
	}
</style>