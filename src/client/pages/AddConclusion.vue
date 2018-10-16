<template>
	<div v-title :data-title="title">
		<van-cell-group>
			<van-cell-group>
				<van-row class="AddConclusion-row">
					<van-col span="12" class="AddConclusion-row-col">
						<span>选择问题严重性：</span>
					</van-col>
					<van-col span="12">
						<el-select v-model="FormData.severity" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</van-col>
				</van-row>
			</van-cell-group>
		</van-cell-group>
		<vue-html5-editor class="AddQuestion-editor" :content="FormData.content" :height="height" :style="{width:'100%'}" @change="updateData"></vue-html5-editor>
		<button class="AddQuestion-button" v-if="show1" @click="Refer">提交审核</button>
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
				id: this.$route.params.id,
				FormData: {
					severity: '',
					content: '',
					id: this.$route.params.id
				},
				severity: '',
				content: '',
				width: 0,
				height: 200,
				screenHeight: document.body.clientHeight,
				originHeight: document.body.clientHeight,
				show1: true,
				options: [{
					value: '严重',
					label: '严重'
				}, {
					value: '偏高',
					label: '偏高'
				}, {
					value: '中等',
					label: '中等'
				}, {
					value: '一般',
					label: '一般'
				}, {
					value: '合格',
					label: '合格'
				}]
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
				if(this.FormData.severity == '') {
					this.$toast({
						message: '请选择问题严重性',
						duration: 1000
					})
					return false
				}
				const data = await api.patchPlanDepartQuestionsConclusion(this.FormData)
				await this.$toast({
					message: data.msg,
					duration: 1000
				})
				this.ReportDetailActive[this.id].active = 3
				this.$router.go(-1)
			},
			async getData() {
				if(this.$route.name == 'EditConclusion') {
					if(this.PlanDepartQuestionsData.id != this.$route.params.id) {
						this.loading = true
					}
					await this.getPlanDepartQuestions(this.$route.params.id)
					this.FormData.content = this.PlanDepartQuestionsData.data.conclusion
					this.FormData.severity = this.PlanDepartQuestionsData.data.conclusion_status
					this.loading = false
				}
			}
		},
		mounted() {
			let w = document.documentElement.clientWidth
			let h = document.documentElement.clientHeight
			this.width = (w - 10) + 'px'
			this.height = h - 98
			window.onresize = () => {
				return(() => {
					window.screenHeight = document.body.clientHeight
					this.screenHeight = window.screenHeight
				})()
			}
			const html5 = document.querySelector('.vue-html5-editor .content')
			html5.setAttribute('placeholder', '输入结论，支持图片插入')
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
	}
	.AddConclusion{
		&-row{
			padding: .6rem 1rem;
			&-col{
				line-height: 2.6rem;
			}
		}
	}
</style>