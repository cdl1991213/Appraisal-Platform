<template>
	<view>
	<scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 标题筛选栏 -->
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab, index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(tab)">
				<!-- 文字 -->
				<text class="uni-tab-item-title" :class="isScroll(index) ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				<!-- 下划线 -->
				<view style="width:100%" :class="isScroll(index) ? 'underlinebox' : 'underlinebox-active'"><view class="underline"></view></view>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<!-- 新闻列表 -->
		<view class="toolbar">
			<view class="newsList" v-for="(news,index) in newsList" :key="index" @click="toDiscussPage(news)">
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
		
		<view class="loading-text">正在加载中...</view>
	</scroll-view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				scrollInto: '',
				tabIndex: 0,
				tabBars: [
					{name: '关注',id: 'guanzhu',tabId:"0"},
					{name: '推荐',id: 'tuijian',tabId:"1"},
					{name: '体育',id: 'tiyu',tabId:"2"},
					{name: '热点',id: 'redian',tabId:"3"},
					{name: '财经',id: 'caijing',tabId:"4"},
					{name: '娱乐',id: 'yule',tabId:"5"},
					{name: '军事',id: 'junshi',tabId:"6"},
					{name: '历史',id: 'lishi',tabId:"7"},
					{name: '本地',id: 'bendi',tabId:"8"},
					{name: '科技',id: 'keji',tabId:"9"},
					{name: '图片',id: 'tupian',tabId:"10"},
					{name: '音频',id: 'yinpin',tabId:"11"},
					{name: '问答',id: 'wenda',tabId:"12"},
					{name: '国际',id: 'guoji',tabId:"13"},
					{name: '文化',id: 'wenhua',tabId:"14"},
					{name: '读书',id: 'dushu',tabId:"15"},
					{name: '游戏',id: 'youxi',tabId:"16"},
					{name: '音乐',id: 'yinyue',tabId:"17"},
					{name: '小说',id: 'xiaoshuo',tabId:"18"},
					{name: '其他',id: 'qita',tabId:"19"}
				]
			}
		},
		props: {
					newsList: {
						type: Array,
						value: []
					}
				},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
			},
			isScroll(index) {
				return this.tabIndex == index;
			},
			ontabtap(e){
				this.tabIndex = e.tabId
			},
			toDiscussPage(e){
				uni.navigateTo({
					url:'../../pages/discuss/discuss?id=' + e.article_type
				})
			}
		}
	}
</script>

<style lang="scss">
.main_box{width:100vw;height: 100vh;padding-bottom:120rpx;box-sizing: border-box;}
.scroll-h {
	width: 750rpx;
	height: 80rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
	/* flex-wrap: nowrap; */
	/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	padding-left: 34rpx;
	padding-right: 34rpx;
}

.uni-tab-item-title {
	color: #555;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}

.uni-tab-item-title-active {
	color: #ec706b;
}
.underlinebox {
	height: 3px;
	display: flex;
	align-content: center;
	justify-content: center;
	transition: 0.5s;
	height: 4px;
	background-color: #ec706b;
	margin-top: -10px;
}
.underlinebox-active {
	background-color: none;
}
.line-h {
	height: 1rpx;
	background-color: #cccccc;
}
.swiper-box {
	flex: 1;
}

.swiper-item {
	flex: 1;
	flex-direction: row;
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
.place {
		background-color: #ffffff;
		height: 35upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
</style>