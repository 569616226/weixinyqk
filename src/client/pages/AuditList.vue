<template>
	<div v-title :data-title="title" v-loading="loading">
		<div v-if="AuditListActive[id]">
			<van-tabs v-model="AuditListActive[id].active" swipeable>
				<van-tab>
					<div slot="title">
						待审核({{PlanDepartListData.data.auditing_count}})
					</div>
					<hang-air :data="PlanDepartListData.data.auditing"></hang-air>
				</van-tab>
				<van-tab>
					<div slot="title">
						已审核({{PlanDepartListData.data.success_audit_count}})
					</div>
					<audited :data="PlanDepartListData.data.success_audit"></audited>
				</van-tab>
				<van-tab>
					<div slot="title">
						已驳回({{PlanDepartListData.data.not_audit_count}})
					</div>
					<dismissal :data="PlanDepartListData.data.not_audit"></dismissal>
				</van-tab>
			</van-tabs>
		</div>
		<!--<div class="ReportList" @click="$router.push({name: 'FillReport'})">
			<van-icon name="home2" color="#FFFFFF" class="ReportList-icon"  />
		</div>-->
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import HangAir from './../components/AuditList/HangAir' // 待审核
	import Audited from './../components/AuditList/Audited' // 已审核
	import Dismissal from './../components/AuditList/Dismissal' // 已驳回
	export default {
		components: {
			HangAir,
			Audited,
			Dismissal
		},
		data() {
			return {
				title: this.$route.meta.title,
				id: this.$route.params.id,
				loading: false
			}
		},
		computed: {
			...mapState([
				'AuditListActive',
				'PlanDepartListData'
			])
		},
		methods: {
			...mapActions([
				'getPlanDepartList'
			]),
			async getData() {
				if(this.PlanDepartListData.id != this.$route.params.id) {
					this.loading = true
				}
				if(!this.AuditListActive[this.id]) {
					this.AuditListActive[this.id] = {
						active: 0
					}
				}
				await this.getPlanDepartList(this.$route.params.id)
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
		width: 40px;
		height: 40px;
		border-radius: 50%;
		text-align: center;
		&-icon {
			margin-top: .5rem;
			font-size: 1.2rem;
		}
	}
</style>
<style>
	.van-tab {
		color: rgb(153, 153, 153) !important;
	}
	
	.van-tab--active {
		color: rgb(0, 141, 255) !important;
	}
	
	.van-tabs__line {
		width: calc(100% / 8) !important;
		left: 10.3% !important;
		background-color: rgb(0, 141, 255) !important;
	}
</style>