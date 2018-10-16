<template>
	<div>
		<van-tabbar v-model="isActive">
			<van-tabbar-item icon="ic_border_color" :to="{name: 'FillReport',params: {id: id}}" v-if="is_audit != 'true'">填写报告</van-tabbar-item>
			<van-tabbar-item icon="ic_assignment_turned_in" :to="{name: 'Auditing',params: {id: id}}" v-else>我的审核</van-tabbar-item>
			<van-tabbar-item icon="ic_assessment" :to="{name: 'Project',params: {id: id}}">项目进展</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { getCookie, setCookie } from '../../utils'
	export default {
		components: {

		},
		data() {
			return {
				isActive: this.active,
				is_audit: getCookie('is_audit'),
			}
		},
		props: ['active', 'id'],
		computed: {
			
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	
</style>
<style>
	.van-tabbar-item{
		color: rgb(170, 170, 170) !important;
	}
	.van-tabbar-item--active{
		color: rgb(0, 141, 255) !important;
	}
</style>