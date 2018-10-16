<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="DepartDetailSum">
			<div class="DepartDetailSum-count">
				<van-row class="DepartDetailSum-count-title">
					<van-col class="DepartDetailSum-count-title-left" span="16">
						<p>{{ReportDepartsDetailData.data.name}}部门的问题数量统计</p>
					</van-col>
					<van-col class="DepartDetailSum-count-title-right" span="8">
						<p>单位:个</p>
					</van-col>
				</van-row>
				<div class="DepartDetailSum-count-sum">
					<div class="DepartDetailSum-count-sum-flex" @click="jumpSum('serious')">
						<p>严重</p>
						<span>{{ReportDepartsDetailData.data.serious_counts}}</span>
						<div class="DepartDetailSum-count-sum-flex-line"></div>
					</div>
					<div class="DepartDetailSum-count-sum-flex" @click="jumpSum('highside')">
						<p>偏高</p>
						<span>{{ReportDepartsDetailData.data.hight_counts}}</span>
						<div class="DepartDetailSum-count-sum-flex-line"></div>
					</div>
					<div class="DepartDetailSum-count-sum-flex" @click="jumpSum('middle')">
						<p>中等</p>
						<span>{{ReportDepartsDetailData.data.middle_counts}}</span>
						<div class="DepartDetailSum-count-sum-flex-line"></div>
					</div>
					<div class="DepartDetailSum-count-sum-flex" @click="jumpSum('commonly')">
						<p>一般</p>
						<span>{{ReportDepartsDetailData.data.general_counts}}</span>
						<div class="DepartDetailSum-count-sum-flex-line"></div>
					</div>
					<div class="DepartDetailSum-count-sum-flex" @click="jumpSum('qualified')">
						<p>合格</p>
						<span>{{ReportDepartsDetailData.data.nomarl_counts}}</span>
					</div>
				</div>
			</div>
			<div class="DepartDetailSum-explain">
				<p class="DepartDetailSum-explain-title">{{ReportDepartsDetailData.data.name}}部门问题严重性说明</p>
				<p class="DepartDetailSum-explain-content">本说明的数据采用总数的百分比进行统计</p>
				<div class="DepartDetailSum-explain-list _border_red" ref="serious">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_red">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [严重]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>{{ReportDepartsDetailData.data.serious_counts}}/{{ReportDepartsDetailData.data.counts}}</p>
								</van-col>
							</van-row>
							<!--<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="ReportDepartsDetailData.data.serious_rate" color="#FFFFFF"></el-progress>-->
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _red">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-if="ReportDepartsDetailData.data.serious_questions != null">
						<div v-for="(value, index) in ReportDepartsDetailData.data.serious_questions">
							<p>
								<font color="#ff9900">[{{index+1}}] &nbsp;</font>
								{{value['question']}}
							</p>
							<p>
								<font color="#999999">答案： </font>
								{{value['client_answer']}}
							</p>
						</div>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-else>
						<p class="DepartDetailSum-explain-list-question-ps">暂无风险</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_yellow" ref="highside">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_yellow">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [偏高]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>{{ReportDepartsDetailData.data.hight_counts}}/{{ReportDepartsDetailData.data.counts}}</p>
								</van-col>
							</van-row>
							<!--<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="ReportDepartsDetailData.data.hight_rate" color="#FFFFFF"></el-progress>-->
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _yellow">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-if="ReportDepartsDetailData.data.hight_questions != null">
						<div v-for="(value, index) in ReportDepartsDetailData.data.hight_questions">
							<p>
								<font color="#ff9900">[{{index+1}}] &nbsp;</font>
								{{value['question']}}
							</p>
							<p>
								<font color="#999999">答案： </font>
								{{value['client_answer']}}
							</p>
						</div>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-else>
						<p class="DepartDetailSum-explain-list-question-ps">暂无风险</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_blue" ref="middle">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_blue">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [中等]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>{{ReportDepartsDetailData.data.middle_counts}}/{{ReportDepartsDetailData.data.counts}}</p>
								</van-col>
							</van-row>
							<!--<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="ReportDepartsDetailData.data.middle_rate" color="#FFFFFF"></el-progress>-->
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _blue">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-if="ReportDepartsDetailData.data.middle_questions != null">
						<p v-for="item,index in ReportDepartsDetailData.data.middle_questions">
							<font color="#008dff">[{{index+1}}] &nbsp;</font>
							{{item}}
						</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-else>
						<p class="DepartDetailSum-explain-list-question-ps">暂无风险</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_palegreen" ref="commonly">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_palegreen">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [一般]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>{{ReportDepartsDetailData.data.general_counts}}/{{ReportDepartsDetailData.data.counts}}</p>
								</van-col>
							</van-row>
							<!--<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="ReportDepartsDetailData.data.general_rate" color="#FFFFFF"></el-progress>-->
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _palegreen">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-if="ReportDepartsDetailData.data.general_questions != null">
						<div v-for="(value, index) in ReportDepartsDetailData.data.general_questions">
							<p>
								<font color="#ff9900">[{{index+1}}] &nbsp;</font>
								{{value['question']}}
							</p>
							<p>
								<font color="#999999">答案： </font>
								{{value['client_answer']}}
							</p>
						</div>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-else>
						<p class="DepartDetailSum-explain-list-question-ps">暂无风险</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_green" ref="qualified">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_green">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [合格]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>{{ReportDepartsDetailData.data.nomarl_counts}}/{{ReportDepartsDetailData.data.counts}}</p>
								</van-col>
							</van-row>
							<!--<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="ReportDepartsDetailData.data.nomarl_rate" color="#FFFFFF"></el-progress>-->
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _green">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-if="ReportDepartsDetailData.data.nomarl_questions != null">
						<div v-for="(value, index) in ReportDepartsDetailData.data.nomarl_questions">
							<p>
								<font color="#ff9900">[{{index+1}}] &nbsp;</font>
								{{value['question']}}
							</p>
							<p>
								<font color="#999999">答案： </font>
								{{value['client_answer']}}
							</p>
						</div>
					</div>
					<div class="DepartDetailSum-explain-list-question" v-else>
						<p class="DepartDetailSum-explain-list-question-ps">暂无风险</p>
					</div>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div class="offsetTop" v-if="offsetTopShow" @click="jump">
				<van-icon name="arrowup" color="rgb(0, 141, 255)" class="offsetTop-icon" />
			</div>
		</transition>
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
				offsetTopShow: false,
				loading: false
			}
		},
		computed: {
			...mapState([
				'ReportDepartsDetailData'
			])
		},
		methods: {
			...mapActions([
				'getReportDepartsDetail'
			]),
			async getData() {
				if(this.ReportDepartsDetailData.id != this.$route.params.id) {
					this.loading = true
				}
				if(this.$route.query.name) {
					this.jumpSum(this.$route.query.name)
				}
				await this.getReportDepartsDetail(this.$route.params.id)
				this.loading = false
			},
			_offsetTopShow() {
				const distance = document.documentElement.scrollTop || document.body.scrollTop
				if(distance > 100) {
					this.offsetTopShow = true
				} else {
					this.offsetTopShow = false
				}
			},
			jump() {
				const total = 0
				let distance = document.documentElement.scrollTop || document.body.scrollTop
				// 平滑滚动，时长500ms，每10ms一跳，共50跳
				let step = total / 30
				if(total > distance) {
					smoothDown()
				} else {
					let newTotal = distance - total
					step = newTotal / 30
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
			},
			jumpSum(name) {
				const total = this.$refs[name].offsetTop
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
			},
		},
		mounted() {
			this.getData()
			this.$nextTick(function() {
				window.addEventListener('scroll', this._offsetTopShow)
			})
		}
	}
</script>

<style lang="less" scoped>
	.DepartDetailSum {
		min-height: 100vh;
		background-color: rgb(58, 90, 244);
		padding: 1.3rem;
		&-explain {
			margin-top: 1.5rem;
			padding: 1.5rem 1rem 1.5rem 1rem;
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			&-title {
				font-weight: bold;
				font-size: .8rem;
			}
			&-content {
				color: rgb(176, 176, 176);
				font-size: .8rem;
				margin-top: .5rem;
			}
			&-list {
				margin-top: 1rem;
				background-color: rgb(255, 255, 255);
				box-shadow: transparent 0px 6px 10px 0px;
				border-radius: 6px;
				&._border_red {
					border: 1px solid rgb(255, 128, 132);
				}
				&._border_yellow {
					border: 1px solid rgb(255, 189, 91);
				}
				&._border_blue {
					border: 1px solid rgb(114, 186, 253);
				}
				&._border_palegreen {
					border: 1px solid rgb(124, 223, 255);
				}
				&._border_green {
					border: 1px solid rgb(170, 234, 169);
				}
				&-g {
					&-row {
						color: #ffffff;
						padding: .6rem .5rem;
						&-right {
							text-align: right;
						}
					}
					&-progress {
						padding: 0 .5rem 0 .5rem;
					}
					&-ru {
						color: rgba(255, 255, 255, .8);
						font-size: .8rem;
						padding: .5rem .5rem;
						background-size: cover;
					}
					& ._red {
						background-image: url(../assets/SumBg_red.png);
					}
					& ._yellow {
						background-image: url(../assets/SumBg_yellow.png);
					}
					& ._blue {
						background-image: url(../assets/SumBg_blue.png);
					}
					& ._palegreen {
						background-image: url(../assets/SumBg_palegreen.png);
					}
					& ._green {
						background-image: url(../assets/SumBg_green.png);
					}
				}
				&-question {
					padding: 1.3rem 1rem;
					& p {
						margin-bottom: 1rem;
					}
					&-ps {
						color: rgb(136, 136, 136);
						text-align: center;
						font-weight: bold;
						font-size: 1.1rem;
					}
				}
			}
		}
		&-count {
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			padding: 1.5rem 1rem 1.5rem 1rem;
			&-title {
				font-size: .8rem;
				&-left {
					font-weight: bold;
				}
				&-right {
					text-align: right;
					color: rgb(153, 153, 153);
				}
			}
			&-sum {
				display: flex;
				text-align: center;
				margin-top: 1rem;
				padding: 1rem .5rem;
				background-color: rgb(124, 57, 223);
				border-color: transparent;
				box-shadow: transparent 0px 6px 10px 0px;
				border-radius: 6px;
				color: #ffffff;
				&-flex {
					flex: 1;
					position: relative;
					&-line {
						height: 70%;
						width: 1px;
						background: rgba(240, 240, 242, .1);
						position: absolute;
						right: 0;
						top: 15%;
					}
					& p {
						font-size: .8rem;
					}
					& span {
						font-weight: bold;
						font-size: 1.7rem;
					}
				}
			}
		}
	}
	
	.offsetTop {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		background-color: rgba(235, 238, 254, .9);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		text-align: center;
		&-icon {
			font-size: 1.5rem;
			margin-top: .4rem;
		}
	}
	
	.SumBg_red {
		background: rgb(255, 45, 53);
	}
	
	.SumBg_yellow {
		background: rgb(255, 152, 0);
	}
	
	.SumBg_blue {
		background: rgb(24, 144, 255);
	}
	
	.SumBg_palegreen {
		background: rgb(58, 204, 194);
	}
	
	.SumBg_green {
		background: rgb(105, 206, 104);
	}
</style>