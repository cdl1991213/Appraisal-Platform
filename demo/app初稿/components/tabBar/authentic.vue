<template>
	<view class="main">
		 <scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
			<!-- 占位 -->
			<view  class="place"></view>
			<!-- 工具栏 -->
			<view class="toolbar">
				<view class="title">焕然洗护</view>
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
			<view  class="place"></view>
			<!-- 工具栏 -->
			<view class="toolbar">
				<view class="title">95分闲置交易</view>
				<view class="list">
					<view class="box" v-for="(row,index) in mytoolbarList2" :key="index">
						<view class="img">
							<image :src="row.img"></image>
						</view>
						<view class="text">{{row.text}}</view>
					</view>
				</view>
			</view>
			<!-- 占位 -->
			<view  class="place"></view>
			<!-- 工具栏 -->
			<view class="toolbar">
				<view class="title">鉴别服务开创者</view>
				<view class="title2">七大品类 专业鉴别 快速准确</view>
				<view class="btn">
					<button class="joinCart" @click="toAuthentic">免费鉴别</button>
				</view>
			</view>
			<!-- 占位 -->
			<view  class="place2"></view>
			<!-- 工具栏 -->
			<view class="toolbar">
				<view class="title Tdiscuss" @click="toDiscuss">讨论区</view>
				<view class="title2">数千位资深鉴别大神在这里交流分享</view>
				<uni-list>
					<view class="" v-for="(discuss,index) in discussList" :key="index">
						
						<uni-list-item class="discussList" :title="discuss.text" ></uni-list-item>
						
					</view>
				</uni-list>
			</view>
			<view class="loading-text">正在加载...</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				// 工具栏列表
				mytoolbarList:[
					{text:'球鞋清洗',img:'/static/authentic/user/1.png'},
					{text:'氧化修复',img:'/static/authentic/user/2.png'}, 
					{text:'粘胶修补',img:'/static/authentic/user/3.png'},
					{text:'奢包洗护',img:'/static/authentic/user/4.png'}
				],
				mytoolbarList2:[
					{text:'热销数码',img:'/static/authentic/user/5.png'},
					{text:'奢品包袋',img:'/static/authentic/user/6.png'}, 
					{text:'省￥1530',img:'/static/authentic/user/7.png'},
					{text:'省￥1400',img:'/static/authentic/user/8.png'}
				],
				discussList:[
					{text:'求求各位大神帮忙看看哟，淘宝代购上买的',reply:"",replyNum:17},
					{text:'求大神啊帮忙鉴定！谢谢！pdd百亿补贴买的',reply:"",replyNum:32}, 
					{text:'突然发现最近好像有很多假的mlb，所以想验验看谢谢',reply:"",replyNum:27},
					{text:'【各大奢侈品初代网红IT包是谁你知道么？进来涨姿势！】',reply:"",replyNum:5}
				]
			}
		},
		props: {
					show_index:Number
				},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
			},
			toAuthentic(){
				uni.navigateTo({
					url:"/pages/authentic/authentic"
				});
			},
			toDiscuss(){
				console.log(this.show_index)
				this.show_index = 3;
				this.$emit("show_index",this.show_index)
			}
		}
	}
</script>

<style lang="scss">
	.main{background: #F2F3F7;}
	// padding-bottom:120rpx;box-sizing: border-box;重要*************************保证页面底部内容不被隐藏也不会出现多余的滚动条
	.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
	.place{
		background-color: #F2F3F7;
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
	.discussList::before{
		content:url(/static/authentic/hot.png) ;
	}
	.Tdiscuss::after{
		content:url(/static/authentic/Tdis.png) ;
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
</style>
