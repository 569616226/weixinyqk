<template>
	<div v-loading="loading">
		<div class="ReportDetail-flow">
			<p class="ReportDetail-flow-title">
				<van-icon name="ic_group_work" color="rgb(159, 165, 184)" class="ReportDetail-flow-title-icon" />
				<span class="ReportDetail-flow-title-p2">调查流程</span>
			</p>
			<div class="ReportDetail-steps">
				<van-row class="ReportDetail-steps-row" v-if="PlanDepartQuestionsData.data.question_details">
					<van-col span="8" class="ReportDetail-steps-row-col is_steps_active">
						<span class="ReportDetail-steps-row-col-bubble"></span>
						<p class="ReportDetail-steps-row-col-p1">提问/调查问题</p>
					</van-col>
					<van-col span="8" :class="PlanDepartQuestionsData.data.question_details.data.length > 0 ? 'ReportDetail-steps-row-col is_steps_active' : 'ReportDetail-steps-row-col'">
						<span class="ReportDetail-steps-row-col-bubble"></span>
						<p class="ReportDetail-steps-row-col-p1">进一步提问</p>
					</van-col>
					<van-col span="8" :class="PlanDepartQuestionsData.data.more_files ? 'ReportDetail-steps-row-col is_steps_active' : 'ReportDetail-steps-row-col'">
						<span class="ReportDetail-steps-row-col-bubble"></span>
						<p class="ReportDetail-steps-row-col-p1">补充材料</p>
					</van-col>
					<div class="ReportDetail-steps-row-line"></div>
				</van-row>
			</div>
		</div>
		<div class="ReportDetail-flow">
			<p class="ReportDetail-flow-title">
				<van-icon name="ic_help" color="rgb(159, 165, 184)" class="ReportDetail-flow-title-icon" />
				<span class="ReportDetail-flow-title-p2">提问/调查问题</span>
			</p>
			<div class="ReportDetail-question">
				<p class="ReportDetail-question-title">
					根据实际情况请选择工厂是否回复
				</p>
				<p class="ReportDetail-question-xun">
					询问 {{PlanDepartQuestionsData.data.name}}
				</p>
				<van-row class="ReportDetail-question-row" v-if="PlanDepartQuestionsData.data.answers">
					<van-col span="12" class="ReportDetail-question-row-col line_right" v-if="!PlanDepartQuestionsData.data.client_answer" @click.native="dialog(PlanDepartQuestionsData.data.answers[0], $route.params.id)">
						<span>{{PlanDepartQuestionsData.data.answers[0]}}</span>
					</van-col>
					<van-col span="12" class="ReportDetail-question-row-col" v-if="!PlanDepartQuestionsData.data.client_answer" @click.native="dialog(PlanDepartQuestionsData.data.answers[1], $route.params.id)">
						<span>{{PlanDepartQuestionsData.data.answers[1]}}</span>
					</van-col>
					<van-col span="24" class="ReportDetail-question-row-col-success" v-if="PlanDepartQuestionsData.data.client_answer">
						<span>客户回复“{{PlanDepartQuestionsData.data.client_answer}}”</span>
					</van-col>
				</van-row>
			</div>
		</div>
		<div class="ReportDetail-flow" v-if="PlanDepartQuestionsData.data.client_answer">
			<p class="ReportDetail-flow-title">
				<van-icon name="ic_help" color="rgb(159, 165, 184)" class="ReportDetail-flow-title-icon" />
				<span class="ReportDetail-flow-title-p2">进一步提问</span>
			</p>
			<div v-if="PlanDepartQuestionsData.data.question_details">
				<div class="ReportDetail-Nextquestion" v-for="item,index in PlanDepartQuestionsData.data.question_details.data" :key="index">
					<p class="ReportDetail-Nextquestion-title">
						{{item.question}}
					</p>
					<p class="ReportDetail-Nextquestion-content" v-html="item.answer">
						目前仓库部门的一共20人。其中5名是工作5年以上的老员工，10名是工作1-5年的员工，其余5名是最近新来的员工。
					</p>
					<van-row class="ReportDetail-Nextquestion-row">
						<van-col span="16" class="ReportDetail-Nextquestion-row-col">
							<van-icon name="ic_watch_later" color="rgb(154, 157, 181)" class="ReportDetail-Nextquestion-row-col-icon" />
							<span class="ReportDetail-Nextquestion-row-col-span">最近编辑：{{item.updated_at}}</span>
						</van-col>
						<van-col span="4" class="ReportDetail-Nextquestion-row-col right_text" @click.native="DeleteQuestion(item.id)" v-if="is_audit != 'true'">
							<van-icon name="delete2" color="rgb(154, 157, 181)" class="ReportDetail-Nextquestion-row-col-icon" />
							<span class="ReportDetail-Nextquestion-row-col-span">删除</span>
						</van-col>
						<van-col span="4" class="ReportDetail-Nextquestion-row-col right_text" @click.native="$router.push({name: 'EditQuestion', params: {id: item.id}})" v-if="is_audit != 'true'">
							<van-icon name="pencil" color="rgb(154, 157, 181)" class="ReportDetail-Nextquestion-row-col-icon" />
							<span class="ReportDetail-Nextquestion-row-col-span">编辑</span>
						</van-col>
					</van-row>
				</div>
			</div>
			<button @click="addQue" class="ReportDetail-button" v-if="is_audit != 'true'">
				<span>添加提问记录</span>
			</button>
		</div>
		<div class="ReportDetail-flow" v-if="PlanDepartQuestionsData.data.client_answer">
			<p class="ReportDetail-flow-title">
				<van-icon name="ic_dns" color="rgb(159, 165, 184)" class="ReportDetail-flow-title-icon" />
				<span class="ReportDetail-flow-title-p2">补充材料</span>
			</p>
			<div class="ReportDetail-Image">
				<div class="ReportDetail-Image-list">
					<div class="ReportDetail-Image-list-row">
						<div class="ReportDetail-Image-list-row-col" v-for="item,index in PlanDepartQuestionsData.data.more_files" :key="index" >
							<img :src="item" @click="ImagePreview(item)" />
							<van-icon name="ic_cancel" color="rgb(255, 84, 90)" class="ReportDetail-Image-list-row-col-icon" @click="DeleteImg(index)" v-if="is_audit != 'true'" />
						</div>
						<div class="ReportDetail-Image-list-row-col" @click="chooseImage" v-if="is_audit != 'true'">
							<div class="ReportDetail-Image-add-uploader">
								<van-icon name="ic_add" color="rgb(161, 165, 170)" class="ReportDetail-Image-add-icon" />
								<p class="ReportDetail-Image-add-p1">添加材料</p>
								<!--<input type="file" accept="image/*" name="img_url" class="ReportDetail-Image-add-uploader-input">-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ReportDetail-Dismissal" v-if="PlanDepartQuestionsData.data.status == '已驳回'">
			<van-row class="ReportDetail-Dismissal-row">
				<van-col span="15" class="ReportDetail-Dismissal-row-left">
					<p>报告已驳回</p>
				</van-col>
				<van-col span="9" class="ReportDetail-Dismissal-row-right" @click.native="show = true">
					<p>查看原因</p>
				</van-col>
			</van-row>
		</div>
		<van-popup v-model="show" class="ReportDetail-vanpopup">
			<div class="ReportDetail-Dismissal-popup">
				<van-icon name="close2" color="#444" class="ReportDetail-Dismissal-popup-close" @click.native="show = false" />
				<p class="ReportDetail-Dismissal-popup-title">驳回原因</p>
				<p class="ReportDetail-Dismissal-popup-content" v-html="PlanDepartQuestionsData.data.audit_text"></p>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	import { getCookie, setCookie } from '../utils'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				show: false,
				loading: false,
				imgData: [],
				is_audit: getCookie('is_audit'),
			}
		},
		computed: {
			...mapState([
				'PlanDepartQuestionsData'
			])
		},
		methods: {
			...mapActions([
				'getPlanDepartQuestions'
			]),
			async DeleteImg(index) {
				this.$dialog.confirm({
					title: '提醒',
					message: '真的要删除吗？',
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(async() => {
					const data = await api.deletePlanDepartQuestionsFile(index, this.$route.params.id)
					this.$toast({
						message: data.msg,
						duration: 1000
					})
					await this.getPlanDepartQuestions(this.$route.params.id)
				}).catch(() => {

				})
			},
			addQue() {
				this.$router.push({
					name: 'AddQuestion',
					id: this.$route.params.id
				})
			},
			ImagePreview(url) {
				this.wechatObjData.wx.ready(() => {
					this.wechatObjData.wx.previewImage({
						current: url, // 当前显示图片的http链接
						urls: [url] // 需要预览的图片http链接列表
					})
				})
			},
			async getData() {
				const signature = await api.getSignature()
				const config = {
					appId: signature.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
					timestamp: signature.timestamp, // 必填，生成签名的时间戳
					nonceStr: signature.nonceStr, // 必填，生成签名的随机串
					signature: signature.signature, // 必填，签名，见附录1
					success: function(wechatObj) {

					},
					error: function(err, wechatObj) {
						console.log('err', err)
					},
					debug: false,
					jsApiList: ['chooseImage', 'getLocalImgData', 'previewImage']
				}
				const wechatObj = await new WechatJSSDK(config)
				this.wechatObjData = wechatObj
			},
			dialog(client_answer, id) {
				this.$dialog.confirm({
					title: '提醒',
					message: '是否选择此答案？',
					confirmButtonText: '确定',
					cancelButtonText: '点错了'
				}).then(async() => {
					const data = await api.patchPlanDepartQuestions(client_answer, id)
					this.$toast({
						message: data.msg,
						duration: 1000
					})
					await this.getPlanDepartQuestions(this.$route.params.id)
				}).catch(() => {

				})
			},
			DeleteQuestion(id) {
				this.$dialog.confirm({
					title: '提醒',
					message: '真的要删除吗？',
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(async() => {
					const data = await api.deleteQuestionDetails(id)
					this.$toast({
						message: data.msg,
						duration: 1000
					})
					await this.getPlanDepartQuestions(this.$route.params.id)
				}).catch(() => {

				})
			},
			chooseImage() {
				this.wechatObjData.wx.ready(() => {
					this.wechatObjData.wx.chooseImage({
						count: 9, // 默认9
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: async(res) => {
							const localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							await Promise.all(localIds.map(async(localId) => {
								await this.getLocalImgData(localId)
							}))
						}
					})
				})
			},
			getLocalImgData(localId) {
				this.wechatObjData.wx.getLocalImgData({
					localId: localId, // 图片的localID
					success: async(res) => {
						let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
						if(window.__wxjs_is_wkwebview) {
							localData = localData.replace('jgp', 'jpeg'); //iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
						} else {
							localData = 'data:image/jpeg;base64,' + localData.toString()
						}
						const bytes = this.convertBase64UrlToBlob(localData)
						let fd = new FormData()
						fd.append('image', bytes, Date.now() + '.jpg')
						const data = await api.postUploadImage(fd)
						const DataFile = await api.patchPlanDepartQuestionsFile(data.url, this.$route.params.id)
						this.$toast({
							message: DataFile.msg,
							duration: 1000
						})
						await this.getPlanDepartQuestions(this.$route.params.id)
					}
				})
			},
			convertBase64UrlToBlob(urlData) {
				const bytes = window.atob(urlData.split(',')[1])
				var array = [];
				for(var i = 0; i < bytes.length; i++) {
					array.push(bytes.charCodeAt(i));
				}
				var blob = new Blob([new Uint8Array(array)], {
					type: 'image/jpeg'
				});
				return blob
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.is_tabs_active {
		background-color: rgb(0, 141, 255) !important;
		color: rgb(255, 255, 255) !important;
		box-shadow: rgba(24, 144, 255, 0.4) 0px 4px 10px 0px;
	}
	
	.is_steps_active {
		color: rgb(85, 85, 85);
		& span {
			border: 3.5px solid rgb(0, 138, 255);
		}
	}
	
	.ReportDetail {
		padding: 2rem 1.3rem;
		position: relative;
		&-vanpopup {
			width: 93%;
			border-radius: 6px;
		}
		&-Dismissal {
			position: fixed;
			bottom: 0;
			width: 100%;
			left: 0;
			&-row {
				&-left {
					padding: 1rem 1.5rem;
					background: #ffffff;
				}
				&-right {
					padding: 1rem 0;
					text-align: center;
					color: #ffffff;
					background-color: rgb(0, 141, 255);
				}
			}
			&-popup {
				padding: 1rem;
				position: relative;
				&-close {
					position: absolute;
					top: 1rem;
					right: 1rem;
					font-size: 1.4rem;
				}
				&-title {
					font-size: 1.4rem;
					font-weight: bold;
					text-align: center;
					padding: 1rem 1.5rem;
				}
				&-content {
					& img {
						width: 100%;
					}
				}
			}
		}
		&-Checked {
			position: absolute;
			right: .1rem;
			top: .3rem;
			width: 5rem;
		}
		&-Image {
			margin-top: 1rem;
			&-list {
				&-row {
					column-count: 3;
					column-gap: 1em;
					&-col {
						position: relative;
						break-inside: avoid;
						padding-top: .7rem;
						padding-right: 0.4rem;
						& img {
							width: 100%;
							border-radius: 6px;
						}
						&-icon {
							position: absolute;
							top: 0px;
							right: 0px;
							font-size: 20px;
						}
					}
				}
			}
			&-add {
				&-uploader {
					height: 100px;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background-color: rgb(255, 255, 255);
					box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
					border-radius: 6px;
					&-input {
						height: 100%;
						overflow: hidden;
						z-index: 99;
						position: absolute;
						right: 0;
						top: 0;
						opacity: 0;
						filter: alpha(opacity=0);
						cursor: pointer;
						width: 100%;
					}
				}
				&-icon {
					font-size: 2rem;
				}
				&-p1 {
					color: rgb(176, 176, 176);
					font-size: .9rem;
				}
			}
		}
		&-button {
			color: rgb(255, 255, 255);
			background-color: rgb(0, 141, 255);
			box-shadow: rgba(62, 155, 255, 0.4) 0px 6px 10px 0px;
			border-radius: 6px;
			font-size: .9rem;
			border: 1px solid transparent;
			width: 100%;
			margin: 0 auto;
			display: block;
			margin-top: 1.4rem;
			padding: 1rem;
		}
		&-Nextquestion {
			margin-top: 1rem;
			padding: 1.3rem 1rem;
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			&-title {
				font-size: 1.1rem;
				font-weight: bold;
			}
			&-content {
				color: rgb(85, 85, 85);
				font-size: .9rem;
				padding: 1rem 0;
			}
			&-row {
				color: rgb(154, 157, 181);
				font-size: .7rem;
				&-col {
					&.right_text {
						text-align: right;
					}
				}
			}
		}
		&-question {
			margin-top: 1rem;
			padding: 1.3rem 0 0 0;
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			&-title {
				padding: 0 1rem;
				color: rgb(176, 176, 176);
				font-size: .7rem;
			}
			&-xun {
				padding: .7rem 1rem;
			}
			&-row {
				text-align: center;
				margin-top: 1.5rem;
				border-top: 1px solid rgb(240, 240, 242);
				&-col {
					padding: 1rem;
					&.line_right {
						border-right: 1px solid rgb(240, 240, 242);
					}
					&-success {
						padding: 1rem;
						color: rgb(0, 138, 255);
						font-size: .9rem;
					}
				}
			}
		}
		&-steps {
			margin-top: 2rem;
			text-align: center;
			color: rgb(176, 176, 176);
			font-size: .9rem;
			&-row {
				position: relative;
				&-line {
					height: 1px;
					width: calc(100% / 1.5);
					background: #bbb;
					position: absolute;
					top: 8.5px;
					z-index: -1;
					left: calc(100% / 6);
				}
				&-col {
					&-bubble {
						width: 5px;
						height: 5px;
						display: inline-block;
						border-radius: 50%;
						border: 3.5px solid rgb(164, 164, 164);
						background: #f8f8f8;
					}
					&-p1 {
						margin-top: .3rem;
					}
				}
			}
		}
		&-title {
			font-size: 1.1rem;
			font-weight: bold;
			&-row {
				color: rgb(142, 143, 147);
				font-size: .7rem;
				padding: 1rem 0;
			}
		}
		&-tabs {
			text-align: center;
			&-col {
				&-btn {
					color: rgb(159, 165, 184);
					background-color: rgb(243, 244, 247);
					border-radius: 6px;
					padding: 10px 0;
					& span {
						font-size: .9rem;
					}
				}
			}
		}
		&-flow {
			margin-top: 2.2rem;
			&-title {
				color: rgb(159, 165, 184);
				font-size: .9rem;
			}
		}
	}
</style>
<style>
	.van-dialog__message--has-title {
		text-align: center;
		color: rgb(85, 85, 85) !important;
	}
	
	.van-dialog__confirm,
	.van-dialog__confirm:active {
		color: rgb(3, 155, 229) !important;
	}
</style>