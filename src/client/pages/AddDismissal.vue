<template>
	<div v-title :data-title="title">
		<vue-html5-editor class="AddQuestion-editor" :content="FormData.content" :height="height" :style="{width:'100%'}" @change="updateData"></vue-html5-editor>
		<button class="AddQuestion-button" v-if="show1" @click="Refer">提交</button>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				FormData: {
					status: '已驳回',
					content: '',
					id: this.$route.params.id
				},
				width: 0,
				height: 200,
				screenHeight: document.body.clientHeight,
				originHeight: document.body.clientHeight,
				show1: true
			}
		},
		computed: {
			...mapState([
				'AuditListActive'
			])
		},
		methods: {
			...mapActions([

			]),
			updateData(e = '') {
				let c1 = e.replace(/<img width="100%"/g, '<img')
				let c2 = c1.replace(/<img/g, '<img width="100%"')
				this.FormData.content = c2
			},
			async Refer() {
				if(this.FormData.content == '') {
					this.$toast({
						message: '请输入原因',
						duration: 1000
					})
					return false
				}
				const data = await api.patchPlanDepartQuestionsAudit(this.FormData)
				await this.$toast({
					message: data.msg,
					duration: 1000
				})
				this.AuditListActive.active = 2
				this.$router.go(-1)
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
	}
</style>