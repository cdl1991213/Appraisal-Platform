<template>
	<view>
		<!-- 占位 -->
		<view  class="SHplace">
			<view class="footer">
			<navigator url="../selectCategory" open-type="navigate" class="back"></navigator>
			</view>
			申请专家鉴定
		</view>
		<view class="feedback-body" >
		    <textarea placeholder="请输入您的相关购物信息..." class="feedback-textare" v-model="sendDate.content"/>
		</view>
		<choose :count="count"  :imgList="imgList"  @changes="fileChange"></choose>
		<compress  ref="compress" :maxwh="maxwh" :quality="quality" > </compress>
		
		<!-- 0/6 -->
		<!-- <view class="uni-uploader-head" style="text-align: right;">
		    <view class="" style="text-align: left;font-weight: bold;">添加鉴定图片（必填）</view>
		    <view class="uni-uploader-info" style="color: #808080;font-size: 33upx;margin-top: 33upx;margin-right: 33upx;">0/6</view>
		</view> -->
		<!-- 选择加号键 -->
		<!-- <view class="uni-uploader__input-box" >
		    <view class="uni-uploader__input" @tap="chooseImg"></view>
		</view> -->
		<!-- 图片是否压缩 -->
		<view class="swiper-list">
		    <view class="uni-list-cell uni-list-cell-pd feedback-title">
		        <view class="uni-list-cell-db ">图片是否压缩</view>
		        <switch :checked="isYasuo" />
		    </view>
		</view>
		<!-- 占位 -->
		<view  class="place2"></view>
		<!-- QQ邮箱 -->
		<view class='feedback-title swiper-list'>
		    <text style="font-weight: bold;color: #000000;">添加描述</text>
		</view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<view class="feedback-body">
		    <input class="feedback-input" v-model="sendDate.contact" placeholder="添加内容..." />
		</view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 插件评分 -->
		<view class="swiper-list">
			<view class='feedback-title feedback-star-view'>
				<text>插件评分</text>
				<view class="feedback-star-view">
					<text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'active' : ''" @tap="chooseStar(value)"></text>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<text style="color: #808080;">发布即表示阅读并同意《鉴别须知》</text>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<button type="default" class="feedback-submit" @tap="send">免费发布（剩余1次）</button>
		
	</view>
</template>

<script>
	import choose from "../../../components/choose.vue"
	import compress from "../../../components/compress.vue"
	export default {
		name:'newsPublish',
		components:{
			choose,
		    compress
		},
		data() {
			return {
				imgList: [],
				maxwh:280,
				quality:1, 
				count:6,
				isYasuo:true,
				stars: [1, 2, 3, 4, 5],
				sendDate: {
				    score: 0,
				    content: "",
				    contact: ""
				}
			}
		},
		methods: {
			fileChange(e){
			  this.imgList=e;
			},
			chooseStar(e) { //点击评星
			    this.sendDate.score = e;
			}
		}
	}
</script>

<style>
.feedback-textare{
	border-bottom:1px solid #F1F1F3;
}
.SHplace{
		background-color: #F2F3F7;
		height: 120upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		text-align: center;
		font-size: 40upx;
		font-weight: bold;
}
.place{
		background-color: #F2F3F7;
		height: 62upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		text-align: center;
		font-size: 40upx;
		font-weight: bold;
}
.place2{
		background-color: #dadadc;
		height: 5upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
}
.place3{
		background-color: #ffffff;
		height: 20upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		text-align: center;
		font-size: 40upx;
		font-weight: bold;
}
.uni-uploader__input-box {
	position: relative;
	margin:10upx;
	width: 208upx;
	height: 208upx;
	border: 2upx solid #D9D9D9;
}
.uni-uploader__input-box:before,
.uni-uploader__input-box:after {
	content: " ";
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #D9D9D9;
}
.uni-uploader__input-box:before {
	width: 4upx;
	height: 79upx;
}
.uni-uploader__input-box:after {
	width: 79upx;
	height: 4upx;
}
.uni-uploader__input-box:active {
	border-color: #999999;
}
.uni-uploader__input-box:active:before,
.uni-uploader__input-box:active:after {
	background-color: #999999;
}
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.uni-list-cell {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell {
	padding-left: 20upx;
}
.uni-list-cell:after {
	left: 52upx;
}
.uni-list-cell-pd {
	padding: 22upx 30upx;
}
.feedback-title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	color: #8f8f94;
	font-size: 28upx;
}
.uni-list-cell-db {
	flex: 1;
}
.swiper-list{
	background-color: #f2f3f7;
}
.feedback-star-view {
	margin-left: 20upx;
}
.feedback-star {
	font-family: uniicons;
	font-size: 40upx;
	margin-left: 6upx;
}
.feedback-star:after {
	content: url(../../../static/authentic/xingxingbefore.png);
}
.feedback-star.active {
	color: #FFB400;
}
.feedback-star.active:after {
	content: url(../../../static/authentic/xingxingafter.png);
}
.feedback-submit {
	background: #007AFF;
	color: #FFFFFF;
	margin: 20upx;
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
		content:url(../../../static/authentic/toBack.png) ;
	}
</style>
