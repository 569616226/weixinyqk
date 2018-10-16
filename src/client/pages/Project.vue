<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="Project">
			<p class="Project-title">{{OrdersDetailData.data.name}}</p>
			<p class="Project-time">项目开始时间：{{OrdersDetailData.data.start_at}}</p>
			<div class="Project-progress" v-if="OrdersDetailData.data.plan">
				<div v-if="is_audit == 'false'">
					<div class="Project-progress-div">
						<div class="Project-progress-p1">
							<span>我的完成情况</span>
							<p class="Project-progress-div-p2">
								<span class="Project-progress-div-p2-yellow"></span>
								<span class="Project-progress-div-p2-left">审核中</span>
								<span class="Project-progress-div-p2-green"></span>
								<span>已完成</span>
							</p>
						</div>
					</div>
					<div class="Project-progressContainer" v-for="item,index in OrdersDetailData.data.plan.data.plan_departs.data" :key="index">
						<div v-if="item.auditings > 0" class="Project-progressContainer-progress_yellow" :style="{width: (item.auditings / (item.complates + item.auditings) * 100) + '%'}">
							<span>{{item.auditings}}</span>
						</div>
						<div v-if="item.complates > 0" class="Project-progressContainer-progress_green" :style="{width: (item.complates / (item.complates + item.auditings) * 100) + '%'}">
							<span>{{item.complates}}</span>
						</div>
						<p class="Project-progressContainer-p1">{{item.name}}</p>
					</div>
				</div>
				<div v-else>
					<p class="Project-progress-p1">完成情况</p>
					<div class="Project-progressContainer" v-for="item,index in OrdersDetailData.data.plan.data.plan_departs.data" :key="index">
						<div v-if="item.complates / item.all_counts * 100 <= 35" class="Project-progressContainer-progress_red" :style="{width: (item.complates / item.all_counts * 100) + '%'}"></div>
						<div v-if="item.complates / item.all_counts * 100 > 35 && item.complates / item.all_counts * 100 <=75" class="Project-progressContainer-progress_blue" :style="{width: (item.complates / item.all_counts * 100) + '%'}"></div>
						<div v-if="item.complates / item.all_counts * 100 > 75 && item.complates / item.all_counts * 100 <=100" class="Project-progressContainer-progress_green" :style="{width: (item.complates / item.all_counts * 100) + '%'}"></div>
						<p class="Project-progressContainer-p1">{{item.name}}</p>
						<p class="Project-progressContainer-p2">{{item.complates}}/{{item.all_counts}}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="OrdersDetailData.data.plan">
			<button @click="Reporting" :class="OrdersDetailData.data.plan.data.is_finish ? 'Project-button' : 'Project-button gray_bg'" v-if="is_audit == 'true'">
				<span>生成报告</span>
			</button>
			<button @click="ShowReport(OrdersDetailData.data.report_id)" class="Project-button blue_bg" v-if="OrdersDetailData.data.report_id">
				<span>查看报告</span>
			</button>
		</div>
		<div style="height: 6rem;"></div>
		<fill-footer :active="active" :id="id"></fill-footer>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { getCookie, setCookie } from '../utils'
	import api from '../utils/api'
	import FillFooter from './../components/common/FillFooter' //底部导航
	export default {
		components: {
			FillFooter
		},
		data() {
			return {
				title: this.$route.meta.title,
				active: 1,
				id: this.$route.params.id,
				loading: false,
				is_audit: getCookie('is_audit'),
			}
		},
		computed: {
			...mapState([
				'OrdersDetailData'
			])
		},
		methods: {
			...mapActions([
				'getOrdersDetail'
			]),
			async getData() {
				if(this.OrdersDetailData.id != this.$route.params.id) {
					this.loading = true
				}
				await this.getOrdersDetail(this.$route.params.id)
				this.loading = false
			},
			async Reporting() {
				if(this.OrdersDetailData.data.plan.data.is_finish) {
					this.$dialog.confirm({
						title: '提醒',
						message: '真的要发布报告吗？',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(async() => {
						const data = await api.postOrdersCreateReports(this.$route.params.id)
						this.$toast({
							message: data.msg,
							duration: 1000
						})
						await this.getOrdersDetail(this.$route.params.id)
					}).catch(() => {

					})
				} else {
					this.$toast({
						message: '报告尚未完成',
						duration: 1000
					})
				}
			},
			ShowReport(id) {
				this.$router.push({
					name: 'ReportIndex',
					params: {
						id: id
					}
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.Project {
		padding: 2rem 1rem 0 1rem;
		&-progressContainer {
			background-color: rgb(217, 228, 235);
			position: relative;
			margin: 0 2%;
			font-size: .7rem;
			margin-top: 2rem;
			display: flex;
			height: 20px;
			&-progress_red {
				background-color: rgb(251, 86, 101);
				height: 20px;
				line-height: 20px;
			}
			&-progress_blue {
				background-color: rgb(37, 147, 252);
				height: 20px;
				line-height: 20px;
			}
			&-progress_green {
				background-color: rgb(37, 204, 74);
				height: 20px;
				line-height: 20px;
				text-align: center;
				color: #FFFFFF;
			}
			&-progress_yellow {
				background-color: rgb(255, 152, 0);
				height: 20px;
				line-height: 20px;
				text-align: center;
				color: #FFFFFF;
			}
			&-p1 {
				position: absolute;
				top: -20px;
				left: 0;
			}
			&-p2 {
				position: absolute;
				top: -20px;
				right: 0;
			}
		}
		&-title {
			font-size: 1.7rem;
			font-weight: bold;
		}
		&-time {
			color: rgb(142, 143, 147);
			font-size: .8rem;
			margin-top: 1rem;
		}
		&-progress {
			margin-top: 2rem;
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			padding: 1.5rem 1rem;
			&-p1 {
				margin-bottom: 2.5rem;
				color: rgb(0, 0, 0);
				font-size: .9rem;
			}
			&-div {
				&-p2 {
					float: right;
					&-yellow {
						width: 8px;
						height: 8px;
						background-color: rgb(255, 152, 0);
						display: inline-block;
					}
					&-green {
						width: 8px;
						height: 8px;
						background-color: rgb(31, 178, 26);
						display: inline-block;
					}
					&-left {
						margin-right: .5rem;
					}
				}
			}
		}
		&-button {
			color: rgb(255, 255, 255);
			background-color: rgb(251, 86, 101);
			box-shadow: rgba(251, 86, 101, 0.4) 0px 6px 10px 0px;
			border-radius: 6px;
			font-size: .9rem;
			border: 1px solid transparent;
			width: calc(100% - 2rem);
			margin: 0 auto;
			display: block;
			margin-top: 2rem;
			padding: 1rem;
		}
	}
	
	.gray_bg {
		background-color: #A5ACB3;
		box-shadow: rgba(165, 172, 179, 0.4) 0px 6px 10px 0px;
	}
	
	.blue_bg {
		background-color: rgb(62, 155, 255);
		box-shadow: rgba(62, 155, 255, 0.4) 0px 6px 10px 0px;
	}
</style>