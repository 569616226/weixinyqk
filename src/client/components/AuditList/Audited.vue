<template>
	<div>
		<div class="HangAir" v-if="data">
			<div class="HangAir-no_report" v-if="data.data.length == 0">
				<img src="../../assets/no_data.png" width="80%" />
				<p>暂无数据</p>
			</div>
			<div v-else class="HangAir-row" v-for="item,index in data.data" :key="index" @click="goReportDetail(item.id)">
				<p class="HangAir-row-title">{{item.name}}</p>
				<div class="HangAir-row-kong">
					<van-row class="HangAir-row-kong-van">
						<van-col span="15" class="HangAir-row-kong-van-col">
							<van-icon name="ic_done" color="rgb(42, 176, 41)" />
							<span>部门：{{item.plan_depart}}</span>
						</van-col>
						<!--<van-col span="10" class="HangAir-row-kong-van-col">
							<van-icon name="close2" color="rgb(255, 74, 80)" />
							<span>工厂未回复</span>
						</van-col>-->
					</van-row>
				</div>
				<div class="HangAir-row-wen">
					<van-row class="HangAir-row-wen-van">
						<van-col span="5" class="HangAir-row-wen-van-col">
							<div class="HangAir-row-wen-van-col-center">
								<van-icon name="ic_check_circle" class="HangAir-row-wen-van-col-greenSuccess iconBe" />
							</div>
						</van-col>
						<van-col span="17" class="HangAir-row-wen-van-col">
							<p class="HangAir-row-wen-van-col-p1">报告结果已审核</p>
							<p class="HangAir-row-wen-van-col-p2">查看问题分析</p>
						</van-col>
						<van-col span="2" class="HangAir-row-wen-van-col">
							<van-icon name="ic_arrow_drop_up" class="HangAir-row-wen-van-col-up" />
						</van-col>
					</van-row>
				</div>
			</div>
		</div>
		<div style="height: 1rem;"></div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		props: ['data'],
		data() {
			return {

			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
			goReportDetail(id) {
				this.$router.push({
					name: 'ReportDetail',
					params: {
						id: id
					}
				})
			}
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.HangAir {
		padding: 1rem;
		&-no_report {
			text-align: center;
			padding: 7rem 2rem;
			& p{
				margin-top: 1rem;
			}
		}
		&-row {
			background-color: rgb(245, 247, 254);
			border-radius: 6px;
			padding: 1.5rem 1rem 3rem 1rem;
			position: relative;
			margin-bottom: 3.4rem;
			&-kong {
				margin-top: .7rem;
				&-van {
					&-col {
						color: rgb(142, 143, 147);
						font-size: .8rem;
					}
				}
			}
			&-wen {
				position: absolute;
				width: calc(100% - 2rem);
				background-color: rgb(255, 255, 255);
				box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
				bottom: -30px;
				border-radius: 6px;
				height: 70px;
				&-van {
					padding: .7rem;
					&-col {
						font-size: 18px;
						&-center {
							text-align: center;
						}
						&-redwen {
							display: inline-block;
							background: rgb(255, 85, 82);
							border-radius: 50%;
							width: 34px;
							height: 34px;
							margin-top: .4rem;
							color: #ffffff;
						}
						&-bluewen {
							display: inline-block;
							background: rgb(24, 144, 255);
							border-radius: 50%;
							width: 34px;
							height: 34px;
							margin-top: .4rem;
							color: #ffffff;
						}
						&-yellowwen {
							display: inline-block;
							background: rgb(255, 152, 0);
							border-radius: 50%;
							width: 34px;
							height: 34px;
							margin-top: .4rem;
							color: #ffffff;
						}
						&-greenSuccess{
							display: inline-block;
							background: rgb(42, 176, 41);
							border-radius: 50%;
							width: 34px;
							height: 34px;
							margin-top: .4rem;
							color: #ffffff;
						}
						&-p1 {
							font-size: .8rem;
							margin-top: .3rem;
						}
						&-p2 {
							color: rgb(102, 102, 102);
							font-size: .7rem;
							margin-top: .2rem;
						}
						&-up {
							display: inherit;
							color: rgb(145, 145, 145);
							margin-top: .8rem;
							font-size: 1.3rem;
						}
					}
				}
			}
		}
	}
	.iconBe:before{
		margin-top: .35rem;
	}
</style>