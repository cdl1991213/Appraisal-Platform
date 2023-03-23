<template>
	<view class="collect clear">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<checkbox-group @change="checkboxChange">
				<view class="collect-list">
					<view class="item-box" v-for="(item,index) in result" :key="index">
						<view class="l">
							<view class="item-check">
								<checkbox class="c-check" :value="item.id" :checked="item.checked" />
							</view>
							<view class="item-image">
								<image :src="item.thumb">
							</view>
						</view>
						<view class="r">
							<view class="title">{{ item.title }}</view>
							<view class="price">￥{{ item.price }}</view>
						</view>
					</view>
				</view>
			</checkbox-group>
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
				array: [],
				result: []
			};
		},
		methods: {
			checkboxChange: function (e) {
				var items = this.result,values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i];
					if(values.includes(item.id)){
						this.$set(item,'checked',true);
					}else{
						this.$set(item,'checked',false);
					}
				}
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
				this.$http.getCollectList({
					page: page.num
				}).then((result)=>{
					this.mescroll.endByPage(result.data.list.length, result.data.total);
					if(result.status==1){
						if(page.num == 1) this.result = [];
						result.data.list.forEach((item,index)=>{
							result.data.list[index]['checked'] = false;
							
						})
						this.result = this.result.concat(result.data.list);
					}else if(result.status == -1){
						this.mescroll.endErr();
					}
				}).catch(error=>{
					this.mescroll.endErr();
				});
			}
		},
		onNavigationBarButtonTap(e) {
			let arr = [];
			this.result = this.result.filter((item)=>{
				if(item.checked){
					arr.push(item);
				}
				return !item.checked;
			});
				
			if(arr.length <= 0){
				this.$utils.msg("请选择要删除的内容");
				return ;
			}
				
			let id = [];
			arr.forEach((item)=>{
				id.push(item.id);
			})
			
			this.$http.deleteCollect({
				id: id.join(",")
			});
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .mescroll-body-content { background-color: #fff; }
.collect{
	width: 100%;
	height: 100vh;
	background-color: #fff;
}
/deep/ uni-checkbox .uni-checkbox-input {
	border-radius: 50% !important;
	color: #ffffff !important;
}

/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	color: #fff;
	background-color: #007AFF;
}

/deep/ .uni-checkbox-input.uni-checkbox-input-checked {
	border: none !important;
}

.collect-list{
    .item-box {
        float: left;
        padding: 0 32rpx;
        margin-top: 40rpx;
        border-radius: 20rpx;
        height: 260rpx;
        .l {
            width: 320rpx;
            position: absolute;
            .item-check {
                float: left; width: 60rpx; height: 260rpx;
                position: relative;
                .c-check { border-radius: 50%; position: absolute; top: 50%; transform: translateY(-50%); }
            }
            .item-image{
                image { width: 260rpx; height: 260rpx; }
            }
        }
        .r{
            padding-left: 340rpx;
            color: #888; font-size: 28rpx;
			.title {
				display: -webkit-box;overflow: hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
			}
            .price{
                padding-top: 20rpx;
                font-size: 34rpx; color: #b91922;
            }
        }
    }
}
</style>