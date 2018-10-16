<template>
	<div v-title :data-title="title">

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../utils/api'
	import { getCookie, setCookie } from '../utils'
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				wx_data: {
					open_id: getCookie('openid')
				},
				name: ''
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
			async getToken() {
				const data = await api.getToken(this.wx_data.open_id)
				if(data.access_token) {
					setCookie('mobile_token', data.access_token)
					const DataUser = await api.getUser()
					setCookie('is_client_admin', DataUser.data.is_client_admin)
					setCookie('is_audit', DataUser.data.is_audit)
					setCookie('is_client', data.is_client)
					setCookie('is_frozen', DataUser.data.is_frozen)
					if(data.is_client) {
						this.name = 'SelectReport'
					} else {
						this.name = 'SelectionEnterprises'
					}
					this.$router.push({
						name: this.name
					})
				} else if(data.status == false && data.msg == '账号已被冻结') {
					this.$dialog.alert({
						message: data.msg
					}).then(() => {
						wx.closeWindow()
					})
				} else if(data.status == false && data.msg == '账号没有认证') {
					this.$router.push({
						name: 'AuthCustomer'
					})
				}
			}
		},
		mounted() {
			this.getToken()
		}
	}
</script>

<style lang="less" scoped>

</style>