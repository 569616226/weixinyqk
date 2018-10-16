<template>
	<div v-title :data-title="title">
		<div class="Share">
			<div class="Share-title">
				<div class="Share-title-bg">
					<div class="Share-title-bg-logo">
						<img src="../assets/Share/logo.png" />
					</div>
					<div class="Share-title-bg-show">
						<img src="../assets/Share/show.png" />
					</div>
				</div>
				<img src="../assets/Share/share_bg1.png" class="Share-title-share_bg1" />
				<img src="../assets/Share/pe.png" class="Share-title-pe" />
			</div>
			<div class="Share-content">
				<div class="Share-content-title">
					<div class="Share-content-title-bubble1"></div>
					<div class="Share-content-title-bubble2"></div>
					<span class="Share-content-title-span">关注及绑定流程</span>
					<div class="Share-content-title-bubble2"></div>
					<div class="Share-content-title-bubble1"></div>
				</div>
				<div class="Share-content-list">
					<van-row class="Share-content-list-row" gutter="10">
						<van-col span="4" class="Share-content-list-row-left">
							<p>1</p>
						</van-col>
						<van-col span="20" class="Share-content-list-row-right">
							<p>
								<font color="#ff5c54">复制</font>
								下面的二维码邀请码，作为验证账号的依据
							</p>
						</van-col>
					</van-row>
					<p class="Share-content-list-number">{{numer}}</p>
					<p class="Share-content-list-copy" v-clipboard:copy="numer" v-clipboard:success="onCopy" v-clipboard:error="onError">复制邀请码</p>
					<van-row class="Share-content-list-row" gutter="10">
						<van-col span="4" class="Share-content-list-row-left">
							<p>2</p>
						</van-col>
						<van-col span="20" class="Share-content-list-row-right">
							<p>
								长按下方的二维码，点击“
								<font color="#ff5c54">识别图中二维码</font>
								”
							</p>
						</van-col>
					</van-row>
					<div class="Share-content-list-code">
						<img src="../assets/Share/code.png" />
					</div>
					<p class="Share-content-list-imgcode">长按图片扫描二维码👆👆</p>
					<div class="Share-content-list-share1">
						<img src="../assets/Share/share1.png" style="width: 100%;" />
					</div>
					<van-row class="Share-content-list-row" gutter="10">
						<van-col span="4" class="Share-content-list-row-left">
							<p>3</p>
						</van-col>
						<van-col span="20" class="Share-content-list-row-right">
							<p>
								识别成功后，会跳转到“优企康”的公众号页面，点击屏幕中间的“
								<font color="#ff5c54">关注</font>
								”
							</p>
						</van-col>
					</van-row>
					<div class="Share-content-list-share1">
						<img src="../assets/Share/share2.png" style="width: 100%;" />
					</div>
					<van-row class="Share-content-list-row" gutter="10">
						<van-col span="4" class="Share-content-list-row-left">
							<p>4</p>
						</van-col>
						<van-col span="20" class="Share-content-list-row-right">
							<p>
								关注成功后，进入“优企康”的“
								<font color="#ff5c54">查看报告</font>
								”，进行账号认证
							</p>
						</van-col>
					</van-row>
					<div class="Share-content-list-share1">
						<img src="../assets/Share/share3.png" style="width: 100%;" />
					</div>
					<van-row class="Share-content-list-row" gutter="10">
						<van-col span="4" class="Share-content-list-row-left">
							<p>5</p>
						</van-col>
						<van-col span="20" class="Share-content-list-row-right">
							<p>
								初次进入“查看报告”，需进行账号认证，请在邀请码输入框中粘贴复制好的“
								<font color="#ff5c54">邀请码</font>
								”，并填写您的姓名、手机号、验证码作为认证的数据！
							</p>
						</van-col>
					</van-row>
					<div class="Share-content-list-share1">
						<img src="../assets/Share/share4.png" style="width: 100%;" />
					</div>
					<p class="Share-content-list-success">认证完成后，即查看相关企业的诊断报告！</p>
				</div>
			</div>
			<div style="height: 2rem;"></div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				numer: this.$route.query.code,
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
			}
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.Share {
		background-color: rgb(90, 146, 255);
		&-content {
			box-shadow: rgba(255, 255, 255, 0.3) 0px 4px 10px 0px;
			border-radius: 10px;
			background: white;
			width: 78%;
			margin: 0 auto;
			z-index: 9;
			position: relative;
			margin-top: 3rem;
			padding: 1.5rem 1rem;
			&-list {
				&-code {
					text-align: center;
					padding: 1.4rem 0;
					& img {
						width: 163px;
					}
				}
				&-imgcode {
					color: rgb(0, 141, 255);
					font-size: .9rem;
					text-align: center;
					margin-bottom: 1.4rem;
				}
				&-share1{
					margin: 1rem 0;
				}
				&-success{
					color: rgb(255, 92, 84);
					font-size: .9rem;
					text-align: center;
				}
				&-row {
					&-left {
						& p {
							padding: 0.07rem 0;
							text-align: center;
							background-image: url(../assets/Share/number_bg.png);
							background-size: cover;
							color: #FFFFFF;
							font-size: .8rem;
						}
					}
				}
				&-number {
					text-align: center;
					padding: 2rem;
					color: rgb(255, 92, 84);
					font-size: 60px;
					font-weight: bold;
				}
				&-copy {
					color: rgb(0, 141, 255);
					text-align: center;
					font-size: .8rem;
					text-decoration: underline;
					margin-bottom: 2rem;
				}
			}
			&-title {
				text-align: center;
				margin-bottom: 1rem;
				&-bubble1 {
					display: inline-block;
					width: 10px;
					height: 10px;
					background-color: rgba(0, 141, 255, .3);
					border-radius: 50%;
					margin: 0 .4rem;
				}
				&-bubble2 {
					display: inline-block;
					width: 10px;
					height: 10px;
					background-color: rgb(0, 141, 255);
					border-radius: 50%;
					margin: 0 .4rem;
				}
				&-span {
					color: rgb(255, 255, 255);
					background-color: rgb(0, 141, 255);
					border-radius: 30px;
					display: inline-block;
					padding: .3rem 1.3rem;
				}
			}
		}
		&-title {
			position: relative;
			&-bg {
				background-image: url(../assets/ShareReport_Bg.png);
				background-size: cover;
				padding: 1rem 1rem 2rem 1rem;
				&-logo {
					& img {
						height: 17px;
					}
				}
				&-show {
					text-align: center;
					& img {
						width: 70%;
					}
				}
			}
			&-share_bg1 {
				width: 90%;
				position: absolute;
				left: 5%;
				bottom: -50px;
			}
			&-pe {
				width: 138px;
				position: absolute;
				left: calc(50% - 70px);
				top: 7.6rem;
			}
		}
	}
</style>