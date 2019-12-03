<template>
	<view class="container">
		<view v-if="productListIncart.length">
			<view class="list">
				<view class="item" v-for="(item, idx) in productListIncart" :key="idx">
					<view class="img">
						<image class="icon" :src="item.imgUrl" mode="aspectFit"></image>
					</view>
					<view class="describe">
						<view class="text">{{item.text}}</view>
						<view class="append">{{item.append}}</view>
						<view class="discount-price">¥{{item.discountPrice}}</view>
						<view class="origin-price">¥{{item.originalPrice}}</view>
						<view class="counter">
							<view class="minus">-</view>
							<view class="count">{{ productListMapIncart[item.id] }}</view>
							<view class="plus">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="no-product">
			空空如也~快去挑选你的商品吧~
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: mapState({
			productListIncart: state => state.cart.productList,
			productListMapIncart: state => state.cart.productMap
		}),
		onShow() {
			console.log(9999999, this.productListIncart)
		}
	}
</script>

<style>
	page {
	    height: 100%;
		background: #F1F1F1;
	}
	.no-product {
		text-align: center;
		padding: 100rpx;
	}
	.item {
		background: #fff;
		margin: 20rpx 30rpx;
		display: flex;
		align-items: center;
	}
	.list .icon {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}
	.list .text {
		font-size: 32rpx;
		padding-top: 20rpx;
	}
	.list .append {
		font-size: 20rpx;
		padding-top: 8rpx;
	}
	.list .discount-price {
		font-size: 26rpx;
		padding-top: 40rpx;
	}
	.list .origin-price {
		font-size: 32rpx;
		color: pink;
		padding-bottom: 30rpx;
	}
	.img {
		flex-grow: 1;
		text-align: center;
	}
	.describe {
		flex-grow: 2;
		position: relative;
	}
	.counter {
		position: absolute;
		bottom: 20rpx;
		right: 30rpx;
		display: flex;
	}
	.minus, .plus {
		border: 1px solid #888;
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 50%;
		color: #888;
	}
	.count {
		padding: 0 20rpx;
		font-size: 30rpx;
	}
</style>
