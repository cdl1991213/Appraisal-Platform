<template>
	<view>
		<view class="SHfooter">
		<navigator url="../index/index" open-type="navigate" class="back"></navigator>
		</view>
		<!-- 占位 -->
		<view  class="place3" style="text-align: center;font-size: 40upx;font-weight: bold;">选择品类</view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 占位 -->
		<view  class="place3"></view>
		<!-- 选择品类 -->
		<uni-list>
			<view class="" v-for="(category,index) in categoryList" :key="index">
				<uni-list-item  class="categoryList" :title="category.name" :thumb="category.img" showArrow
				link="navigateTo" to="selectCategoryList/selectCategoryList" @click="onClick" 
				/></uni-list-item>
				
			</view>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList:[]
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:"home-categoryList",
				success: (e) => {
					this.categoryList = e.result.data
					console.log(e)
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
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
.categoryList{
	padding: 36upx 12upx;
	font-weight: bold;
}
</style>
