<template>
	<view class="content">
		<view style="padding:35px;">
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">微信2登录</button>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<button type="primary" open-type="getUserInfo" @click="getuserinfoh5appwx" withCredentials="true">微信1登录</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button type="primary" @click="wxAuth">测试跳转</button>
			<!-- #endif -->
			<button style="margin-top:50px;"  @click="goToIndexPage">手机号码登录</button>
		</view>
	</view>
</template>

<script>
	import _ from 'underscore'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log(_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0))
		},
		methods: {
			async goToIndexPage() {
				console.log(222)
				try{
					// uni.navigateTo({
					// 	url: '../order/index'
					// });
					let ret = await 
					uni.switchTab({
					    url: '/pages/order/index'
					})
				}catch(e){
					//TODO handle the exception
					console.log(11, e)
				}
			},
			async getuserinfo() {
				await this.goToIndexPage()
			},
			async wxAuth() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('-------获取code-------')
						console.log(loginRes.code)
					}
				});
			}
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
