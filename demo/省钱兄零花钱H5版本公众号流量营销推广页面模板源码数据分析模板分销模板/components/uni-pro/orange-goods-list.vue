<template>

	<view class="coupon-page s-row rogan" v-bind:key='itemid'>
		<view class="image"  @tap="open(itemid)" >
			<image :src="itempic"></image>
		</view>
		<view class="content" style="padding-left: 20upx;">
			<view style="display: flex" @tap="open(itemid)">
				<text class="twolist-hidden">

					<text> {{ itemtitle }}</text>
				</text>
			</view>
			<view style="position: relative;top:16upx;left: 0;"  >
				<image src="https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/d87e89cd6c3f4b21b76c107effe0fd23.png" style="width: 92upx;height: 34upx;"></image>
				<view class="imgvewi">￥{{couponmoney}}元劵</view>
			</view>
			<view class="viewfeng" >
				<text class="tmprice" style="margin-left: 10upx;">原价{{itemprice}}</text>
				<text class="volume" style="font-size: 22upx;color: #999999;">{{itemsale}}</text>
			</view>
			<view class="money s-row" style="margin-left: -12upx;display: flex;border-top:1upx dashed #CCCCCC;;padding-top: 10px;">

				<text class="coupon-price" style="color: #E20C0A;text-align: left;">
					<view class="coupon-price2">劵后价</view>
					<text style="font-size: 34upx"><text style="font-weight: bold;padding-left: 0upx;">￥{{itemendprice}}</text></text>
				</text>
				<button class="btnorg" @click="goHome">领劵购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orange-goods-list",
		props: [
			'isEnable', "itempic", "shopname", "tkmoneys", "itemtitle", "itemprice", "itemsale", "itemendprice", "couponmoney",
			"itemid",
			"logo", "tkmoney", "isInvitation"
		],

		methods: {
			goHome(){
				let pddpid = this.$queue.getData('pddpid');
				if (!pddpid) {
					pddpid=this.$queue.getPingDuoDuoPid();
				}
				this.$Request.getT('/pdd/promotion?pid=' + pddpid + '&webApp=true&goodId=' + this.itemid).then(res => {
					if (res.goodsPromotionUrlGenerateResponse) {
						let item = res.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
						
						if (res.goodsPromotionUrlGenerateResponse) {
							let item = res.goodsPromotionUrlGenerateResponse.goodsPromotionUrlList[0];
							
							let url = item.url;
							let weAppInfo = item.weAppInfo
							
							uni.navigateToMiniProgram({
								appId: weAppInfo.appId,
								path: weAppInfo.pagePath,
								envVersion: 'release',
								fail(res) {
									console.error(res)
								}
							})
						} else {
							this.$queue.showToast('领券失败');
						}
					}
				});
			},
			open(itemid) {
				let relation_id = this.$queue.getData("relation_id");
				console.log('open',itemid,relation_id)
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/pdd?itemid=" + itemid + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/pdd?itemid=" + itemid,
					})
				}
			},
		}
	}
</script>

<style>
	@import "../../static/css/index.css";

	.viewfeng {
		display: flex;
		justify-content: space-between;
		margin-top: 20upx;
		/* padding-bottom: 20upx; */
		/* border-bottom: 1upx dashed #CCCCCC; */
		margin-bottom: 20upx;
	}

	.quan {
		font-size: 12px;
		color: #FFFFFF;
		text-align: center;
		display: block;
		line-height: 32upx;
	}

	.twolist-hidden {
		height: 80upx;
		font-size: 28upx;
		margin-right: 4upx;
		margin-left: 4upx;
		width: 95%;
		max-lines: 2;
		overflow: hidden
	}

	.rogan {
		background: #f8f8f8;
		border-radius: 12upx;
		padding: 20upx 29rpx 16upx;
		margin: 26upx 22upx
	}

	.image {
		width: 250rpx;
		height: 260rpx;
		float: left;
	}

	.coupon-price2 {
		font-size: 22upx;
		color: #E20C0A;
		text-align: left;
	}

	.imageview {
		background-color: #E20C0A;
		width: 90upx;
		height: 32upx;
		margin-top: 6upx;
		margin-bottom: 6upx;
		border-radius: 10upx;
	}

	.btnorg {
		background-color: #ff1d6d;
		color: #FFFFFF;
		width: 186upx;
		height: 60upx;
		line-height: 60upx;
		margin-right: 0;
		text-align: center;
		font-size: 32upx;
	}
.imgvewi{
	font-size: 18upx;color: #FFFFFF;position: absolute;text-align: center;top: 4upx;left:6upx;
}
	.tmprice {
		font-size: 22upx;
		color: #999999;
		color: grey;
		text-decoration: line-through;
	}


</style>
