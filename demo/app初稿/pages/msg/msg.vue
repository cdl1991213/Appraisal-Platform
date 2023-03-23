<template>
	<view class="content">
		<!-- 占位 -->
		<view class="place"></view>
		<view class="footer">
		<navigator url="../index/index" open-type="navigate" class="back"></navigator>
		</view>
		<div class="aui-news-box">
			<a href="javascript:;" class="aui-news-item" v-for="(list, i) in lists" :key="i">
				<div class="aui-news-item-hd">
					<img :src="list.img" alt="">
				</div>
				<div class="aui-news-item-bd">
					<h4>{{list.tit1}}</h4>
					<p>{{list.tit2}}</p>
				</div>
				<span class="aui-news-item-fr">{{list.time}}</span>
			</a>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				lists: [
					{
						"tit1": "服务通知",
						"tit2": "您尊贵的会员身份还剩1天过期，请及时续费",
						"time": "12:23",
						"img": '../../static/msg/icon-item-001.png'
					},
					{
						"tit1": "优惠促销",
						"tit2": "您订购的【李宁 灭世拖鞋】已被接单，请您等待卖家发货",
						"time": "08:48",
						"img": '../../static/msg/icon-item-002.png'
					},
					{
						"tit1": "账户通知",
						"tit2": "您的密码存在风险，请及时修改",
						"time": "昨天",
						"img": '../../static/msg/icon-item-003.png'
					},
					{
						"tit1": "互动问答",
						"tit2": "您为用户【风吹没落】提供的鉴定服务已被接纳",
						"time": "星期六",
						"img": '../../static/msg/icon-item-004.png'
					},
					{
						"tit1": "物流助手",
						"tit2": "您的订单正在派送，请及时查收",
						"time": "星期六",
						"img": '../../static/msg/icon-item-005.png'
					},
				],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import '/static/css/style.css';
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: left;
		font-size: 28rpx;
		margin-top: 10rpx;
		color: rgba(0,0,0,0.7);
		text-align: left;
		height: 40rpx;
		line-height: 3px;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
	.back{
		margin-left: 20rpx;
		margin-top: 17rpx;
	}
	.back::before{
		content:url(../../static/authentic/toBack.png) ;
	}
.place {
		background-color: #ffffff;
		height: 35upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
</style>
