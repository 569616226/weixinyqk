<template>
	<div v-title :data-title="title">
		<div class="auth-success">
			<img src="../assets/AuthSuccess.png" />
			<p class="auth-success-p1">认证成功</p>
			<p class="auth-success-p2">欢迎使用优企康</p>
			<button @click="Gowork" class="auth-cusomer-post">
				<span v-if="!is_client">去工作</span>
				<span v-else>查看报告</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				title: this.$route.meta.title,
				name: '',
				is_client: this.$route.query.is_client
			}
		},
		computed: {

		},
		methods: {
			Gowork() {
				if(this.$route.query.is_client){
					this.name = 'SelectReport'
				}else{
					this.name = 'SelectionEnterprises'
				}
				this.$router.push({
					name: this.name
				})
			}
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.auth-success {
		text-align: center;
		padding-top: 5rem;
		& img {
			width: 16.2rem;
		}
		&-p1 {
			font-size: 1.9rem;
			margin: 3rem 0 1.2rem 0;
		}
		&-p2 {
			color: rgb(153, 153, 153);
			font-size: .9rem;
			padding-bottom: 1.8rem;
		}
	}
</style>