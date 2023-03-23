<template>
	<view class="main">
	<scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
			<view class="SHfooter">
			<navigator url="../index/index" open-type="navigate" class="back"></navigator>
			</view>
			<!-- 占位 -->
			<view  class="place3"></view>
			<!-- 内容 -->
			<view class="introduce-section">
				<text class="title">{{newsList[article_type].title}}</text>
				<view class="introduce">
					<text>{{newsList[article_type].source}}</text>
					<text>{{newsList[article_type].comment_count}}条评论</text>
					<text>{{newsList[article_type].datetime}}</text>
				</view>
			</view>
			<image :src="newsList[article_type].image_url" mode="aspectFit"></image>
			<!-- 文章 -->
			<view class="introduce-section">
				<text class="title">{{newsList[article_type].content}}</text>
			</view>
			<!-- 底部菜单 -->
			<view class="footer">
				<view class="icons">
					<view class="box" @tap="share">
						<view class="icon fenxiang"></view>
						<view class="text">分享</view>
					</view>
				</view>
				<view class="icons">
					<view class="box" >
						<view class="icon pinglun"></view>
						<view class="text">评论</view>
					</view>
				</view>
				<view class="icons">
					<view class="box" >
						<view class="icon dianzan"></view>
						<view class="text">99个赞</view>
					</view>
				</view>
				<view class="btn">
					<view class="joinCart" @click="sendDiscuss">发布讨论</view>
				</view>
			</view>
			<!-- share弹窗 -->
			<view class="share" :class="shareClass"  @tap="hideShare">
				<!-- @touchmove.stop.prevent="discard" -->
				<view class="mask"></view>
				<view class="layer" >
					<view class="h1">分享</view>
					<view class="list">
						<view class="box">
							<image src="/static/merchandise/share/wx.png"></image>
							<view class="title">
								微信好友
							</view>
						</view>
						<view class="box">
							<image src="/static/merchandise/share/pyq.png"></image>
							<view class="title">
								朋友圈
							</view>
						</view>
						<view class="box">
							<image src="/static/merchandise/share/wb.png"></image>
							<view class="title">
								新浪微博
							</view>
						</view>
						<view class="box">
							<image src="/static/merchandise/share/qq.png"></image>
							<view class="title">
								QQ
							</view>
						</view>
					</view>
					<view class="btn" @tap="hideShare">
						取消
					</view>
				</view>
			</view>
			
			
	</scroll-view>			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				shareClass:'',
				newsList:[],
				article_type:0
			}
		},
		onLoad(option){
			this.article_type = option.id
			/* console.log(option) */
			uniCloud.callFunction({
				name:"newsList",
				success: (e) => {
					this.newsList = e.result.data
					/* console.log(this.newsList) */
				}
			})
		},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
			},
			// 分享
			share(){
				this.shareClass = 'show';
			},
			hideShare(){
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},
			sendDiscuss(){
				uni.navigateTo({
					url:"sendDiscuss"
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '@/static/css/detail.scss';
	@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(-100%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(-100%);
			}
			100% {
				transform: translateY(0);
			}
		}
.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
.place3{
		background-color: #ffffff;
		height: 42upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
.SHfooter{
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
	.SHfooter text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
	.back{
		margin-left: 20rpx;
		margin-top: 17rpx;
}
.back::before{
		content:url(/static/authentic/toBack.png) ;
}
/* 简介 */
.introduce-section {
	display: flex;
	flex-direction: column;
	padding: 20upx 30upx;
	background: #fff;
	line-height: 1.5;

	.title {
		font-size: 36upx;
		color: #303133;
		margin-bottom: 16upx;
	}
	.introduce {
		display: flex;
		font-size: 26upx;
		color: #909399;
		text {
			margin-right: 16upx;
		}
	}
}
/* 点赞等操作 */
.actions {
	display: flex;
	justify-content: space-around;
	align-items: center;
	line-height: 1.3;
	padding: 10upx 40upx 20upx;

	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #999;
	}
	.yticon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60upx;
		height: 60upx;
		font-size: 52upx;

		&.reverse {
			position: relative;
			top: 6upx;
			transform: scaleY(-1);
		}
		&.active {
			color: #ec706b;
		}
	}
	.icon-fenxiang2 {
		font-weight: bold;
		font-size: 36upx;
	}
	.icon-shoucang {
		font-size: 44upx;
	}
}

.s-header {
	padding: 20upx 30upx;
	font-size: 30upx;
	color: #303133;
	background: #fff;
	margin-top: 16upx;

	&:before {
		content: '';
		width: 0;
		height: 40upx;
		margin-right: 24upx;
		border-left: 6upx solid #ec706b;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 92%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 120upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			background-color: #408dda;
		}
		.buy {
			background-color: #f06c7a;
		}
	}
}
.icon.fenxiang::before{
	content:url(/static/merchandise/share.png) ;
}
.icon.pinglun::before{
	content:url(/static/merchandise/pinglun.png) ;
}
.icon.dianzan::before{
	content:url(/static/merchandise/dianzan.png) ;
}
.share{
	display: none;
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.15s linear both;
		}
		.layer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.15s linear both;
		}
		
		.layer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.layer{
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.list{
			width: 100%;
			display: flex;
			padding:10upx 0 30upx 0;
			.box{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.title{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26upx;
				}
			}
		}
		.btn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-top: solid 1upx #666666;
		}
		.h1{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
		}
	}
}
</style>
