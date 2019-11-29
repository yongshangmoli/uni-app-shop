<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import _ from 'underscore'
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: mapState({
			test: state => state.cart.test
		}),
		onLoad() {
			console.log(_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0), this.test)
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
