<template>
    <view class="wrap">
        <view class="top c">
            <image src="../../static/images/empty.png">
        </view>
        <view class="title c">抱歉，页面发生错误</view>
        <view class="intro c">{{msg}}</view>
        <view class="btn c">
            <text @click="$utils.navigateTo('cart/index')">返回购物车</text>
        </view>
    </view>
</template>

<script>
	export default {
		data(){
			return {
				msg: ""
			};
		},
		onLoad() {
			this.msg = this.$storage.get("order_msg");
		}
	}
</script>
<style lang="scss" scoped>
.wrap{
    background-color: #fff;
    height: 100vh;
    .c{
        width: 100%;
        float: left;
        text-align: center;
    }
    .top{
        margin-top: 200rpx;
        image {
            width: 50%;
        }
    }
    .title{
        font-size: 46rpx;
        color: #333;
        margin-top: 70rpx;
    }
    .intro{
        margin-top: 60rpx;
        color: #666;
    }
    .btn{
        margin-top: 90rpx;
        text{
            width: 100px;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            color: #fff;
            background-color: #b71c1c;
            font-size: 30rpx;
            display: inline-block;
            border-radius: 10rpx;
        }
    }
}
</style>