<template>
	<view>
		
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="footer">
			<navigator url="../../index/index" open-type="navigate" class="back">返回首页</navigator>
			</view>
			<view class="target" v-for="(target,index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected?'on':'']">
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view> 
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in productList" :key="goods.goods_id" @tap="toGoods(goods)"
				v-if="productList[goods.goods_id].class== shaixuan">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">{{goods.price}}</view>
						<view class="slogan">{{goods.slogan}}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					productList:[],
					loadingText:"正在加载...",
					headerTop:"0px",
					headerPosition:"fixed",
					orderbyList:[
						{text:"销量",selected:true,orderbyicon:false,orderby:0},
						{text:"价格",selected:false,orderbyicon:['sheng','jiang'],orderby:0}
					],
					orderby:"sheng",
					shaixuan:""
			};
		},
		onLoad(option) {
			this.shaixuan = option.id,
			console.log(this.shaixuan), //打印出上个页面传递的参数。
			uniCloud.callFunction({
				name:"home-productList",
				success: (e) => {
					this.productList = e.result.data
				}
			})
		},
		methods: {
			//商品跳转
			toGoods(e){
				uni.showToast({title: '商品'+e.goods_id,icon:"none"});
				uni.navigateTo({
					url: '/pages/merchandise/' + this.productList[e.goods_id].url
				});
			},
			//排序类型
			select(index){
				let tmpTis = this.orderbyList[index].text+"排序 "
				if(this.orderbyList[index].orderbyicon){
					let type = this.orderbyList[index].orderby==0?'升序':'降序';
					if(this.orderbyList[index].selected){
						type = this.orderbyList[index].orderby==0?'降序':'升序';
						this.orderbyList[index].orderby = this.orderbyList[index].orderby==0?1:0;
					}
					tmpTis+=type
				}
				this.orderbyList[index].selected = true;
				let len = this.orderbyList.length;
				for(let i=0;i<len;i++){
					if(i!=index){
						this.orderbyList[i].selected = false;
					}
				}
				uni.showToast({title:tmpTis,icon:"none"});
			}
		}
	}
</script>

<style lang="scss">
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
.icon {
		font-size:26upx;
	}
	.header{
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
		.target{
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;
			&.on{
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}
			
			
		}
	}
.place{
		
		background-color: #ffffff;
		height: 100upx;

	}
.goods-list{
		.loading-text{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
		.product-list{
			width: 92%;
			padding: 0 4% 3vw 4%; 
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product{
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0,0,0,0.1);
				image{
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}
				.name{
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
					
					.price{
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan{
						color: #807c87;
						font-size: 24upx;
					}
			}
		}
			
	}
}

</style>
