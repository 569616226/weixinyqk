<template>
	<div v-title :data-title="title">
		<div class="DepartDetailSum">
			<div class="DepartDetailSum-explain">
				<p class="DepartDetailSum-explain-title">仓库部门问题严重性说明</p>
				<p class="DepartDetailSum-explain-content">本说明的数据采用总数的百分比进行统计</p>
				<div class="DepartDetailSum-explain-list _border_red">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_red">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [严重]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>40%</p>
								</van-col>
							</van-row>
							<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="40" color="#FFFFFF"></el-progress>
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _red">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question">
						<p>
							<font color="#ff2d35">[1] &nbsp;</font>
							无工作职责文件描述
						</p>
						<p>
							<font color="#ff2d35">[2] &nbsp;</font>
							无储存、搬运、出入库、盘点、保质期、装柜、安全及应急管理等相关制度流程。
						</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_yellow">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_yellow">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [偏高]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>24%</p>
								</van-col>
							</van-row>
							<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="24" color="#FFFFFF"></el-progress>
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _yellow">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question">
						<p>
							<font color="#ff9900">[1] &nbsp;</font>
							无工作职责文件描述
						</p>
						<p>
							<font color="#ff9900">[2] &nbsp;</font>
							无储存、搬运、出入库、盘点、保质期、装柜、安全及应急管理等相关制度流程。
						</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_blue">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_blue">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [中等]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>30%</p>
								</van-col>
							</van-row>
							<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="30" color="#FFFFFF"></el-progress>
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _blue">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question">
						<p>
							<font color="#008dff">[1] &nbsp;</font>
							无工作职责文件描述
						</p>
						<p>
							<font color="#008dff">[2] &nbsp;</font>
							无储存、搬运、出入库、盘点、保质期、装柜、安全及应急管理等相关制度流程。
						</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_palegreen">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_palegreen">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [一般]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>10%</p>
								</van-col>
							</van-row>
							<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="10" color="#FFFFFF"></el-progress>
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _palegreen">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question">
						<p>
							<font color="#2ecdc3">[1] &nbsp;</font>
							无工作职责文件描述
						</p>
						<p>
							<font color="#2ecdc3">[2] &nbsp;</font>
							无储存、搬运、出入库、盘点、保质期、装柜、安全及应急管理等相关制度流程。
						</p>
					</div>
				</div>
				<div class="DepartDetailSum-explain-list _border_green">
					<div class="DepartDetailSum-explain-list-g">
						<div class="SumBg_green">
							<van-row class="DepartDetailSum-explain-list-g-row">
								<van-col class="DepartDetailSum-explain-list-g-row-left" span="16">
									<p>问题严重性 [合格]</p>
								</van-col>
								<van-col class="DepartDetailSum-explain-list-g-row-right" span="8">
									<p>5%</p>
								</van-col>
							</van-row>
							<el-progress class="DepartDetailSum-explain-list-g-progress" :text-inside="true" :stroke-width="18" :percentage="5" color="#FFFFFF"></el-progress>
						</div>

						<p class="DepartDetailSum-explain-list-g-ru _green">涉及问题如下</p>
					</div>
					<div class="DepartDetailSum-explain-list-question">
						<p>
							<font color="#65d063">[1] &nbsp;</font>
							无工作职责文件描述
						</p>
						<p>
							<font color="#65d063">[2] &nbsp;</font>
							无储存、搬运、出入库、盘点、保质期、装柜、安全及应急管理等相关制度流程。
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
		},
		mounted() {
			
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