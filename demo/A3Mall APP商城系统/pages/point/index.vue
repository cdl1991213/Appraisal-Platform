<template>
    <view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<div class="coupon clear">
				<div class="coupon-wrap clear">
					<view class="coupon-list clear">
					
						<view v-for="(item,index) in result"
							 :key="index"
							 class="coupon-item"
							 @click="onCoupon(item.id,index)"
						>
							<view>{{item.name}}</view>
							<view>
								<text>{{item.point}}积分</text>
								<text :class="{ 'active': item.active }">点击兑换</text>
							</view>
							<view>{{item.start_time}} ~ {{item.end_time}}</view>
							<view class="coupon-img"><image src="../../static/images/coupon-img.png"></image></view>
						</view>
					
					</view>
				</div>
			</div>
		</mescroll-body>

    </view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			MescrollBody,MescrollUni
		},
		data() {
			return {
				result: []
			}
		},
		methods: {
			onCoupon(id,index){
				if(this.result[index].active){
					return false;
				}

				this.$http.receivePointCoupon({
					id: id
				}).then(res=>{
					if(res.status){
						this.result[index].active = 1;
						this.$utils.msg(res.info);
					}else{
						this.$utils.msg(res.info);
					}
				});
			},
			downCallback(){
				setTimeout(()=>{
					this.mescroll.resetUpScroll();
				},1200);
			},
			triggerDownScroll(){
				this.mescroll.triggerDownScroll();
			},
			upCallback(page) {
				this.$http.getPointList({
					page: page.num
				}).then((result)=>{
					this.mescroll.endByPage(result.data.list.length, result.data.total);
					if(result.status==1){
						if(page.num == 1) this.result = [];
						this.result = this.result.concat(result.data.list);
					}else if(result.status == -1){
						this.mescroll.endErr();
					}
				}).catch(error=>{
					this.mescroll.endErr();
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
    .coupon {
    	margin: 30rpx auto 40rpx auto;
    	position: relative;
    	width: 100%;
    	border-radius: 30rpx;
    	.coupon-wrap {
    		padding: 0 30rpx;
    		.coupon-item {
    			width: 100%; height: 188rpx;
    			border: 2rpx solid #eec5af;
    			border-radius: 20rpx;
    			float: left;
    			position: relative;
    			margin-bottom: 30rpx;
    			view {
    				&:nth-child(1){
    					float: left; width: 100%;
    					margin-top: 32rpx;
    					font-size: 34rpx; color: #393939;
    					text-indent: 34rpx;
    				}
    				&:nth-child(2){
    					float: left; width: 100%;
    					margin-top: 10rpx;
    					text {
    						float: left;
    						margin-left: 34rpx;
    						&:first-child {
    							color: #b91922;
    							font-size: 28rpx;
    						}
    						&:last-child {
    							background-color: #b91922;
    							color: #fff;
    							width: 140rpx; height: 40rpx; line-height: 40rpx;
    							font-size: 24rpx; text-align: center;
    							border-radius: 30rpx;
    							&.active {
    								background-color: #999;
    							}
    						}
    					}
    				}
    				&:nth-child(3){
    					float: left; width: 100%;
    					font-size: 24rpx; text-indent: 34rpx;
    					margin-top: 10rpx;
    				}
    				&:nth-child(4){
    					position: absolute;
    					right: 20rpx; bottom: 0;
    					image {
    						width: 180rpx; height: 140rpx;
    					}
    				}
    			}
    		}
    	}
    }
</style>