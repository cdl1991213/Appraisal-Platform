<template>
	<view class="all">
	<scroll-view class="main_box" scroll-y="true">	
		<!-- 占位 -->
		<view  class="place" @click="backLogin">退出登录</view>
		<!-- 用户信息 -->
		<view class="user">
			<!-- 头像 -->
			<view class="left">
				<image :src="mycenter[loginId].txurl"></image>
			</view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view class="username" >{{mycenter[loginId].nicheng}}</view>
				<view class="signature" >{{mycenter[loginId].qianming}}</view>
			</view>
		</view>
		<!-- VIP banner -->
		<view class="VIP">
			<view class="img">
				<image src="/static/mycenter/VIP.png"></image>
			</view>
			<view class="title">开通VIP会员</view>
			<view class="tis">会员特权</view>
		</view>
		
		<!-- 我的团队 -->
		<view class="main">
			<view class="income-card">
				<view class="tit" >
					<!-- @click="goMyTeam" -->
					<text></text>
					<image src="/static/mycenter/right_icon.png" mode=""></image>
				</view>
				<view class="show-content">
					<view class="view-category">
						<view class="num">收藏夹</view>
						<view class="text">11件</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">订单中心</view>
						<view class="text">11件</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">优惠券</view>
						<view class="text">6张</view>
					</view>
				</view>
			</view>
		</view>	
			
		<view class="main">
			<view class="income-card">		
				<view class="tit" >
					<!-- @click="goMyTeam" -->
					<text></text>
					<image src="/static/mycenter/right_icon.png" mode=""></image>
				</view>
				<view class="show-content">
					<view class="view-category">
						<view class="num">已鉴定</view>
						<view class="text">63件</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">已发布</view>
						<view class="text">21篇</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">被评论</view>
						<view class="text">54次</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">被点赞</view>
						<view class="text">360次</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">我的工具栏</view>
			<view class="list">
				<view class="box" v-for="(row,index) in mytoolbarList" :key="index">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view  class="place2"></view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">鉴定工具</view>
			<view class="list">
				<view class="box" v-for="(row,index) in mytoolbarList2" :key="index">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
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
				// 工具栏列表
				mytoolbarList:[
					{text:'砍价免费拿',img:'/static/mycenter/user/point.png'},
					{text:'免费抽奖',img:'/static/mycenter/user/quan.png'}, 
					{text:'领现金',img:'/static/mycenter/user/renw.png'},
					{text:'识货口令',img:'/static/mycenter/user/momey.png'},
					
					{text:'话费充值',img:'/static/mycenter/user/addr.png'},
					{text:'外卖红包',img:'/static/mycenter/user/security.png'},
					{text:'视频会员',img:'/static/mycenter/user/bank.png'},
					{text:'电影订票',img:'/static/mycenter/user/choujiang.png'},
					// {text:'客服',img:'/static/mycenter/user/kefu.png'},
					// {text:'签到',img:'/static/mycenter/user/mingxi.png'}
					
				],
				// 工具栏列表
				mytoolbarList2:[
					{text:'专业鉴别',img:'/static/mycenter/user/mingxi.png'},
					{text:'联系客服',img:'/static/mycenter/user/kefu.png'}
				],
				isLogin:true
			}
		},
		props: {
					mycenter:{
						type:Array,
						value:[]
					},
					loginId:Number
				},
		methods: {
			backLogin(){
				this.isLogin = false,
				this.$emit("isLogin",this.isLogin)
			}
		}
	}
</script>

<style lang="scss">
	.all{
		background: #F2F3F7;
	}
	.place{
		background-color: #F2F3F7;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.place2{
		background-color: #F2F3F7;
		height: 30upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.place3{
		background-color: #F2F3F7;
		height: 30upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.user{
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		// position: relative;
		background-color: #F2F3F7;
		padding-bottom: 120upx;
		.left{
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border: solid 1upx #fff;
			border-radius: 100%;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			
		}
		.right{
			width: 100%;
			.username{
				font-size: 36upx;
				color: #060606;
			}
			.signature{
				color: #828282;
				font-size: 28upx;
			}
		}
	}
	.order{
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.list{
			display: flex;
			border-bottom: solid 1upx #17e6a1;
			padding-bottom: 10upx;
			.box{
				width: 20%;
				.img{
					width: 100%;
					display: flex;
					justify-content: center;
					.icon{
						font-size: 50upx;
						color: #464646;
					}
				}
				.text{
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
		.balance-info{
			display: flex;
			padding: 10upx 0;
			.left{
				width: 75%;
				display: flex;
				.box{
					width: 50%;
					font-size: 28upx;
					
					.num{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						color: #3d3d3d;
						font-size: 28upx;
					}
				}
			}
			.right{
				border-left: solid 1upx #17e6a1;
				width: 25%;
				.box{
					
					.img{
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						.icon{
							font-size: 45upx;
							color: #e78901;
						}
					}
					.text{
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}
	.VIP{
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%,#f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;
		.img{
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
		.title{
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}
		.tis{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}
	.main {
		padding: 20upx;
	
		.income-card {
			width: 90%;
			background-color: #fff;
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
				margin-top: 40upx;
	
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
		padding: 0 0 20upx 0;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.1);
		border-radius: 15upx;
		.title{
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
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
.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
</style>
