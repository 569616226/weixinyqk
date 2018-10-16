<template>
</template>

<script>
	export default {
		name: '',
		data() {
			return {}
		},
		methods: {
			oauth() {
				let url = encodeURIComponent('https://wx.check.elinkport.com/api/login')
				location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx36a613df95aa13eb&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
			}
		},
		mounted() {
			this.oauth()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>