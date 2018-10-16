<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="ReportDetail" v-if="ReportDetailActive[id]">
			<p class="ReportDetail-title">{{PlanDepartQuestionsData.data.name}}</p>
			<van-row class="ReportDetail-title-row">
				<van-col span="8" class="ReportDetail-title-row-col">
					<span>所属部门：{{PlanDepartQuestionsData.data.plan_depart}}</span>
				</van-col>
				<van-col span="8" class="ReportDetail-title-row-col">
					<span v-if="is_active == 1">执行顾问：{{PlanDepartQuestionsData.data.client_answer_editer}}</span>
					<span v-if="is_active == 2">执行顾问：{{PlanDepartQuestionsData.data.confirm_editer}}</span>
					<span v-if="is_active == 3">执行顾问：{{PlanDepartQuestionsData.data.conclusion_editer}}</span>
				</van-col>
				<van-col span="8" class="ReportDetail-title-row-col">
					<span>审核人：{{PlanDepartQuestionsData.data.auditer}}</span>
				</van-col>
			</van-row>
			<img v-if="PlanDepartQuestionsData.data.status == '审核成功'" src="../assets/Checked.png" class="ReportDetail-Checked" />
			<img v-if="PlanDepartQuestionsData.data.status == '审核中'" src="../assets/Audit.png" class="ReportDetail-Checked" />
			<img v-if="PlanDepartQuestionsData.data.status == '已驳回'" src="../assets/Dismissal.png" class="ReportDetail-Checked" />
			<van-row class="ReportDetail-tabs" gutter="20">
				<van-col class="ReportDetail-tabs-col" span="8" v-for="item,index in menu" :key="index" @click.native="click_active(item.id)">
					<div :class="item.id == is_active ? 'ReportDetail-tabs-col-btn is_tabs_active' : 'ReportDetail-tabs-col-btn'">
						<span>{{item.name}}</span>
					</div>
				</van-col>
			</van-row>
			<report-detail-process v-if="is_active == 1"></report-detail-process>
			<report-detail-field v-if="is_active == 2"></report-detail-field>
			<report-detail-final v-if="is_active == 3"></report-detail-final>
		</div>
		<div style="height: 5rem;"></div>
		<menu-ref></menu-ref>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import ReportDetailProcess from './ReportDetailProcess' // 调查过程
	import ReportDetailField from './ReportDetailField' // 现场确认
	import ReportDetailFinal from './ReportDetailFinal' // 最终结论
	import MenuRef from './../components/ReportDetail/menu' // 返回
	export default {
		components: {
			MenuRef,
			ReportDetailProcess,
			ReportDetailField,
			ReportDetailFinal
		},
		data() {
			return {
				title: this.$route.meta.title,
				id: this.$route.params.id,
				is_active: null,
				loading: false,
				menu: [{
					id: 1,
					name: '调查过程'
				}, {
					id: 2,
					name: '现场确认'
				}, {
					id: 3,
					name: '最终结论'
				}]
			}
		},
		computed: {
			...mapState([
				'PlanDepartQuestionsData'
			]),
			ReportDetailActive() {
				return this.$store.state.ReportDetailActive
			}
		},
		methods: {
			...mapActions([
				'getPlanDepartQuestions'
			]),
			async getData() {
				if(this.PlanDepartQuestionsData.id != this.$route.params.id) {
					this.loading = true
				}
				if(!this.ReportDetailActive[this.id]) {
					this.ReportDetailActive[this.id] = {
						active: 1
					}
				}
				this.is_active = this.ReportDetailActive[this.id].active
				await this.getPlanDepartQuestions(this.$route.params.id)
				this.loading = false
			},
			click_active(id) {
				if(id == 1){
					this.$store.state.ReportDetailActive[this.id].active = id
					this.is_active = this.ReportDetailActive[this.id].active
				}
				if(id == 2){
					if(!this.PlanDepartQuestionsData.data.client_answer){
						return false
					}else{
						if(!this.PlanDepartQuestionsData.data.confirm_at){
							this.$router.push({
								name: 'AddField',
								params: {
									id: this.$route.params.id
								}
							})
						}else{
							this.$store.state.ReportDetailActive[this.id].active = id
							this.is_active = this.ReportDetailActive[this.id].active
						}
					}
				}
				if(id == 3){
					if(!this.PlanDepartQuestionsData.data.confirm_at){
						return false
					}else{
						if(!this.PlanDepartQuestionsData.data.conclusion_at){
							this.$router.push({
								name: 'AddConclusion',
								params: {
									id: this.$route.params.id
								}
							})
						}else{
							this.$store.state.ReportDetailActive[this.id].active = id
							this.is_active = this.ReportDetailActive[this.id].active
						}
					}
				}
				
			}
		},
		mounted() {
			this.getData()
		},
		watch: {
			ReportDetailActive(value) {
				console.log(value)
			}
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
						& img {
							width: 100%;
							border-radius: 6px;
						}
						&-icon {
							position: absolute;
							top: 0px;
							right: -8px;
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