<template>
	<view>
		<view class="header">
			<view class="info">
				<view>总资产(元)</view>
				<view>{{amount}}</view>
				<view>
					<text>累计充值(元)：{{rechange_amount||"0.00"}}</text>
					<text>|</text>
					<text>累计消费(元)：{{consume_amount||"0.00"}}</text>
				</view>
			</view>
		</view>
		
		<view class="log">
			<view class="log-box" @click="$utils.navigateTo('bill/cashlist')">
				<view><image src="../../static/images/wallet/1.png"></view>
				<view>申请提现</view>
			</view>
			<view class="log-box" @click="$utils.navigateTo('bill/fund')">
				<view><image src="../../static/images/wallet/2.png"></view>
				<view>资金明细</view>
			</view>
			<view class="log-box" @click="$utils.navigateTo('ucenter/point')">
				<view><image src="../../static/images/wallet/3.png"></view>
				<view>积分中心</view>
			</view>
		</view>
		
		<view class="receive">
			<view class="c" @click="$utils.navigateTo('point/index')">
				<view>
					<text>积分商品兑换</text>
					<text>赚积分抵现金</text>
				</view>
			</view>
			<view class="c" @click="$utils.navigateTo('coupon/index')">
				<view>
					<text>领取优惠券</text>
					<text>满减享优惠</text>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
    export default {
        data() {
            return {
                amount:0.00,
                rechange_amount:0.00,
                consume_amount:0.00,
            };
        },
        onShow() {
			this.$utils.navigateTo()
            let users = this.$storage.getJson("users");
            this.amount = users.amount;
            this.$http.getWallet().then((res)=>{
                if(res.status){
                    this.amount = res.data.amount;
                    this.rechange_amount = res.data.rechange_amount;
                    this.consume_amount = res.data.consume_amount;
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    background-image: url(~@/static/images/wallet-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 400rpx;
    position: relative;
    z-index: 1;
    .rechange{
        position: absolute;
        top: 135rpx;
        right: 0;
        width: 180rpx;
        height: 60rpx;
        line-height: 60rpx;
        background-color: #cb565c;
        color: #fff;
        border-top-left-radius: 100rpx;
        border-bottom-left-radius: 100rpx;
        text-align: center;
        z-index: 9999;
    }
    .info{
        position: absolute;
        top: 135rpx;
        left: 30rpx;
        color: #fff;
        view:nth-child(1){
            font-size: 35rpx;
        }
        view:nth-child(2){
            font-size: 58rpx;
            padding-top: 20rpx;
        }
        view:nth-child(3){
            font-size: 26rpx;
            padding-top: 30rpx;
            text:nth-child(2){
                padding: 0 10rpx;
                position: relative;
                top: -2rpx;
            }
        }
    }
}
.log{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    background-color: #fff;
    .log-box {
        width: 33.333%;
        height: 200rpx;
		font-size: 30rpx;
        view {
            display: block;
            text-align: center;
            &:first-child{
                margin-top: 40rpx;
            }
            &:last-child {
                margin-top: 20rpx;
            }
        }
        &:nth-child(1){
            image { width: 62rpx; height: 58rpx; }
        }
        &:nth-child(2){
            image { width: 54rpx; height: 62rpx; }
        }
        &:nth-child(3){
            image { width: 72rpx; height: 56rpx; }
        }
    }
}
.receive{
    width: 100%;
    height: 180rpx;
    margin-top: 20rpx;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .c {
        width: 50%;
        height: 180rpx;
        view{
            position: relative;
            margin-top: 40rpx;
            margin-left: 120rpx;
            text:first-child { font-size: 32rpx; color: #b91922 }
            text:last-child { padding-top: 8rpx; font-size: 24rpx; color: #999999; }
        }
        &:first-child view:before {
            position: absolute;
            left: -80rpx;
            top: 12rpx;
            content: " ";
            width: 60rpx;
            height: 66rpx;
            background-size: 100%;
            background-repeat: no-repeat;
            background-image: url(~@/static/images/wallet/4.png);
        }
        &:last-child view:before {
            position: absolute;
            left: -64rpx;
            top: -2rpx;
            content: " ";
            width: 46rpx;
            height: 82rpx;
            background-size: 100%;
            background-repeat: no-repeat;
            background-image: url(~@/static/images/wallet/5.png);
        }
        text {
            display: block;
        }
    }
}

</style>