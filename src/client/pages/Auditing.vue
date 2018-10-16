<template>
	<div v-title :data-title="title">
		<div class="Auditing" v-if="OrdersDetailData.data.plan">
			<div class="Auditing-no_report" v-if="OrdersDetailData.data.plan.data.plan_departs.data.length == 0">
				<img src="../assets/no_data.png" width="80%" />
				<p>暂无数据</p>
			</div>
			<div v-else class="Auditing-cell" v-for="item,index in OrdersDetailData.data.plan.data.plan_departs.data" :key="index" @click="goReportList(item.id)">
				<van-row class="Auditing-cell-row">
					<van-col span="12" class="Auditing-cell-row-left">
						<img :src="item.icon" />
						<span class="Auditing-cell-row-left-span">{{item.name}}</span>
					</van-col>
					<van-col span="12" class="Auditing-cell-row-right">
						<van-icon name="ic_check_circle" class="Auditing-cell-row-right-success" v-if="item.is_finish" />
						<span class="Auditing-cell-row-right-span" v-else>{{item.auditings}}</span>
						<van-icon name="chevron-right" class="Auditing-cell-row-right-icon" />
					</van-col>
				</van-row>
			</div>
		</div>
		<div style="height: 6rem;"></div>
		<fill-footer :active="active" :id="id"></fill-footer>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import FillFooter from './../components/common/FillFooter' //底部导航
	export default {
		components: {
			FillFooter
		},
		data() {
			return {
				title: this.$route.meta.title,
				active: 0,
				id: this.$route.params.id
			}
		},
		computed: {
			...mapState([
				'OrdersDetailData',
				'AuditListActive'
			])
		},
		methods: {
			...mapActions([
				'getOrdersDetail'
			]),
			goReportList(id) {
				if(!this.AuditListActive[id]) {
					this.AuditListActive[id] = {
						active: 0
					}
				}
				this.$router.push({
					name: 'AuditList',
					params: {
						id: id
					}
				})
			},
			async getData() {
				if(this.OrdersDetailData.id != this.$route.params.id) {
					this.loading = true
				}
				await this.getOrdersDetail(this.$route.params.id)
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.Auditing {
		padding: 1.5rem 1rem;
		&-no_report {
			text-align: center;
			padding: 7rem 2rem;
			& p{
				margin-top: 1rem;
			}
		}
		&-cell {
			padding: 1rem;
			background-color: rgb(255, 255, 255);
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			margin-bottom: 1rem;
			&-row {
				&-left {
					& img {
						vertical-align: middle;
						width: 24px;
						height: 24px;
					}
					&-span {
						margin-left: .5rem;
						vertical-align: middle;
					}
				}
				&-right {
					text-align: right;
					&-span {
						color: rgb(255, 255, 255);
						background-color: rgb(255, 74, 80);
						width: 23px;
						height: 21px;
						display: inline-block;
						text-align: center;
						border-radius: 50%;
						position: relative;
						top: -3px;
					}
					&-icon {
						color: rgb(179, 179, 179);
						font-size: 24px;
					}
					&-success {
						color: rgb(71, 193, 70);
						font-size: 22px;
					}
				}
			}
		}
	}
</style>