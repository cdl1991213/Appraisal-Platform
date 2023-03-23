<template>
    <view>
		<mescroll-body ref="mescrollRef" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback"
			:down="downOption"
		>
			<view class="list-wrap">
				
				<view class="list-box">
					<view class="list-item" v-for="(item, index) in result" :key="index">
						<view class="l">
							<view>￥<text>{{item.amount}}</text></view>
							<view v-if="item.price > 0">满{{item.price}}可用</view>
							<view v-else>无门槛</view>
						</view> 
						<view class="m">
							<text>{{item.name}}</text>
							<text>到期：{{ item.end_time }}</text>
						</view>
						<view class="r"  :class="{'active':item.is_receive == 1,'disable': item.is_receive==2}">
							<text @click="onReceive(index)">{{item.is_receive ? item.is_receive == 1 ? "己领" : "领完" : "领劵"}}</text>
						</view>
					</view>
				</view>

			</view>
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
				downOption: {
					auto: false
				},
				result: []
			}
		},
		methods: {
			downCallback(){
				setTimeout(()=>{
					this.mescroll.resetUpScroll();
				},1200);
			},
			triggerDownScroll(){
				//this.mescroll.triggerDownScroll();
			},
			onReceive(index){
				if(this.$utils.in_array(this.result[index].is_receive,[1,2])){
					return ;
				}
	
				this.$http.getCouponList({
					id: this.result[index].id
				}).then(res=>{
					if(res.status){
						this.$utils.msg(res.info);
					}else{
						this.$utils.msg(res.info);
					}
	
					this.result[index].is_receive = res.data;
				}).catch(err=>{
					this.$utils.msg("网络出错，请检查是否己连接");
				});
			},
			upCallback(page) {
				this.$http.getCouponLoad({
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
.list-wrap{
    width: 100%;
    margin-top: 20rpx;
    .list-item{
        width: 92%;
        height: 200rpx;
        border-radius: 10rpx;
        background-color: #fff;
        margin: 0 auto 20rpx auto;
        font-size: 26rpx;
        position: relative;
        .l{
            position: absolute;
            width: 220rpx;
            height: 160rpx;
            top: 20rpx;
            left: 0;
            border-right: 1px dashed #cccccc;
            view{
                color: red;
                display: block;
                text-align: center;
                height: 60rpx;
                line-height: 40rpx;
            }
            view:first-child{
                font-size: 32rpx;
                height: 100rpx;
                line-height: 120rpx;
                color: #ce3232;
                text{
                    font-size: 50rpx;
                    font-style: normal;
                    font-weight: bold;
                }
            }

        }
        .m{
            padding: 0 110rpx 0 220rpx;
            height: 160rpx;
            text-align: center;
            text{
                display: block;
            }
            text:first-child{
                padding-top: 50rpx;
                line-height: 50rpx;
                font-size: 32rpx;
                color: #333;
            }
            text:last-child{
                height: 50rpx;
                line-height: 50rpx;
                font-size: 25rpx; color: #999;
            }
        }
        .r {
            &:before {
                z-index: 11;
                content: " ";
                position: absolute;
                top: -16rpx;
                left: -16rpx;
                width: 32rpx;
                height: 32rpx;
                background-color: #f6f6f6;
                border-radius: 100rpx;
            }
            &:after {
                z-index: 11;
                content: " ";
                position: absolute;
                bottom: -16rpx;
                left: -16rpx;
                width: 32rpx;
                height: 32rpx;
                background-color: #f6f6f6;
                border-radius: 100rpx;
            }
            z-index: 1;
            position: absolute;
            right: 0;
            top: 0;
            width: 110rpx;
            height: 200rpx;
            line-height: 200rpx;
            float: right;
            text-align: center;
            background-color: #b91922;
            background-image: url(~@/static/images/coupon-circle.png);
            background-repeat: repeat-y;
            background-position: -4rpx center;
            background-size: 12rpx;
            text{
                font-size: 30rpx;
                color: #fff;
                display: block;
                text-align: center;
            }
        }
        .active{
            background-color: #e55f67;
        }
        .disable{
            background-color: #dbdadd;
        }
    }

}
</style>