<template>
	<div>
		<div id="chart" class="chart"></div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '../../utils/api'
	import * as d3 from "d3"
	export default {
		components: {

		},
		data() {
			return {
				numArry: [],
				data: []
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
			async bubble() {
				if(this.ReportsDetailData.data.length == 0){
					await this.getReportsDetail(this.$route.params.id)
				}else{
					this.getReportsDetail(this.$route.params.id)
				}
				this.numArry = []
				this.ReportsDetailData.data.report_departs.data.forEach(item => {
					if(item.error_counts != 0){
						this.data.push(item)
					}
				})
				const json = {
					'children': this.data
				}

				let diameter = window.innerWidth,
					color = d3.scaleOrdinal(d3.schemeCategory20c);

				if(diameter > 600){
					diameter = 600
				}

				const bubble = d3.pack()
					.size([diameter, diameter])
					.padding(32);

				const svg = d3.select('#chart').append('svg')
					.attr('width', diameter)
					.attr('height', diameter)
					.attr('class', 'chart-svg');

				const root = d3.hierarchy(json)
					.sum((d) => {
						let num = d.error_counts
						if(num == 0){
							num = 1
						}
						return num;
					})
					.sort((a, b) => {
						return b.data.error_counts - a.data.error_counts
					});

				bubble(root);

				const node = svg.selectAll('.node')
					.data(root.children)
					.enter()
					.append('g').attr('class', 'node')
					.attr('transform', (d) => {
						return 'translate(' + d.x + ' ' + d.y + ')';
					})
					.append('g').attr('class', 'graph')
					.on("click", this.getData)

				node.append("circle")
					.attr("r", (d) => {
						if(d.r < 21) {
							d.r = 21
						}
						return d.r;
					})
					.style("fill", (d) => {
						const color = ['#BCC85F', '#30D77F', '#C69D74', '#DE507B', '#ABCF79', '#59AABA', '#A27BAC', '#FE5162', '#57A2EC', '#50AE77', '#94DCEA', '#F06BB3', '#DCAC5D', '#D877A0', '#54EBDB', '#8387D9', '#93DB98', '#1D9CCC', '#FBAC74', '#C04D6F', '#DA7371', '#B3948B', '#B4D0D4', '#EC5F63', '#1BDAAE', '#F99AD4', '#D8D8A9', '#FAB19A', '#26B7A4', '#D5BBC3']
						let num = Math.round(Math.random() * 28)
						if(this.numArry.length > 1) {
							this.numArry.forEach(e => {
								if(e == num) {
									num = Math.round(Math.random() * 28)
								}
							})
						}
						this.numArry.push(num)
						return color[num]
					});

				node.append("text")
					.attr("dy", "12px")
					.style("text-anchor", "middle")
					.text(function(d) {
						return d.data.name;
					})
					.style("fill", "#ffffff");

				node.append("text")
					.attr("dy", "-1px")
					.style("text-anchor", "middle")
					.text(function(d) {
						return d.data.error_counts;
					})
					.style("fill", "#ffffff")
					.style("font", "22px sans-serif");

			},
			getData(value) {
				const id = value.data.id
				this.$parent.ChartShow = id
				const total = this.$parent.$refs[id][0].offsetTop
				let distance = document.documentElement.scrollTop || document.body.scrollTop
				// 平滑滚动，时长500ms，每10ms一跳，共50跳
				let step = total / 50
				if(total > distance) {
					smoothDown()
				} else {
					let newTotal = distance - total
					step = newTotal / 50
					smoothUp()
				}

				function smoothDown() {
					if(distance < total) {
						distance += step
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						setTimeout(smoothDown, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
					}
				}

				function smoothUp() {
					if(distance > total) {
						distance -= step
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						setTimeout(smoothUp, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
					}
				}
			}
		},
		mounted() {
			this.bubble()
		}
	}
</script>

<style lang="scss">
	text {
		font: 13px sans-serif;
		fill: #fff;
		transition: all 0.3s;
	}

	.label {
		fill: #000;
	}

	.chart {
		max-width: 600px;
		max-height: 600px;
		margin: 0 auto;
	}

	.chart-svg {
		width: 100%;
		height: 100%;
	}

	.node {
		@for $i from 1 through 30 {
			&:nth-child(#{$i}) .graph {
				$delay: $i * 0.075s;
				animation-delay: $delay;
			}
		}
	}

	.graph {
		opacity: 0;
		animation-name: animateIn;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	@keyframes animateIn {
		0% {
			opacity: 0;
			transform: scale(0.6) rotate(-15deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0);
		}
	}
</style>
