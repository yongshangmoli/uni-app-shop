<template>
	<view class="content">
		<view class="header-wrapper">
			<text class="shop">由{{shopName}}送出</text>
			<view class="list">
				<view class="list-item" v-for="(item, idx) in bannerMenu" :key="idx">
					<image class="icon" :src="item.imgUrl" mode="aspectFit"></image>
					<view class="text">{{item.text || 'aaaaa'}}</view>
					<view class="append">{{item.append || 'ds'}}</view>
				</view>
			</view>
		</view>
		<swiper class="swiper-wrapper" autoplay="true">
			<swiper-item v-for="(item, idx) in swiperImgs" :key="idx">
				<image class="swiper-item" :src="item" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view class="recommand-wrapper">
			<text class="section-title">好吃推荐</text>
			<scroll-view scroll-x="true" class="scroll-wrapper">
			  <view class="recommend-item" v-for="(item, idx) in recommendList" :key="idx">
				<image class="icon" :src="item.imgUrl" mode="aspectFit"></image>
			  	<view class="text">{{item.text}}</view>
			  	<view class="append">{{item.append}}</view>
				<view class="discount-price">¥{{item.discountPrice}}</view>
				<view class="origin-price">¥{{item.originalPrice}}</view>
				<view class="item-cart-wrapper" @click="shoppingHandler(item)">
					<image class="item-cart" :src="shoppingIcon" mode="aspectFit"></image>
				</view>
			  </view>
			</scroll-view>
		</view>
		<view class="select-wrapper">
			<text class="section-title">为你优选</text>
			<view>
				<view class="recommend-item select-item" v-for="(item, idx) in recommendList" :key="idx">
					<image class="icon" :src="item.imgUrl" mode="aspectFit"></image>
					<view class="text">{{item.text}}</view>
					<view class="append">{{item.append}}</view>
					<view class="discount-price">¥{{item.discountPrice}}</view>
					<view class="origin-price">¥{{item.originalPrice}}</view>
					<view class="item-cart-wrapper" @click="shoppingHandler(item)">
						<image class="item-cart" :src="shoppingIcon" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cart-icon-wrapper" @click="viewCart">
			<view class="cart-quantity">{{quantityCount}}</view>
			<image class="cart-icon" :src="shoppingIcon" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import _ from 'underscore'
	import { mapState } from 'vuex'
	
	const bannerIconUrl = 'https://source.unsplash.com/random/100x100'
	const swiperImgUrl = 'https://source.unsplash.com/random/750x260'
	const scrollImgUrl = 'https://source.unsplash.com/random/300x300'
	
	export default {
		data() {
			return {
				shoppingIcon: 'http://pic.51yuansu.com/pic2/cover/00/41/50/581357ed765f7_610.jpg',
				quantityCount: 0,
				shopName: '缤纷年华',
				bannerMenu: [
					{
						imgUrl: bannerIconUrl,
						text: '会员码',
						append: '快捷识别会员'
					}, {
						imgUrl: bannerIconUrl,
						text: '优惠券',
						append: '0'
					}, {
						imgUrl: bannerIconUrl,
						text: '钱包·重置',
						append: '10'
					}
				],
				swiperImgs: Array.from({length:3}).fill(swiperImgUrl),
				recommendList: [
					{
						id: 1,
						imgUrl: scrollImgUrl,
						text: '进口香蕉',
						append: '1份/400-500g',
						discountPrice: '3.98',
						originalPrice: '4.00'
					},
					{
						id: 2,
						imgUrl: scrollImgUrl,
						text: '水晶红富士',
						append: '1份/400-500g',
						discountPrice: '4.50',
						originalPrice: '6.00'
					},
					{
						id: 3,
						imgUrl: scrollImgUrl,
						text: '泰国椰青',
						append: '1个',
						discountPrice: '1.08',
						originalPrice: '1.10'
					},
					{
						id: 4,
						imgUrl: scrollImgUrl,
						text: '美国樱桃',
						append: '1份/250g',
						discountPrice: '49.88',
						originalPrice: '50.00'
					},
					{
						id: 5,
						imgUrl: scrollImgUrl,
						text: '香水柠檬',
						append: '1个',
						discountPrice: '3.98',
						originalPrice: '4.00'
					}
				]
			}
		},
		onLoad() {
			console.log(_.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0))
			// console.log(11111, this.$minApi.get)
		},
		computed: {
			...mapState({
				productListIncart: state => state.cart.productList,
				productListMapIncart: state => state.cart.productMap
			})
		},
		methods: {
			productQuantity () {
				let keys = Object.keys(this.productListMapIncart)
				let count = 0
				keys.map(v => {
					let ct = this.productListMapIncart[v]
					if (ct) {
						count += ct
					}
				})
				// console.log(22222, count)
				return count
			},
			shoppingHandler (item) {
				console.log('加入购物车：', item)
				this.$store.dispatch('cart/addProducts', {
					product: item,
					cb: () => {
						this.quantityCount = this.productQuantity()
					}
				})
			},
			viewCart () {
				console.log('购物车里商品状况', this.productListIncart, this.productListMapIncart)
				uni.navigateTo({
					url: '../detail/index'
				})
			}
		}
	}
</script>

<style>
	.center {
		text-align: center;
	}
	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		font-size: 26rpx;
	}
	.header-wrapper {
		height: 340rpx;
		background: #ff845e;
		width: 100%;
		color: #fff;
		position: relative;
	}
	.shop {
		padding: 16rpx 40rpx;
		display: block;
	}
	.list {
		display: flex;
		height: 85%;
		width: 100%;
		position: absolute;
		top: 15%;
		align-items: center;
		text-align: center;
	}
	.list-item {
		flex: 1;
	}
	.list-item .icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 8rpx;
	}
	.list-item .text {
		font-size: 26rpx;
		padding-top: 16rpx;
	}
	.list-item .append {
		font-size: 20rpx;
		padding-top: 8rpx;
	}
	.swiper-wrapper {
		display: block;
		height: 150px;
		width: 95%;
		border-radius: 16rpx;
		margin: 0 auto;
		position: relative;
	}
	.swiper-item {
		width: 750rpx;
		height: 100%;
	}
	.recommand-wrapper, .select-wrapper {
		width: 95%;
		margin: 0 auto;
		position: relative;
	}
	.section-title {
		font-weight: bold;
		font-size: 32rpx;
	}
	.scroll-wrapper {
		/* height:110px; */
		white-space: nowrap;
		padding: 10rpx 0;
	}
	.recommend-item {
		display: inline-block;
		width: 280rpx;
		text-align: center;
		position: relative;
	}
	.recommend-item .icon {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}
	.recommend-item .text {
		font-size: 26rpx;
		padding-top: 16rpx;
	}
	.recommend-item .append {
		font-size: 20rpx;
		color: #888;
		padding: 8rpx 0;
	}
	.recommend-item .discount-price {
		color: #ff845e;
		padding-top: 20rpx;
	}
	.recommend-item .origin-price {
		color: #888;
		font-size: 20rpx;
		text-decoration: line-through;
	}
	.select-item {
		width: 350rpx !important;
	}
	.cart-icon-wrapper {
		position: fixed;
		bottom: 20rpx;
		left: 20rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.cart-icon {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.cart-quantity {
		position: absolute;
		right: 0;
		top: 0rpx;
		color: #ff845e;
	}
	.item-cart-wrapper {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.item-cart {
		width: 100%;
		height: 100%;
	}
</style>
