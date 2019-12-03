<template>
	<view v-if="showPage" class="authorize-contianer">
		<image class="authorize-icon" src="../../static/icon/authorize.png"></image>
		<view class="auth-item">冒牌百果园 申请获取您的权限</view>
		<view class="btn-authorize">
			<button open-type="getUserInfo" type="primary" lang="zh_CN" @getuserinfo="onGotUserInfo">授权</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPage: false
			}
		},
		methods: {
			onGotUserInfo (e) {
				try {
					let authInfo = e.detail.userInfo
					console.log(authInfo)
					if (authInfo) {
						uni.setStorageSync('userInfo', {
							avatarUrl: authInfo.avatarUrl,
							nickName: authInfo.nickName
						})
					}
					uni.switchTab({
						url: '/pages/index/index'
					})
				} catch(e) {
					//TODO handle the exception
					console.log('onGotUserInfo', e);
				}
			}
		},
		onLoad () {
			let that = this
			// #ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					let authed = res.authSetting['scope.userInfo']
					console.log(111, authed)
					if (!authed) {
						that.showPage = true
					} else {
						uni.getUserInfo({
							provider: 'weixin',
							success: function (infoRes) {
								try {
									uni.setStorageSync('userInfo', infoRes.rawData)
									uni.switchTab({
										url: '/pages/index/index'
									})
								} catch(e) {
									//TODO handle the exception
									console.log('onLoad', e);
								}
							}
						})
					}
				}
			})
			// #endif 
			// #ifdef MP-ALIPAY
			uni.switchTab({
			    url: '/pages/index/index'
			})
			// #endif
		}
	}
</script>

<style>
	page {
	    height: 100%;
	}
	.authorize-contianer {
	    height: 100%;
	    background: #fff;
	    text-align: center;
	    padding-top: 100rpx;
		box-sizing: border-box;
	}
	.authorize-icon {
		width: 128rpx;
		height: 128rpx;
		display: block;
		margin: 0 auto;
		padding-bottom: 10rpx;
	}
	.auth-item {
		padding: 5rpx 0;
	}
	.btn-authorize {
		margin: 100rpx 50rpx;
	}
</style>
