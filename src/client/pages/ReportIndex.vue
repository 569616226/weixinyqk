<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="ReportIndex">
			<div class="ReportIndex-title">
				<van-row class="ReportIndex-title-row">
					<van-col span="4" class="ReportIndex-title-row-left">
						<img :src="ReportsDetailData.data.company_logo" />
					</van-col>
					<van-col span="20" class="ReportIndex-title-row-right">
						<p class="ReportIndex-title-row-right-title">{{ReportsDetailData.data.name}}</p>
						<p class="ReportIndex-title-row-right-time">报告生成时间：{{ReportsDetailData.data.created_at}}</p>
					</van-col>
				</van-row>
				<div class="ReportIndex-title-b" v-if="is_client_admin == 'true'">
					<van-row class="ReportIndex-title-b-row">
						<van-col span="12" class="ReportIndex-title-b-row-left" @click.native="$toast('敬请期待')">
							<van-icon name="clouddownload" color="rgb(0, 141, 255)" />
							<span>下载报告</span>
						</van-col>
						<van-col span="12" class="ReportIndex-title-b-row-right" @click.native="$router.push({name: 'ShareDepart',params: {id: $route.params.id}})">
							<van-icon name="sharevariant" color="rgb(0, 141, 255)" />
							<span>分享报告</span>
						</van-col>
					</van-row>
				</div>
			</div>
			<div class="ReportIndex-bubble" v-if="is_client_admin == 'true'">
				<p class="ReportIndex-bubble-title">
					<span class="ReportIndex-bubble-title-block1"></span>
					<span class="ReportIndex-bubble-title-block2"></span>
					<span>风险概览</span>
					<span class="ReportIndex-bubble-title-block2"></span>
					<span class="ReportIndex-bubble-title-block1"></span>
				</p>
				<bubble></bubble>
			</div>
			<div class="ReportIndex-risk">
				<p class="ReportIndex-risk-title">风险类别说明</p>
				<div class="ReportIndex-risk-list" v-if="ReportsDetailData.data.report_departs">
					<div class="ReportIndex-risk-list-m" v-for="item,index in ReportsDetailData.data.report_departs.data" :key="index" :ref="item.id" v-if="item.error_counts != 0">
						<div class="ReportIndex-risk-list-m-title" @click="CheckRisk(item.id)">
							<van-row class="ReportIndex-risk-list-m-title-row">
								<van-col span="5" class="ReportIndex-risk-list-m-title-row-left">
									<img :src="item.icon" />
								</van-col>
								<van-col span="13" class="ReportIndex-risk-list-m-title-row-middle">
									<p class="ReportIndex-risk-list-m-title-row-middle-p1">{{item.name}}</p>
									<p class="ReportIndex-risk-list-m-title-row-middle-p2">发现异常问题总数</p>
								</van-col>
								<van-col span="6" class="ReportIndex-risk-list-m-title-row-right">
									<span>{{item.error_counts}}</span>
									<van-icon name="07jiantouxiangxia" color="rgb(189, 189, 189)" />
								</van-col>
							</van-row>
						</div>
						<div class="ReportIndex-risk-list-m-pie" v-if="ChartShow == item.id">
							<p class="ReportIndex-risk-list-m-pie-title">物流部门异常问题统计</p>
							<pie-chart :id="item.id" :data="item.type"></pie-chart>
							<p class="ReportIndex-risk-list-m-pie-show" @click="$router.push({name: 'DepartDetailSum', params: {id: item.id}})">查看该部门详情报告</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ReportList" @click="DepartShow = true">
			<van-icon name="menu" color="#FFFFFF" class="ReportList-icon" />
			<span>部门</span>
		</div>
		<transition name="fade">
			<div class="ReportList-depart" v-if="DepartShow">
				<div class="ReportList-depart-w" @click="DepartShow = false"></div>
				<div class="ReportList-depart-l">
					<div class="ReportList-depart-l-list">
						<van-row class="ReportList-depart-l-list-row" gutter="10">
							<van-col span="12" class="ReportList-depart-l-list-row-col" v-for="item,index in ReportsDetailData.data.report_departs.data" :key="index" v-if="item.error_counts != 0">
								<p @click="jump(item.id)">{{item.name}}</p>
							</van-col>
						</van-row>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	import Bubble from './../components/ReportIndex/Bubble' // 气泡图表
	import PieChart from './../components/ReportIndex/PieChart' // 饼图
	import { getCookie, setCookie } from '../utils'
	export default {
		components: {
			Bubble,
			PieChart
		},
		data() {
			return {
				title: this.$route.meta.title,
				is_client_admin: getCookie('is_client_admin'),
				loading: false,
				ChartShow: '',
				DepartShow: false,
				ReportData: [],
				data: [{
					id: '5dsfad121a',
					name: '仓库',
					img: 'https://pro.modao.cc/uploads3/images/2246/22468003/raw_1531121747.png',
					all: '50',
					type: [{
						id: '1',
						memo: '一般',
						namekey: 'namekey',
						amount: 3,
						ratio: 3,
					}, {
						id: '2',
						memo: '中等',
						namekey: 'namekey',
						amount: 2,
						ratio: 2,
					}, {
						id: '3',
						memo: '偏高',
						namekey: 'namekey',
						amount: 3,
						ratio: 3,
					}, {
						id: '4',
						memo: '严重',
						namekey: 'namekey',
						amount: 10,
						ratio: 10,
					}]
				}, {
					id: '5dsfad121a11',
					name: '生管',
					img: 'https://pro.modao.cc/uploads3/images/2246/22468003/raw_1531121747.png',
					all: '30',
					type: [{
						id: '1',
						memo: '一般',
						namekey: 'namekey',
						amount: 3,
						ratio: 3,
					}, {
						id: '2',
						memo: '中等',
						namekey: 'namekey',
						amount: 2,
						ratio: 2,
					}, {
						id: '3',
						memo: '偏高',
						namekey: 'namekey',
						amount: 3,
						ratio: 3,
					}, {
						id: '4',
						memo: '严重',
						namekey: 'namekey',
						amount: 6,
						ratio: 6,
					}]
				}]
			}
		},
		computed: {
			...mapState([
				'ReportsDetailData'
			])
		},
		methods: {
			...mapActions([
				'getReportsDetail'
			]),
			CheckRisk(id) {
				if(this.ChartShow == id) {
					this.ChartShow = ''
				} else {
					this.ChartShow = id
				}
			},
			jump(id) {
				this.ChartShow = id
				const total = this.$refs[id][0].offsetTop
				let distance = document.documentElement.scrollTop || document.body.scrollTop
				// 平滑滚动，时长500ms，每10ms一跳，共50跳
				let step = total / 50
				if(total > distance) {
					smoothDown()
				} else {
					let newTotal = distance - total
					step = newTotal / 50
					smoothUp()
				}

				function smoothDown() {
					if(distance < total) {
						distance += step
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						setTimeout(smoothDown, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
					}
				}

				function smoothUp() {
					if(distance > total) {
						distance -= step
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						setTimeout(smoothUp, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
					}
				}
				this.DepartShow = false
			},
			async getData() {
				if(this.ReportsDetailData.id != this.$route.params.id){
					this.loading = true
				}
				await this.getReportsDetail(this.$route.params.id)
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.ReportList {
		position: fixed;
		bottom: 1rem;
		right: 1.5rem;
		background-color: rgb(24, 144, 255);
		box-shadow: rgba(24, 144, 255, 0.4) 0px 4px 10px 0px;
		width: 59px;
		height: 59px;
		border-radius: 50%;
		text-align: center;
		&-depart {
			&-w {
				position: fixed;
				width: 100%;
				height: 100%;
				background: rgba(68, 68, 68, .4);
				top: 0;
				z-index: 5;
			}
			&-l {
				position: fixed;
				width: 55%;
				bottom: 20px;
				background: #ffffff;
				z-index: 6;
				right: 100px;
				min-height: 100px;
				border-radius: 5px;
				text-align: center;
				padding: .5rem;
				&-list {
					min-height: 100px;
					position: relative;
					&:before {
						content: '';
						border-top: 10px solid transparent;
						border-bottom: 10px solid transparent;
						border-left: 10px solid #ffffff;
						right: -18px;
						position: absolute;
						bottom: 7px;
					}
					&-row {
						&-col {
							margin-bottom: .5rem;
							& p {
								padding: .5rem 0;
								background: #f8f8f8;
								color: #666666;
								font-size: .8rem;
								min-height: 1.3rem;
							}
						}
					}
				}
			}
		}
		&-icon {
			margin-top: .5rem;
			font-size: 1.5rem;
		}
		& span {
			display: block;
			color: #FFFFFF;
			font-size: .7rem;
		}
	}
	
	.ReportIndex {
		&-risk {
			&-list {
				margin: 1.5rem .5rem 2rem .5rem;
				&-m {
					background: #ffffff;
					box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
					border-radius: 6px;
					margin-bottom: 1rem;
					&-pie {
						&-title {
							color: rgb(154, 159, 185);
							font-size: .8rem;
							padding: 2rem 1rem 0 1rem;
						}
						&-show {
							color: rgb(187, 187, 187);
							font-size: .8rem;
							text-align: center;
							padding: 0 0 2rem 0;
						}
					}
					&-title {
						height: 75px;
						border-bottom: 1px solid rgb(240, 240, 242);
						overflow: scroll;
						&-row {
							&-left {
								border-right: 1px solid rgb(240, 240, 242);
								height: 70px;
								text-align: center;
								& img {
									width: 26px;
									padding: 1.4rem 0;
								}
							}
							&-middle {
								padding: .9rem 1rem;
								&-p1 {
									font-weight: bold;
								}
								&-p2 {
									color: rgb(176, 176, 176);
									font-size: .7rem;
									margin-top: .3rem;
								}
							}
							&-right {
								padding: 1rem 0;
								& span {
									color: rgb(0, 138, 255);
									font-size: 1.9rem;
									font-weight: bold;
									display: inline-block;
									margin-right: .7rem;
									vertical-align: middle;
								}
								& i {
									color: rgb(189, 189, 189);
									font-size: 1.3rem;
									vertical-align: middle;
								}
							}
						}
					}
				}
			}
			&-title {
				color: rgb(153, 153, 153);
				font-size: .8rem;
				text-align: center;
				position: relative;
				margin-top: 1rem;
				&:after {
					content: '';
					position: absolute;
					width: 34%;
					height: 1px;
					background: rgb(227, 227, 227);
					left: .5rem;
					top: 9px;
				}
				&:before {
					content: '';
					position: absolute;
					width: 34%;
					height: 1px;
					background: rgb(227, 227, 227);
					right: .5rem;
					top: 9px;
				}
			}
		}
		&-bubble {
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			text-align: center;
			padding: 1.2rem 0;
			margin: 2.6rem .5rem;
			&-title {
				font-weight: bold;
				font-size: .9rem;
				&-block1 {
					width: 6px;
					height: 6px;
					background-color: rgba(0, 142, 241, .2);
					transform: rotate(45deg);
					display: inline-block;
					margin: 0 .3rem;
				}
				&-block2 {
					width: 6px;
					height: 6px;
					background-color: rgba(0, 142, 241, .8);
					transform: rotate(45deg);
					display: inline-block;
					margin: 0 .4rem;
				}
			}
		}
		&-title {
			background-color: rgb(18, 144, 238);
			padding: 2rem 1rem 3rem 1rem;
			position: relative;
			&-row {
				color: #ffffff;
				&-left {
					& img {
						width: 44px;
						border: 1px solid rgba(255, 255, 255, 0.4);
						border-radius: 50%;
						box-shadow: transparent 0px 2px 8px 0px;
					}
				}
				&-right {
					&-title {
						font-size: 1.3rem;
						font-weight: bold;
					}
					&-time {
						font-size: .8rem;
						margin-top: .2rem;
						opacity: 0.8;
					}
				}
			}
			&-b {
				background-color: #ffffff;
				box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
				border-radius: 6px;
				position: absolute;
				bottom: -20px;
				width: calc(100% - 1rem);
				text-align: center;
				padding: 1rem 0;
				color: #008dff;
				left: .5rem;
				&-row {
					&-left {
						position: relative;
						&:after {
							content: '';
							width: 1px;
							height: 100%;
							background: rgb(240, 240, 242);
							position: absolute;
							right: 0;
						}
					}
				}
			}
		}
	}
</style>