<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="SelectionEnterprises">
			<div class="SelectionEnterprises-no_report" v-if="ClientCompaniesData.length == 0">
				<img src="../assets/no_report.png" width="80%" />
				<p>报告正在飞马加鞭的赶路中~</p>
			</div>
			<el-collapse accordion v-model="activeNames" @change="handleChange" class="SelectionEnterprises-collapse" v-else>
				<el-collapse-item v-for="item,index in ClientCompaniesData" :key="index" :name="item.id">
					<template slot="title">
						<div class="SelectionEnterprises-title">
							<van-row>
								<van-col span="0">
									<img :src="item.logo" />
								</van-col>
								<van-col span="16">
									<div class="SelectionEnterprises-title-name">
										<p class="SelectionEnterprises-title-name-p1">{{item.name}}</p>
									</div>
								</van-col>
							</van-row>
						</div>
					</template>
					<van-row class="SelectionEnterprises-row" v-for="item2,index2 in item.orders.data" :key="index2" @click.native="goReport(item2.id)">
						<van-col span="24" class="SelectionEnterprises-row-col-left">
							{{item2.name}}
						</van-col>
					</van-row>
				</el-collapse-item>
			</el-collapse>
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
				loading: false,
				title: this.$route.meta.title,
				activeNames: [],
			}
		},
		computed: {
			...mapState([
				'ClientCompaniesData'
			])
		},
		methods: {
			...mapActions([
				'getClientCompanies'
			]),
			handleChange(val) {

			},
			goReport(id) {
				this.$router.push({
					name: 'ReportIndex',
					params: {
						id: id
					}
				})
			},
			async getData() {
				if(this.ClientCompaniesData.length == 0) {
					this.loading = true
				}
				await this.getClientCompanies()
				if(this.ClientCompaniesData.length > 0) {
					this.activeNames.push(this.ClientCompaniesData[0].id)
				}
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.SelectionEnterprises {
		&-no_report {
			text-align: center;
			padding: 7rem 2rem;
			& p {
				margin-top: 1rem;
			}
		}
		&-search {
			padding: 10px 15px;
		}
		&-collapse {
			overflow: hidden;
		}
		&-title {
			& img {
				width: 2.5rem;
				padding: 0 1rem;
				vertical-align: middle;
				border-radius: 50%;
			}
			&-name {
				display: inline-block;
				vertical-align: middle;
				&-p1 {
					line-height: normal;
					color: rgb(85, 85, 85);
					font-size: 1.15rem;
					font-weight: bold;
				}
				&-p2 {
					line-height: normal;
					color: rgb(176, 176, 176);
					font-size: .7rem;
					margin-top: .28rem;
				}
			}
		}
		&-row {
			background-color: rgb(251, 250, 250);
			border-top: 1px solid rgb(240, 240, 242);
			padding: 1.2rem 1rem;
			&-col-left {
				color: rgb(16, 16, 16);
				font-size: .9rem;
			}
			&-col-right {
				text-align: right;
				& span {
					color: #ffffff;
					border-radius: 2px;
					padding: 3px 2px;
				}
				&-not {
					background: rgb(255, 85, 91);
				}
				&-ongoing {
					background: rgb(255, 152, 0);
				}
				&-success {
					background: rgb(56, 183, 55);
				}
			}
		}
	}
</style>
<style>
	.el-collapse-item__header {
		height: 72px !important;
		line-height: 72px !important;
	}
	
	.el-collapse-item__arrow {
		line-height: 72px !important;
		font-weight: bold !important;
		color: rgb(166, 166, 166);
	}
	
	.el-collapse-item__content {
		padding-bottom: 0 !important;
	}
</style>