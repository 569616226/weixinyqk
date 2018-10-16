<template>
	<div v-title :data-title="title">
		
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {
			
		},
		data() {
			return {
				title: this.$route.meta.title,
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

</style>