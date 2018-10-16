<template>
	<div v-title :data-title="title" v-loading="loading">
		<vue-html5-editor class="AddQuestion-editor" :content="FormData.content" :height="height" :style="{width:'100%'}" @change="updateData"></vue-html5-editor>
		<van-icon name="icon-paizhao" color="#333" class="AddQuestion-paizhao" @click="chooseImage" v-if="show1" />
		<button class="AddQuestion-button" v-if="show1" @click="Refer">提交</button>
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
				id: this.$route.params.id,
				FormData: {
					content: '',
					id: this.$route.params.id
				},
				width: 0,
				height: 200,
				screenHeight: document.body.clientHeight,
				originHeight: document.body.clientHeight,
				show1: true,
				loading: false
			}
		},
		computed: {
			...mapState([
				'PlanDepartQuestionsData',
				'ReportDetailActive'
			])
		},
		methods: {
			...mapActions([
				'getPlanDepartQuestions'
			]),
			updateData(e = '') {
				let c1 = e.replace(/<img width="100%"/g, '<img')
				let c2 = c1.replace(/<img/g, '<img width="100%"')
				this.FormData.content = c2
			},
			async Refer() {
				if(this.FormData.content == '') {
					this.$toast({
						message: '请输入现场确认',
						duration: 1000
					})
					return false
				}
				const data = await api.patchPlanDepartQuestionsConfirm(this.FormData.content, this.FormData.id)
				await this.$toast({
					message: data.msg,
					duration: 1000
				})
				this.ReportDetailActive[this.id].active = 2
				this.$router.go(-1)
			},
			async getData() {
				if(this.$route.name == 'EditField') {
					if(this.PlanDepartQuestionsData.id != this.$route.params.id) {
						this.loading = true
					}
					await this.getPlanDepartQuestions(this.$route.params.id)
					this.FormData.content = this.PlanDepartQuestionsData.data.confirm_text
					this.loading = false
				}
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
						const img = `<img src="${data.url}" width="100%"/>`
						this.FormData.content = this.FormData.content + img
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
			let w = document.documentElement.clientWidth
			let h = document.documentElement.clientHeight
			this.width = (w - 10) + 'px'
			this.height = h - 38
			window.onresize = () => {
				return(() => {
					window.screenHeight = document.body.clientHeight
					this.screenHeight = window.screenHeight
				})()
			}
			const html5 = document.querySelector('.vue-html5-editor .content')
			html5.setAttribute('placeholder', '问题记录，支持图片插入')
			this.getData()
		},
		watch: {
			screenHeight(val) {
				if(this.originHeight != val) {
					this.show1 = false
				} else {
					this.show1 = true
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.AddQuestion {
		&-editor {
			border: none;
			border-radius: 0;
		}
		&-button {
			background: none;
			border: none;
			color: rgb(0, 138, 255);
			position: absolute;
			bottom: .5rem;
			z-index: 10000;
			right: 1rem;
			font-weight: bold;
		}
		&-paizhao {
			position: absolute;
			bottom: 0.8rem;
			z-index: 10000;
			left: 9.5rem;
			font-size: 20px;
		}
	}
</style>