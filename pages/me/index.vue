<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
		<view class="header">
			<view class="user">
				<image class="user-icon" :src="userInfo.avatarUrl || defaultIcon" mode="aspectFit"></image>
				<view class="name">{{userInfo.nickName || '神秘人'}}</view>
			</view>
			<view class="module">
				<view class="item" v-for="(item, idx) in moduleList" :key="idx">
					<view class="text">{{item.text}}</view>
					<view class="append">{{item.append}}</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// import _ from 'underscore'
	export default {
		data() {
			return {
				defaultIcon: 'https://s.beta.gtimg.com/hospital_img/pay-assist/static/default.jpg',
				title: 'Hello',
				userInfo: {},
				moduleList: [
					{
						text: '1859',
						append: '积分商城'
					}, {
						text: '2',
						append: '优惠券'
					}, {
						text: '84.07',
						append: '钱包·充值'
					}
				]
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo') || '{}')
			// console.log(1111111, )
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
	.header {
		height: 340rpx;
		background: #ff845e;
		width: 100%;
		color: #fff;
		position: relative;
	}
	.user-icon {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		margin-left: 60rpx
	}
	.module {
		display: flex;
	}
	.item {
		flex: 1;
		text-align: center;
	}
	.item .text {
		font-size: 34rpx;
		padding-top: 16rpx;
	}
	.item .append {
		font-size: 20rpx;
		padding-top: 8rpx;
	}
	.user {
		height: 160rpx;
		display: flex;
		align-content: center;
		align-items: center;
	}
	.user .name {
		margin-left: 30rpx;
	}
</style>
