<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="FillReport">
			<p class="FillReport-title">{{OrdersDetailData.data.name}}</p>
			<p class="FillReport-time">项目开始时间：{{OrdersDetailData.data.start_at}}</p>
			<p class="FillReport-select">
				<van-icon name="ic_error" />
				<span>请选择对应的部门完成诊断结果的填写👇👇👇</span>
			</p>
			<div class="FillReport-genre">
				<van-row class="FillReport-genre-row" v-if="OrdersDetailData.data.plan">
					<van-col span="8" class="FillReport-genre-row-col" v-for="item,index in OrdersDetailData.data.plan.data.plan_departs.data" :key="index" @click.native="goReportList(item.id)">
						<van-icon name="information" class="FillReport-genre-row-col-icon-red" v-if="item.errors > 0" />
						<van-icon name="ic_check_circle" class="FillReport-genre-row-col-icon" v-if="item.is_finish" />
						<img :src="item.icon" />
						<p>{{item.name}}</p>
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
	import api from '../utils/api'
	import FillFooter from './../components/common/FillFooter' //底部导航
	export default {
		components: {
			FillFooter
		},
		data() {
			return {
				title: this.$route.meta.title,
				active: 0,
				id: this.$route.params.id,
				loading: false
			}
		},
		computed: {
			...mapState([
				'OrdersDetailData',
				'ReportListActive'
			])
		},
		methods: {
			...mapActions([
				'getOrdersDetail'
			]),
			goReportList(id) {
				if(!this.ReportListActive[id]) {
					this.ReportListActive[id] = {
						active: 0
					}
				}
				this.$router.push({
					name: 'ReportList',
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
	.FillReport {
		padding: 2rem 1rem 0 1rem;
		&-title {
			font-size: 1.7rem;
			font-weight: bold;
		}
		&-time {
			color: rgb(142, 143, 147);
			font-size: .8rem;
			margin-top: 1rem;
		}
		&-select {
			color: #008dff;
			font-size: .9rem;
			margin-top: 1.5rem;
		}
		&-genre {
			margin-top: 1rem;
			box-shadow: rgba(76, 88, 128, 0.2) 0px 6px 10px 0px;
			border-radius: 6px;
			background-color: rgb(255, 255, 255);
			&-row {
				border-radius: 6px;
				overflow: hidden;
				margin-right: -3px;
				&-col {
					border-right: 1px solid rgb(235, 238, 254);
					border-bottom: 1px solid rgb(235, 238, 254);
					position: relative;
					text-align: center;
					padding: 1.6rem 0;
					margin-right: -1px;
					margin-bottom: -1px;
					height: 7rem;
					&-icon {
						position: absolute;
						color: rgb(42, 176, 41);
						top: .5rem;
						right: .5rem;
						&-red {
							position: absolute;
							top: .5rem;
							right: .5rem;
							color: #ff7f44;
							font-size: 1.2rem;
						}
					}
					& img {
						width: 2rem;
						height: 2rem;
					}
					& p {
						color: rgb(102, 102, 102);
						font-size: .9rem;
						margin-top: .4rem;
					}
				}
			}
		}
	}
</style>