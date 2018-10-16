<template>
	<div v-title :data-title="title" v-loading="loading">
		<div class="ShareDepart">
			<van-checkbox-group v-model="result" v-if="ReportsDetailData.data.report_departs">
				<div class="ShareDepart-list" v-for="item,index in ReportsDetailData.data.report_departs.data">
					<van-row class="ShareDepart-list-row">
						<van-col span="3" class="ShareDepart-list-row-left">
							<van-checkbox :name="item.id" class="ShareDepart-list-row-left-checkbox"></van-checkbox>
						</van-col>
						<van-col span="21" class="ShareDepart-list-row-right">
							<img :src="item.icon" />
							<span>{{item.name}}</span>
						</van-col>
					</van-row>
				</div>
			</van-checkbox-group>
		</div>
		<div style="height: 2rem;"></div>
		<div class="ShareDepart-bottom">
			<van-row class="ShareDepart-bottom-row">
				<van-col span="16" class="ShareDepart-bottom-row-left">
					<van-checkbox v-model="checked" @change="ChangeAll">全选</van-checkbox>
				</van-col>
				<van-col span="8" class="ShareDepart-bottom-row-right" @click.native="NextPost">
					<p>下一步</p>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				loading: false,
				result: [],
				checked: false
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
			ChangeAll(value) {
				if(value){
					if(this.result.length > 0){
						this.ReportsDetailData.data.report_departs.data.forEach(item => {
							if(this.result.indexOf(item.id) === -1){
								this.result.push(item.id)
							}
						})
					}else{
						this.ReportsDetailData.data.report_departs.data.forEach(item => {
							this.result.push(item.id)
						})
					}
				}else{
					if(this.result.length == this.ReportsDetailData.data.report_departs.data.length){
						this.result = []
					}
				}
			},
			async getData() {
				if(this.ReportsDetailData.id != this.$route.params.id){
					this.loading = true
				}
				await this.getReportsDetail(this.$route.params.id)
				this.loading = false
			},
			async NextPost() {
				if(this.result.length == 0){
					this.$toast({
						message: '请选择部门',
						duration: 1000
					})
					return false
				}
				this.loading = true
				const data = await api.postInvitations(this.$route.params.id, this.result)
				this.loading = false
				this.$router.push({
					name: 'ShareReport',
					params: {
						id: this.$route.params.id
					},
					query: {
						code: data.data.code
					}
				})
			}
		},
		mounted() {
			this.getData()
		},
		watch: {
			result(val) {
				if(val.length == this.ReportsDetailData.data.report_departs.data.length){
					this.checked = true
				}else{
					this.checked = false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.ShareDepart {
		margin-top: 1rem;
		background: #ffffff;
		border-top: 1px solid rgb(237, 237, 237);
		&-bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
			border-top: 1px solid rgb(195, 197, 202);
			height: 53px;
			&-row {
				&-left {
					padding: 1rem;
					background: #ffffff;
				}
				&-right {
					padding: 1rem 0;
					text-align: center;
					color: rgb(255, 255, 255);
					background-color: rgb(0, 141, 255);
				}
			}
		}
		&-list {
			padding: 1rem;
			border-bottom: 1px solid rgb(237, 237, 237);
			&-row {
				&-right {
					& img {
						width: 20px;
						vertical-align: bottom;
						margin-right: .5rem;
					}
				}
			}
		}
	}
</style>