<template>
	<div>
		<div class="HangAir" v-if="data">
			<div class="HangAir-no_report" v-if="data.data.length == 0">
				<img src="../../assets/no_data.png" width="80%" />
				<p>暂无数据</p>
			</div>
			<van-checkbox-group v-else v-model="result">
				<van-row class="HangAir-checkbox-row" v-for="item,index in data.data" :key="index">
					<van-col span="2" class="HangAir-checkbox-row-left">
						<van-checkbox :name="item.id" class="HangAir-checkbox"></van-checkbox>
					</van-col>
					<van-col span="22" class="HangAir-checkbox-row-right" @click.native="goReportDetail(item.id)">
						<div class="HangAir-row">
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
						</div>
						<div class="HangAir-row-wen">
							<van-row class="HangAir-row-wen-van">
								<van-col span="5" class="HangAir-row-wen-van-col">
									<div class="HangAir-row-wen-van-col-center">
										<van-icon name="exclamation" class="HangAir-row-wen-van-col-yellowwen iconBe" />
									</div>
								</van-col>
								<van-col span="17" class="HangAir-row-wen-van-col">
									<p class="HangAir-row-wen-van-col-p1">报告结果等待审核</p>
									<p class="HangAir-row-wen-van-col-p2">查看问题分析</p>
								</van-col>
								<van-col span="2" class="HangAir-row-wen-van-col">
									<van-icon name="ic_arrow_drop_up" class="HangAir-row-wen-van-col-up" />
								</van-col>
							</van-row>
						</div>
					</van-col>
				</van-row>
			</van-checkbox-group>
			<div class="HangAir-checked">
				<van-row class="HangAir-checked-row">
					<van-col span="10" class="HangAir-checked-row-left">
						<van-checkbox v-model="checked" @change="ChangeAll">全选</van-checkbox>
					</van-col>
					<van-col span="7" class="HangAir-checked-row-middle" @click.native="dismissal">
						<p>驳回</p>
					</van-col>
					<van-col span="7" class="HangAir-checked-row-right" @click.native="Audited">
						<p>同意</p>
					</van-col>
				</van-row>
			</div>
		</div>
		<div style="height: 1rem;"></div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../../utils/api'
	export default {
		components: {

		},
		props: ['data'],
		data() {
			return {
				result: [],
				checked: false
			}
		},
		computed: {
			...mapState([
				'AuditListActive'
			])
		},
		methods: {
			...mapActions([
				'getPlanDepartList'
			]),
			goReportDetail(id) {
				this.$router.push({
					name: 'ReportDetail',
					params: {
						id: id
					}
				})
			},
			ChangeAll(value) {
				if(value){
					if(this.result.length > 0){
						this.data.data.forEach(item => {
							if(this.result.indexOf(item.id) === -1){
								this.result.push(item.id)
							}
						})
					}else{
						this.data.data.forEach(item => {
							this.result.push(item.id)
						})
					}
				}else{
					if(this.result.length == this.data.data.length){
						this.result = []
					}
				}
			},
			dismissal() {
				const id = this.result[0]
				if(this.result.length == 0){
					this.$toast({
						message: '请先选择问题',
						duration: 1000
					})
					return false
				}
				if(this.result.length > 1){
					this.$toast({
						message: '驳回只能选一个',
						duration: 1000
					})
					return false
				}
				this.$router.push({
					name: 'AddDismissal',
					params: {
						id: id
					}
				})
			},
			async Audited() {
				if(this.result.length == 0){
					this.$toast({
						message: '请先选择问题',
						duration: 1000
					})
					return false
				}
				this.$dialog.confirm({
					title: '提醒',
					message: '真的确认好吗？',
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(async() => {
					const FormData = {
						status: '审核成功',
						question_ids: this.result
					}
					const data = await api.patchAuditMoreQuestion(FormData)
					this.$toast({
						message: data.msg,
						duration: 1000
					})
					await this.getPlanDepartList(this.$route.params.id)
					this.AuditListActive.active = 1
				}).catch(() => {

				})
			}
		},
		mounted() {

		},
		watch: {
			result(val) {
				if(val.length == this.data.data.length){
					this.checked = true
				}else{
					this.checked = false
				}
			}
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
		&-checkbox {
			position: relative;
			top: 4rem;
			height: 100%;
			&-row {
				margin-bottom: 2rem;
				&-right {
					position: relative;
				}
			}
		}
		&-checked {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			&-row {
				&-left {
					padding: 1rem;
					background: #ffffff;
					height: 53px;
				}
				&-middle {
					padding: 1rem;
					background-color: rgb(167, 189, 206);
					text-align: center;
					color: #ffffff;
				}
				&-right {
					padding: 1rem;
					background-color: rgb(0, 141, 255);
					text-align: center;
					color: #ffffff;
				}
			}
		}
		&-row {
			background-color: rgb(245, 247, 254);
			border-radius: 6px;
			padding: 1.5rem 1rem 2rem 1rem;
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
				bottom: 10px;
				border-radius: 6px;
				height: 70px;
				left: 1rem;
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
	
	.iconBe:before {
		margin-top: .35rem;
	}
</style>
<style>
	.van-checkbox__icon--checked .van-icon {
		border-color: #0076FF !important;
		background-color: #0076FF !important;
	}
</style>