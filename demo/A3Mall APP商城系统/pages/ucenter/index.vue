<template>
    <view class="clear">

        <view class="header">
            <view class="info">
                <view class="avatar">
                    <image :src="avatar">
                </view>
                <view>{{username||"登录"}}</view>
            </view>

            <view class="amount">
                <view @click="go('ucenter/wallet')">
                    <text>￥{{amount||"0.00"}}</text>
                    <text>我的余额</text>
                </view>
                <view @click="go('ucenter/coupon')">
                    <text>{{coupon||0}}</text>
                    <text>优惠券</text>
                </view>
            </view>
        </view>

        <view class="content">
            <view class="content-box">
                <view class="title">我的订单</view>
                <view class="list-box">
                    <view class="box" @click="go('order/list',{ id: 1 })">
                        <view>
                            <text class="iconfont ucenter-icon">&#xe625;</text>
                            <text class="num" v-if="order_count.a">{{order_count.a}}</text>
                        </view>
                        <view>待付款</view>
                    </view>
                    <view class="box" @click="go('order/list',{ id: 2 })">
                        <view>
                            <text class="iconfont ucenter-icon">&#xe624;</text>
                            <text class="num" v-if="order_count.b">{{order_count.b}}</text>
                        </view>
                        <view>待发货</view>
                    </view>
                    <view class="box" @click="go('order/list',{ id: 3 })">
                        <view>
                            <text class="iconfont ucenter-icon">&#xe61d;</text>
                            <text class="num" v-if="order_count.c">{{order_count.c}}</text>
                        </view>
                        <view>待收货</view>
                    </view>
                    <view class="box" @click="go('order/list',{ id: 4 })">
                        <view>
                            <text class="iconfont ucenter-icon">&#xe622;</text>
                            <text class="num" v-if="order_count.d">{{order_count.d}}</text>
                        </view>
                        <view>待评价</view>
                    </view>
                    <view class="box" @click="go('order/service')">
                        <view><text class="iconfont ucenter-icon">&#xe627;</text></view>
                        <view>退换货</view>
                    </view>
                </view>
            </view>

            <view class="content-box">
                <view class="title">我的服务</view>
                <view class="list-box service-box">
                    <view class="box" @click="go('ucenter/wallet')">
                        <view><text class="iconfont ucenter-icon">&#xe625;</text></view>
                        <view>我的钱包</view>
                    </view>
                    <view class="box" @click="go('ucenter/collect')">
                        <view><text class="iconfont ucenter-icon">&#xe621;</text></view>
                        <view>我的收藏</view>
                    </view>
                    <view class="box" @click="go('ucenter/address')">
                        <view><text class="iconfont ucenter-icon">&#xe61e;</text></view>
                        <view>收货地址</view>
                    </view>
                    <view class="box" @click="go('ucenter/coupon')">
                        <view><text class="iconfont ucenter-icon">&#xe60b;</text></view>
                        <view>优惠券</view>
                    </view>
                    <view class="box" @click="go('ucenter/point')">
                        <view><text class="iconfont ucenter-icon">&#xe620;</text></view>
                        <view>我的积分</view>
                    </view>
                    <view class="box" @click="go('ucenter/setting')">
                        <view><text class="iconfont ucenter-icon">&#xe626;</text></view>
                        <view>会员设置</view>
                    </view>
					<view class="box" @click="go('ucenter/help')">
					    <view><text class="iconfont ucenter-icon">&#xe628;</text></view>
					    <view>帮助中心</view>
					</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                username:'',
                amount:0.00,
                coupon:0,
                avatar: "",
                order_count: {}
            };
        },
        onShow() {
            let users = this.$storage.getJson("users");
			if(users == null){
				this.$utils.navigateTo('public/login');
			}else{
				this.username = users.nickname || users.username || users.mobile;
				this.amount = users.amount;
				this.coupon = users.coupon_count;
				this.avatar = users.avatar;
				this.$http.getUcenter().then((res)=>{
				    if(res.status){
				        this.username = res.data.nickname || res.data.username || res.data.mobile;
				        this.amount = users.amount = res.data.amount;
				        this.coupon = users.coupon_count = res.data.coupon_count;
				        this.avatar = users.avatar = res.data.avatar;
				        this.order_count = res.data.order_count;
				        this.$store.commit("UPDATEUSERS",users);
				    }
				});
			}
        },
        methods: {
            go(value,param){
                let params = param || "";
                if(params == ""){
					this.$utils.navigateTo(value);
                }else{
					this.$utils.navigateTo(value,params);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 510rpx;
        background-image: url(~@/static/images/my.png);
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
        .info{
            position: absolute;
            top: 70rpx;
            left: 40rpx;
            view {
                float: left;
                image { width: 140rpx; height: 140rpx; display: block; border-radius: 50%; }
                &:last-child {
                    height: 140rpx; line-height: 140rpx; padding-left: 24rpx; font-size: 36rpx; color: #fff;
                }
            }
        }
        .amount{
            position: absolute;
            top: 230rpx;
            width: 100%;
            view {
                width: 50%; float: left;
                text { display: block; color: #fff; text-align: center }
                text:first-child { font-size: 34rpx; }
                text:last-child { font-size: 26rpx; padding-top: 10rpx; }
            }
        }
    }
    .content {
        margin: -160rpx 40rpx 0 40rpx;
        position: relative;
        .content-box{
            width: 100%;
            float: left;
            border-radius: 10rpx;
            background-color: #fff;
            &:last-child { margin-top: 30rpx; margin-bottom: 30rpx; }
            .title{
                font-size: 32rpx;
                color: #666;
                width: 100%;
                float: left;
                border-bottom: 2rpx solid #ebebeb;
                height: 100rpx;
                line-height: 100rpx;
                text-indent: 30rpx;
            }
            .list-box{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                .box{
                    width: 20%;
                    padding: 20rpx 0;
                    view {
                        display: block; text-align: center; font-size: 26rpx; color: #666;
                        &:first-child {
                            position: relative;
                            .num {
                                position: absolute;
                                top: 10rpx;
                                right: 38rpx;
                                box-sizing: border-box;
                                min-width: 32rpx;
                                padding: 0 6rpx;
                                color: #fff;
                                font-weight: 500;
                                font-size: 24rpx;
                                line-height: 28rpx;
                                text-align: center;
                                background-color: #ee0a24;
                                border: 1px solid #fff;
                                border-radius: 32rpx;
                                transform: translate(50%,-50%);
                                transform-origin: 100%;
                            }
                        }
                    }
					.ucenter-icon {
						font-size: 50rpx;
					}
                }
            }
            .service-box{
                .box{
                    width: 25%;
                    padding: 20rpx 0;
                    view { display: block; text-align: center; font-size: 26rpx; color: #666; }
                }
            }
        }
    }
</style>