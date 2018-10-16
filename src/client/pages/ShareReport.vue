<template>
	<div v-title :data-title="title">
		<div class="ShareReport">
			<div class="ShareReport-t">
				<p class="ShareReport-t-p1">邀请码</p>
				<p class="ShareReport-t-p2">{{numer}}</p>
				<p class="ShareReport-t-p3" v-clipboard:copy="numer" v-clipboard:success="onCopy" v-clipboard:error="onError">复制邀请码</p>
			</div>
			<div class="ShareReport-content">
				<p class="ShareReport-content-btn" @click="ShareShow = true">马上分享</p>
				<div class="ShareReport-content-l">
					<div class="ShareReport-content-l-t">
						<span>流程</span>
					</div>
					<div class="ShareReport-content-l-b">
						<van-row class="ShareReport-content-l-b-row">
							<van-col span="2" class="ShareReport-content-l-b-row-left">
								<span><font>1</font></span>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-middle">
								<p>复制邀请码</p>
								<p>好友注册需填写您的邀请码</p>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-right">
								<img src="../assets/ShareReport/ShareReport1.png" />
							</van-col>
						</van-row>
						<van-row class="ShareReport-content-l-b-row">
							<van-col span="11" class="ShareReport-content-l-b-row-right">
								<img src="../assets/ShareReport/ShareReport2.png" />
							</van-col>
							<van-col span="2" class="ShareReport-content-l-b-row-left">
								<span><font>2</font></span>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-middle">
								<p>分享链接</p>
								<p>点击右上角的图标，分享链接给好友</p>
							</van-col>
						</van-row>
						<van-row class="ShareReport-content-l-b-row">
							<van-col span="2" class="ShareReport-content-l-b-row-left">
								<span><font>3</font></span>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-middle">
								<p>好友绑定账号</p>
								<p>您的好友需在注册时，填写您的邀请码</p>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-right">
								<img src="../assets/ShareReport/ShareReport3.png" />
							</van-col>
						</van-row>
						<van-row class="ShareReport-content-l-b-row">
							<van-col span="11" class="ShareReport-content-l-b-row-right">
								<img src="../assets/ShareReport/ShareReport4.png" />
							</van-col>
							<van-col span="2" class="ShareReport-content-l-b-row-left">
								<span><font>4</font></span>
							</van-col>
							<van-col span="11" class="ShareReport-content-l-b-row-middle">
								<p>绑定成功</p>
								<p>好友完成绑定后，可以查看该企业的报告</p>
							</van-col>
						</van-row>
						<p class="ShareReport-content-l-b-btn" @click="ShareShow = true">去分享</p>
					</div>
				</div>
			</div>
			<div style="height: 2rem;"></div>
		</div>
		<transition name="fade">
			<div class="ShareReport-share" v-if="ShareShow" @click="ShareShow = false">
				<img src="../assets/ShareReport/share.png" />
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				numer: this.$route.query.code,
				ShareShow: false,
				wechatObjData: []
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
			onCopy(value) {
				this.$toast({
					message: '复制成功',
					duration: 1000
				})
			},
			onError() {
				this.$toast({
					message: '复制失败',
					duration: 1000
				})
			},
			async getData() {
				let that = this
				const signature = await api.getSignature()
				const imgUrl = 'https://wx.check.elinkport.com/shareTu.png'
				const config = {
					appId: signature.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
					timestamp: signature.timestamp, // 必填，生成签名的时间戳
					nonceStr: signature.nonceStr, // 必填，生成签名的随机串
					signature: signature.signature, // 必填，签名，见附录1
					success: function(wechatObj) {
						wechatObj.shareOnChat({
							type: 'link',
							title: '您有一份新的报告等待查看',
							link: `https://wx.check.elinkport.com/#/Owner/Share?code=${that.numer}`,
							imgUrl: imgUrl,
							desc: '完成认证马上查看报告',
							success: function() {
								that.ShareShow = false
							},
							cancel: function() {
								that.ShareShow = false
							}
						})
					},
					error: function(err, wechatObj) {
						console.log('err', err)
					}, //微信签名失败回调函数, 跟 'errorCallback' 一样
					debug: false,
					jsApiList: ['onMenuShareAppMessage']
				}
				const wechatObj = await new WechatJSSDK(config)
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.ShareReport {
		background: #ffffff;
		&-share {
			position: fixed;
			top: 0;
			height: 100%;
			background: rgba(16, 16, 16, .7);
			z-index: 4;
			text-align: right;
			padding: .5rem 1rem;
			& img {
				width: 80%;
			}
		}
		&-t {
			background-image: url(../assets/ShareReport_Bg.png);
			background-size: cover;
			padding: 2rem 0 1rem 0;
			text-align: center;
			&-p1 {
				color: rgb(255, 255, 255);
			}
			&-p2 {
				color: rgb(255, 255, 255);
				font-size: 3.8rem;
				font-weight: bold;
				margin-top: .6rem;
			}
			&-p3 {
				color: rgb(62, 155, 255);
				font-size: .9rem;
				margin-top: 1.7rem;
				text-decoration: underline;
			}
		}
		&-content {
			margin-top: .5rem;
			padding: 0 1rem;
			&-btn {
				color: rgb(255, 255, 255);
				background-color: rgb(62, 155, 255);
				border-color: transparent;
				box-shadow: rgba(62, 155, 255, 0.4) 0px 6px 10px 0px;
				border-radius: 30px;
				padding: 1rem;
				text-align: center;
				font-size: .9rem;
			}
			&-l {
				margin-top: 1.5rem;
				background-color: rgb(255, 255, 255);
				border-color: transparent;
				box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
				border-radius: 6px;
				padding-bottom: 2rem;
				&-t {
					position: relative;
					padding: 1rem;
					text-align: center;
					color: rgb(24, 144, 255);
					font-size: .9rem;
					font-weight: bold;
					background-color: rgb(229, 243, 255);
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					&:before {
						content: '';
						border-bottom: 15px solid transparent;
						border-left: 18px solid transparent;
						border-right: 18px solid transparent;
						border-top: 15px solid rgb(229, 243, 255);
						position: absolute;
						bottom: -1.8rem;
						left: calc(50% - 18px);
					}
				}
				&-b {
					margin-top: 2rem;
					&-btn {
						margin: 1rem auto;
						width: 80%;
						text-align: center;
						color: rgb(255, 255, 255);
						background-color: rgb(62, 155, 255);
						box-shadow: rgba(62, 155, 255, 0.4) 0px 6px 10px 0px;
						border-radius: 30px;
						padding: 1rem 0;
						font-size: .9rem;
					}
					&-row {
						padding: 1.5rem;
						&-left {
							& span {
								position: relative;
								color: rgb(0, 141, 255);
								font-weight: bold;
								font-style: italic;
								font-size: 1.1rem;
								&:before {
									content: '';
									background-color: rgb(185, 222, 255);
									width: 16px;
									height: 16px;
									position: absolute;
									border-radius: 50%;
									bottom: -1px;
									left: -2px;
									z-index: 1;
								}
								& font {
									z-index: 2;
									position: relative;
								}
							}
						}
						&-middle {
							& p {
								margin-bottom: .5rem;
							}
						}
						&-right {
							text-align: center;
							overflow: hidden;
							height: 119px;
							& img {
								width: 80%;
							}
						}
					}
				}
			}
		}
	}
</style>