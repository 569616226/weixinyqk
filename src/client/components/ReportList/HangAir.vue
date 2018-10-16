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
						<van-col span="7" class="HangAir-row-kong-van-col">
							<van-icon v-if="item.client_answer" name="ic_done" color="rgb(42, 176, 41)" />
							<van-icon v-else name="ic_done" color="rgb(215, 215, 215)" />
							<span>调查过程</span>
						</van-col>
						<van-col span="7" class="HangAir-row-kong-van-col">
							<van-icon v-if="item.confirm_at" name="ic_done" color="rgb(42, 176, 41)" />
							<van-icon v-else name="ic_done" color="rgb(215, 215, 215)" />
							<span>现场确认</span>
						</van-col>
						<van-col span="7" class="HangAir-row-kong-van-col">
							<van-icon v-if="item.conclusion_at" name="ic_done" color="rgb(42, 176, 41)" />
							<van-icon v-else name="ic_done" color="rgb(215, 215, 215)" />
							<span>最终结论</span>
						</van-col>
					</van-row>
				</div>
				<div class="HangAir-row-wen" v-if="!item.client_answer">
					<van-row class="HangAir-row-wen-van">
						<van-col span="5" class="HangAir-row-wen-van-col">
							<div class="HangAir-row-wen-van-col-center">
								<van-icon name="help" class="HangAir-row-wen-van-col-redwen iconBe" />
							</div>
						</van-col>
						<van-col span="17" class="HangAir-row-wen-van-col">
							<p class="HangAir-row-wen-van-col-p1">问题等待调查</p>
							<p class="HangAir-row-wen-van-col-p2">填写问题分析</p>
						</van-col>
						<van-col span="2" class="HangAir-row-wen-van-col">
							<van-icon name="ic_arrow_drop_up" class="HangAir-row-wen-van-col-up" />
						</van-col>
					</van-row>
				</div>
				<div class="HangAir-row-wen" v-if="item.client_answer && !item.conclusion_at">
					<van-row class="HangAir-row-wen-van">
						<van-col span="5" class="HangAir-row-wen-van-col">
							<div class="HangAir-row-wen-van-col-center">
								<van-icon name="help" class="HangAir-row-wen-van-col-bluewen iconBe" />
							</div>
						</van-col>
						<van-col span="17" class="HangAir-row-wen-van-col">
							<p class="HangAir-row-wen-van-col-p1">问题正在调查中</p>
							<p class="HangAir-row-wen-van-col-p2">填写问题分析</p>
						</van-col>
						<van-col span="2" class="HangAir-row-wen-van-col">
							<van-icon name="ic_arrow_drop_up" class="HangAir-row-wen-van-col-up" />
						</van-col>
					</van-row>
				</div>
				<div class="HangAir-row-wen" v-if="item.client_answer && item.confirm_at && item.conclusion_at">
					<van-row class="HangAir-row-wen-van">
						<van-col span="5" class="HangAir-row-wen-van-col">
							<div class="HangAir-row-wen-van-col-center">
								<van-icon name="exclamation" class="HangAir-row-wen-van-col-yellowwen iconBe" />
							</div>
						</van-col>
						<van-col span="17" class="HangAir-row-wen-van-col">
							<p class="HangAir-row-wen-van-col-p1">报告结果审核中</p>
							<p class="HangAir-row-wen-van-col-p2">填写问题分析</p>
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
				'ReportDetailActive'
			])
		},
		methods: {
			...mapActions([

			]),
			goReportDetail(id) {
				if(!this.ReportDetailActive[id]) {
					this.ReportDetailActive[id] = {
						active: 1
					}
				}
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