<template>
	<div>
		<div class="ReportDetail-flow">
			<div class="ReportDetail-Nextquestion">
				<p class="ReportDetail-Nextquestion-one">分析结论</p>
				<p class="ReportDetail-Nextquestion-two">
					诊断结果本问题严重性：
					<font color="#FF2D35" v-if="PlanDepartQuestionsData.data.conclusion_status == '严重'">严重</font>
					<font color="#FF9800" v-if="PlanDepartQuestionsData.data.conclusion_status == '偏高'">偏高</font>
					<font color="#FFCC44" v-if="PlanDepartQuestionsData.data.conclusion_status == '中等'">中等</font>
					<font color="#42B0FF" v-if="PlanDepartQuestionsData.data.conclusion_status == '一般'">一般</font>
					<font color="#09BB07" v-if="PlanDepartQuestionsData.data.conclusion_status == '合格'">合格</font>
				</p>
				<p class="ReportDetail-Nextquestion-content" v-html="PlanDepartQuestionsData.data.conclusion"></p>
				<van-row class="ReportDetail-Nextquestion-row">
					<van-col span="20" class="ReportDetail-Nextquestion-row-col">
						<van-icon name="ic_watch_later" color="rgb(154, 157, 181)" class="ReportDetail-Nextquestion-row-col-icon" />
						<span class="ReportDetail-Nextquestion-row-col-span">最近编辑：{{PlanDepartQuestionsData.data.conclusion_at}}</span>
						<font color="#e51c23" v-if="PlanDepartQuestionsData.data.status && is_audit != 'true'"> · {{PlanDepartQuestionsData.data.status}}</font>
					</van-col>
					<van-col span="4" class="ReportDetail-Nextquestion-row-col right_text" @click.native="EditConclusion" v-if="is_audit != 'true'">
						<van-icon name="pencil" color="rgb(154, 157, 181)" class="ReportDetail-Nextquestion-row-col-icon" />
						<span class="ReportDetail-Nextquestion-row-col-span">编辑</span>
					</van-col>
				</van-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { getCookie, setCookie } from '../utils'
	export default {
		components: {
			
		},
		data() {
			return {
				title: this.$route.meta.title,
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
			EditConclusion() {
				this.$router.push({
					name: 'EditConclusion',
					params: {
						id: this.$route.params.id
					}
				})
			}
		},
		mounted() {

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
		&-Image {
			margin-top: 1rem;
			&-uploader {
				width: 100%;
			}
			&-list {
				&-row {
					&-col {
						position: relative;
						background-color: rgb(255, 255, 255);
						box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
						border-radius: 6px;
						margin-bottom: .5rem;
						margin-right: .8rem;
						& img {
							width: 100%;
							border-radius: 6px;
							display: -webkit-box;
						}
						&-icon {
							position: absolute;
							top: -10px;
							right: -8px;
							font-size: 20px;
						}
					}
				}
			}
			&-add {
				background-color: rgb(255, 255, 255);
				border: 1px solid rgb(240, 240, 242);
				box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
				border-radius: 6px;
				padding: 1.2rem 0;
				text-align: center;
				&-icon {
					font-size: 32px;
				}
				&-p1 {
					color: rgb(176, 176, 176);
					font-size: .8rem;
					margin-top: .3rem;
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