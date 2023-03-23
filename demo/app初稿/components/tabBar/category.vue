<template>
	<view class="main">
		 <scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
			<!-- 顶部导航栏 -->
			<view class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
				<!-- 定位城市 -->
				<view class="addr">
					<view class="icon location" ></view>
					{{ city }}
				</view>
				<!-- 搜索框 -->
				<view class="input-box">
					<input
						placeholder="默认关键字"
						placeholder-style="color:#c0c0c0;"
						@tap="toSearch()"
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
			
			
			<view class="category-list">
				<!-- 左侧分类导航 -->
				<scroll-view  scroll-y="true" class="left" >
			        <view class="row" v-for="(category,index) in categoryList2" :key="category.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
						<view class="text">
							<view class="block"></view>
							{{category.title}}
						</view>
					</view>
			    </scroll-view>
				<!-- 右侧子导航 -->
				<scroll-view  scroll-y="true" class="right" >
				    <view class="category" v-for="(category,index) in categoryList2" :key="category.id" v-show="index==showCategoryIndex" >
						<view class="banner">
							<!-- 右侧导航图 -->
							<image :src="category.banner"></image>
						</view>
						<view class="list">
							<view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
								<!-- 每个小类的图片 -->
								<image :src="box.img"></image>
								<view class="text">{{box.name}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
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
				showCategoryIndex:0,
				city: '杭州',
			}
		
		},	
		onLoad(){
			
		},
		props: {
					categoryList2:{
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
								uni.navigateTo({
									url: '../search/search?searchdata=' + me.searchText
								});
								me.searchText = ""
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
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.navigateTo({
					url:""
					/* url:'../../pages/merchandise/'+e.url */
				});
			}
			
		
		}
	}
</script>

<style lang="scss">
	@import "css/font.scss";
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
	
	
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,.right{
			position: absolute;
			
			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}
		.left{
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;
			.row{
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					.block{
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					.text{
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;
						.block{
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
				width: 94%;
				padding: 20upx 3%;
				.banner{
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 24.262vw;
					}
				}
				.list{
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image{
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}
						.text{
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>