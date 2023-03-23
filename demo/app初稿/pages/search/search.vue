<template>
	<view class="main">
		 <scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
			<!-- 顶部导航栏 -->
			<view class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
				<!-- 定位城市 -->
				<view class="addr">
					<view class="icon location"></view>
					杭州
				</view>
				<!-- 搜索框 -->
				<view class="input-box">
					<input
						placeholder="默认关键字"
						placeholder-style="color:#c0c0c0;"
						:value="searchText"
					/>
					<view class="icon search" @tap="toSearch()"></view>
				</view>
				<!-- 右侧图标按钮 -->
				<view class="icon-btn">
					<view class="icon yuyin-home" @click="voice()" ></view>
					<view class="icon tongzhi" @tap="toMsg"></view>
				</view>
			</view>	
			<!-- 占位 -->
			<view class="place"></view>
			
			<view class="search-host-list clear">
			    <view class="host-list clear">
			        <view class="title">热门搜索</view>
			        <view class="list">
			            <text v-for="(item,i) in keywords" :key="i">{{ item }}</text>
			        </view>
			    </view>
			</view>
			<view class="footer">
			<navigator url="../index/index" open-type="navigate" class="back"></navigator>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				keywords:["鞋类","手机数码","酒水饮料"],
				searchText:""
			}
		},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
			},
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../pages/msg/msg'
				})
			},
			voice() {
							var me = this;
							var options = {};
							options.engine = 'iFly';
							options.punctuation = false; // 是否需要标点符号 
							options.timeout = 10 * 1000;
							plus.speech.startRecognize(options, function(s) {
								me.searchText = me.searchText + s;
								
								plus.speech.stopRecognize();
							});
			},
			//搜索跳转
			toSearch() {
				////执行搜索操作
				////执行搜索操作
				////执行搜索操作
				////执行搜索操作
				console.log("开始搜索")
			}
		}
	}
</script>

<style lang="scss">
	@import "components/tabBar/css/font.scss";
	.main{
		background-color: #f0f0f0;
	}
	.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
	
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
	
		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.search-host-list {
	    width: 100%; margin-top: 10px;
	    height: auto !important;
	    height: 100px; min-height: 100px;
	    padding: 10px 0;
	    background-color: #fff;
	    .host-list{
	        .title{
	            float: left;
	            color: #666;
	            font-size: 16px;
	            width: 100%;
	            height: 45px;
	            line-height: 45px;
	            text-indent: 10px;
	        }
	        .list{
	            text {
	                font-size: 14px;
	                padding: 5px 10px;
	                background-color: #f1f1f1;
	                color: #333;
	                margin: 5px 10px;
	                border-radius: 10px;
	                float: left;
	            }
	        }
	    }
	}
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
		content:url(/static/authentic/toBack.png) ;
	}
</style>
