<template>
	<view>
	<scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
		<view class="SHfooter">
		<navigator url="../index/index" open-type="navigate" class="back"></navigator>
		</view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 工具栏 -->
		<view class="TPtoolbar">
			<view class="TPtitle">鉴别服务开创者</view>
			<view class="TPtitle2">🛡24小时在线    🛡专业便捷</view>
			<!-- 占位 -->
			<view  class="place3"></view>
			<view class="TPbtn">
				<button class="TPjoinCart" @click="authentic">免费鉴别</button>
			</view>
		</view>
		<!-- 占位 -->
		<view  class="place2"></view>
		<!-- 我的团队 -->
		<view class="main">
			<view class="income-card">
				<view class="tit" >
					<!-- @click="goMyTeam" -->
					<text></text>
				</view>
				<view class="show-content">
					<view class="view-category">
						<view class="num">在线鉴别师</view>
						<view class="text">130位</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">成长中心</view>
						<view class="text">探索鉴别之道</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view  class="place2"></view>
		
		<!-- 新闻列表 -->
		<view class="toolbar">
			<view class="newsList" v-if="index < 4" v-for="(news,index) in newsList" :key="index" @click="toDiscussPage(news)">
				<view class="tuwen">
					<image v-if="news.image_url" class="newsListImg" :src="news.image_url" mode="aspectFit"></image>
					<view class="wen">
						<text class="newsListText">{{news.comment_count}}条评论</text>
						<text class="newsListText">{{news.datetime}}</text>
					</view>	
				</view>	
				<uni-list-item class="discussList" :title="news.title" :note="news.source" 
				></uni-list-item>
			</view>
		</view>
		
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="share">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @click="sendDiscuss">立即发布</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="SHshare" :class="shareClass"  @tap="hideShare">
			<!-- @touchmove.stop.prevent="discard" -->
			<view class="SHmask"></view>
			<view class="SHlayer" >
				<view class="SHh1">分享</view>
				<view class="SHlist">
					<view class="SHbox">
						<image src="/static/merchandise/share/wx.png"></image>
						<view class="SHtitle">
							微信好友
						</view>
					</view>
					<view class="SHbox">
						<image src="/static/merchandise/share/pyq.png"></image>
						<view class="SHtitle">
							朋友圈
						</view>
					</view>
					<view class="SHbox">
						<image src="/static/merchandise/share/wb.png"></image>
						<view class="SHtitle">
							新浪微博
						</view>
					</view>
					<view class="SHbox">
						<image src="/static/merchandise/share/qq.png"></image>
						<view class="SHtitle">
							QQ
						</view>
					</view>
				</view>
				<view class="SHbtn" @tap="hideShare">
					取消
				</view>
			</view>
		</view>
		
		<!-- authentic弹窗 -->
		<view class="share" :class="authenticClass"  @tap="hideAuthentic">
			<!-- @touchmove.stop.prevent="discard" -->
			<view class="mask"></view>
			<view class="layer" >
				<!-- 占位 -->
				<view  class="place"></view>
				<!-- 工具栏 -->
				<view class="toolbar">
					<view class="title">鉴别讨论区</view>
					<view class="title2">达人分享 互动交流 内容丰富</view>
					<view class="title2 title3">13，857，126人在讨论</view>
					<view class="btn">
						<button class="joinCart" @click="sendDiscuss">发布讨论</button>
					</view>
				</view>
				<!-- 占位 -->
				<view  class="place2"></view>
				<!-- 工具栏 -->
				<view class="toolbar">
					<view class="title">快速鉴别</view>
					<view class="title2">图片鉴别 品类全面 专业严谨</view>
					<view class="title2 title4">130位鉴别师在线</view>
					<view class="btn">
						<button class="joinCart" @click="toAuthentic">免费鉴别</button>
					</view>
				</view>
				<!-- 取消 -->
				<view class="btn" @tap="hideAuthentic">
					取消
				</view>
			</view>
		</view>
		
		<view class="loading-text">正在加载中...</view>
	</scroll-view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authenticClass:'',
				shareClass:'',
				newsList:[]
			}
		},
		onLoad() {
			this.authenticClass = 'show'
			uniCloud.callFunction({
				name:"newsList",
				success: (e) => {
					this.newsList = e.result.data
					console.log(e)
					console.log(this.newsList)
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
			//鉴别
			authentic(){
				this.authenticClass = 'show';
			},
			hideAuthentic(){
				this.authenticClass = 'hide';
				setTimeout(() => {
					this.authenticClass = 'none';
				}, 150);
			},
			sendDiscuss(){
				uni.navigateTo({
					url:"../discuss/sendDiscuss"
				})
			},
			toAuthentic(){
				uni.navigateTo({
					url:"selectCategory"
				})
			},
			toDiscussPage(e){
				uni.navigateTo({
					url:'../discuss/discuss?id=' + e.article_type
				})
			}
		}
	}
</script>

<style lang="scss">
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
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.btn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
		}
	}
}
.place{
		background-color: #F2F3F7;
		height: 42upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
.place3{
		background-color: #ffffff;
		height: 42upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
.place2{
		background-color: #F2F3F7;
		height: 5upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
.toolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.title{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 42upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}
		.title2{
			margin: 0 0 10upx 3%;
			font-size: 20upx;
			display: flex;
			align-items: center;
			color: #797979;
		}
		.title3::before{
			content:url(../../static/authentic/student.png) ;
		}
		.title4::before{
			content:url(../../static/authentic/teacher.png) ;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			.box{
				width: 25%;
				margin-bottom: 30upx;
				.img{
					width: 23vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;
					
					image{
						width: 9vw;
						height: 9vw;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 26upx;
					color: #3d3d3d;
				}
			}
		}
}
.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart {
			height: 80upx;
			padding: 0 100upx;
			color: #fff;
			display: flex;
			align-items:center;
			font-size: 28upx;
			background-color: #42c2f0;
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
}
.icon.fenxiang::before{
	content:url(/static/merchandise/share.png) ;
}	
.SHshare{
	display: none;
	&.show {
		display: block;
		.SHmask{
			animation: showPopup 0.15s linear both;
		}
		.SHlayer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.SHmask{
			animation: hidePopup 0.15s linear both;
		}
		
		.SHlayer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.SHmask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.SHlayer{
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.SHlist{
			width: 100%;
			display: flex;
			padding:10upx 0 30upx 0;
			.SHbox{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.SHtitle{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26upx;
				}
			}
		}
		.SHbtn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-top: solid 1upx #666666;
		}
		.SHh1{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
		}
	}
}
.back::before{
		content:url(/static/authentic/toBack.png) ;
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
.TPtoolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(255, 255, 255, 0.1);
		border-radius: 15upx;
		
		.TPtitle{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 60upx;
			height: 140upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.TPtitle2{
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #797979;
		}
}
.TPbtn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		margin-right: -2%;
		.TPjoinCart {
			height: 80upx;
			padding: 0 250upx;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items:center;
			font-size: 28upx;
			background-color: #42c2f0;
		}
}
.main {
		padding: 20upx;
	
		.income-card {
			width: 90%;
			background-color: #ffffff;
			border-radius: 20upx;
			padding: 15px;
	
			.tit {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32upx;
				line-height: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
	
				image {
					width: 10upx;
					height: 21upx;
				}
			}
	
			.show-content {
				display: flex;
				justify-content: space-around;
				align-items: center;
	
				.view-category {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
	
					.num {
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 800;
						color: #333333;
					}
	
					.text {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
					}
				}
	
				.line {
					width: 1px;
					height: 65upx;
					background-color: #E6E6E6;
				}
			}
		}
	
		.tool-card {
			background-color: #ffffff;
			width: 100%;
			padding: 0 30upx;
			margin-top: 20upx;
			border-radius: 20upx;
	
			.tool-item {
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 100upx;
				align-items: center;
				justify-content: space-between;
	
				.view-image-left {
					width: 44upx;
				}
	
				.item-right {
					flex: 1;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
	
					.view-text {
						margin-left: 22upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #1A1A1A;
					}
	
					.view-image-right {
						width: 10upx;
						height: 21upx;
					}
				}
			}
		}
}
.toolbar{
		width: 92%;
		margin: 0 4% 0 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
}
.newsList{
	display: flex;
	flex-direction: row-reverse;
}
.newsListImg{
	border-top: 0.5upx solid rgba(0,0,0,0.1);
}
.newsListText{
	display: flex;
	flex-direction: column-reverse;
	font-size: 30upx;
	color: rgba(162, 162, 162, 1.0);
	margin-left: 20upx;
}
uni-image{
	width: 300upx;
	height: 300upx;
}
.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
}
.tuwen{
	display: flex;
	flex-direction: column;
}
.wen{
	display: flex;
}
.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
}
.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
</style>
