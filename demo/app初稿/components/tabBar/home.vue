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
						@tap="toSearch()"
						:value="searchText"
					/>
					<view class="icon search"></view>
				</view>
				<!-- 右侧图标按钮 -->
				<view class="icon-btn">
					<!-- 普通浏览器里没有plus环境，只有HBuilder真机运行和打包后才能运行plus api。
					在普通浏览器里运行时plus api时控制台必然会输出plus is not defined错误提示。 -->
					<view class="icon yuyin-home" @click="voice()"></view>
					<view class="icon tongzhi" @tap="toMsg"></view>
				</view>
			</view>	
			<!-- 占位 -->
			<view class="place"></view>
			<!-- 轮播图 -->
			<view class="swiper">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" indicator-dots="true" indicator-color="#989898" indicator-active-color="#ffffff" @change="swiperChange">
						<swiper-item v-for="(swiper, index) in swiperList" :key="index">
							<image :src="swiper.img" ></image> 
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 分类列表 -->
			<view class="category-list">
				<view
					class="category"
					v-for="(row, index) in categoryList"
					:key="index"
					@tap="toCategory(row)"
				>
					<view class="img"><image :src="row.img"></image></view>
					<view class="text">{{ row.name }}</view>
				</view>
			</view>
			<!-- 广告图 -->
			<view class="banner"><image src="/static/game/category/banner.jpg"></image></view>
			<!-- 商品列表 -->
			<view class="goods-list">
				<view class="title">
					<image src="/static/game/hua.png"></image>
					猜你喜欢
					<image src="/static/game/hua.png"></image>
				</view>
				<view class="product-list">
					<view
						class="product"
						v-for="product in productList"
						:key="product.goods_id"
						@tap="toGoods(product)"
					>
						<image mode="widthFix" :src="product.img"></image>
						<view class="name">{{ product.name }}</view>
						<view class="info">
							<view class="price">{{ product.price }}</view>
							<view class="slogan">{{ product.slogan }}</view>
						</view>
					</view>
				</view>
				<view class="loading-text">{{ loadingText }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				currentSwiper: 0,
				loadingText: '正在加载...',
				searchText:""
			}
		},
		props: {
					swiperList: {
						type: Array,
						value: []
					},
					categoryList:{
						type: Array,
						value: []
					},
					productList: {
						type: Array,
						value: []
					}
				},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
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
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../pages/msg/msg'
				})
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url:'../../pages/search/search'
				});
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				/* console.log(e) */
				uni.navigateTo({
					url:"../../pages/merchandise/merchandiselist/merchandiselist?id=" + e.name
					/* '../../pages/merchandise/'+e.url */
				});
			},
			//商品跳转
			toGoods(e) {
			/* 	uni.showToast({ title: '商品' + e.goods_id, icon: 'none' }) */
				console.log(this.productList[e.goods_id].url)
				uni.navigateTo({
					url:"/pages/merchandise/" + this.productList[e.goods_id].url
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "css/font.scss";
	page{position: relative;background-color: #fff;}
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
	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;
		.swiper-box {
			width: 92%;
			height: 57.7vw;
	
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;
			swiper {
				width: 100%;
				height: 57.7vw;
				swiper-item {
					image {
						width: 100%;
						height: 57.7vw;
					}
				}
			}
		}
	}
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 9vw;
					height: 9vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
	.banner {
		width: 92%;
		margin: 40upx 4%;
		image {
			width: 100%;
			height: 20vw;
			border-radius: 10vw;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
		}
	}
	.goods-list {
		// background-color: #f4f4f4;
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #f47825;
			font-size: 30upx;
			margin-top: 10upx;
			image {
				width: 30upx;
				height: 30upx;
			}
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
		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}
				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
	
					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>