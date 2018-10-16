<template>
	<div>
		<div class="ReportList" @click="$router.go(-1)">
			<van-icon name="menu" color="#FFFFFF" class="ReportList-icon" />
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

			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.ReportList {
		position: fixed;
		bottom: 4rem;
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