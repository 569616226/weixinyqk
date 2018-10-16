<template>
	<div class="app">
		<router-view/>
	</div>
</template>

<script>
	import api from './utils/api'
	import { getCookie, setCookie } from './utils'
	export default {
		data() {
			return {

			}
		},
		methods: {
			async getUser() {
				if(getCookie('is_audit')) {
					const DataUser = await api.getUser()
					setCookie('is_client_admin', DataUser.data.is_client_admin)
					if(DataUser.data.is_audit.toString() != getCookie('is_audit') || DataUser.data.is_frozen.toString() != getCookie('is_frozen')) {
						this.$router.push({
							name: 'WechatLogin'
						})
					}
					setTimeout(() => {
						this.getUser()
					}, 10000)
				}
			}
			//			async Pusher() {
			//				if(!getCookie('userid')) {
			//					const DataUser = await api.getUser()
			//					setCookie('userid', DataUser.data.id)
			//				}
			//				const user = `users.${getCookie('userid')}`
			//				console.log(user)
			//				this.$echo.private(user).listen('SetAuditUserNotification', (payload) => {
			//					console.log(payload)
			//				})
			//			}
		},
		mounted() {
			//this.getUser()
		}
	}
</script>
<style lang="less">

</style>