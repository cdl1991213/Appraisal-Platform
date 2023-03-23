<template>
    <view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" @down="downCallback">
			
			<view v-if="!isLoading">
				<view id="swiper-inner-box">
					<swiper class="swiper-box" :circular="true" :current="current" @change="onSwiperChange">
						<swiper-item 
							class="have-none" 
							v-if="images"
							v-for="(item, index) in images" 
							:key="index"
						>
							<image :src="item" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
					<view class="custom-indicator">
						{{ current + 1 }} / {{ images.length }}
					</view>
				</view>
				
				<view class="goods-info clear">
					<view class="price">
						<view>￥<text>{{ products.sell_price }}</text></view>
					</view>
					<view class="title">
						{{ products.title }}
					</view>
					<view class="goods-info-box">
						<view>￥<text>{{ products.market_price }}</text></view>
						<view>库存: {{ products.store_nums }}件</view>
						<view>销量: {{ products.sale }}件</view>
					</view>
				</view>
				
				<view class="goods-comments clear">
					<view class="title">
						<text>商品评价</text>
						<text v-if="comments.length > 0" @click="$utils.navigateTo('comments/view',{ id: products.goods_id,type: 'special' })">更多 &gt;</text>
					</view>
					<view class="comments-empty" v-if="comments.length <= 0">该商品还没有评论哦！</view>
					<view
						class="goods-comments-list clear"
						 v-if="comments.length > 0"
					>
						<view
							class="goods-comments-box clear"
							v-for="(item,index) in comments"
							:key="index"
						>
							<view class="t">
								<view class="u">
									<view><image :src="item.avatar"></view>
									<view>{{item.username}}</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
							<view class="c">{{item.content}}</view>
							<view class="d" v-if="item.reply_content">
								<view class="d-1">商家回复</view>
								<view class="d-2">{{item.reply_content}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="goods-content clear">
					<view class="title">图文详情</view>
					<view class="clear" v-html="products.content">
						products.content
					</view>
				</view>
			</view>
			
		</mescroll-body>
		
		<sku-action
			v-model="isSkuStatus"
			:goods="products"
			:attribute="attribute"
			:item="item"
			:goods-info.sync="selectedGoodsInfo"
			:fields="fields"
		></sku-action>
		
		<share
			v-model="isShareStatus"
			:title="products.title"
			:url="url"
			:text="products.title"
			:image="products.photo"
		></share>
		
		<goods-action>
			<goods-action-icon icon="home" @click="$utils.switchTab('index/index')" text="首页"></goods-action-icon>
			<goods-action-button type="buy" @click="onBuyClicked" text="立即购买"></goods-action-button>
		</goods-action>
		
		<loading v-if="isLoading" color="rgba(255,255,255,1)" :layer="true"></loading>
    </view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import SkuAction from '../../components/sku-action/sku-action';
import GoodsAction from "../../components/goods-action/goods-action";
import GoodsActionButton from "../../components/goods-action/goods-action-button";
import GoodsActionIcon from "../../components/goods-action/goods-action-icon"
import share from "../../components/share/index.vue";
import loading from '../../components/tool/loading'
export default {
	mixins: [MescrollMixin],
    components: {
		MescrollBody,
		MescrollUni,
        SkuAction,
        GoodsAction,
        GoodsActionButton,
        GoodsActionIcon,share,loading
    },
    data() {
        return {
			isLoading:true,
			upOption: {
				use: false,
				auto: false
			},
			fields:["id"],
			isSkuStatus: false,
			isShareStatus: false,
			images: [],
			comments: [],
			current: 0,
			selectedGoodsInfo: {},
			products: {},
			attribute: [],
			item:{},
			goods_id:0,
			url: ""
        };
    },
	onLoad(options) {
		this.goods_id = options.id;
	},
    onShow() {
        //this.loadGoodsData();
    },
	onNavigationBarButtonTap(e){
		this.isShareStatus = !this.isShareStatus;
	},
    methods: {
		onSwiperChange(event){
			this.current = event.detail.current;
		},
		downCallback(){
			setTimeout(()=>{
				this.loadGoodsData();
				this.mescroll.endSuccess(10, false);
			},1200);
		},
		triggerDownScroll(){
			this.mescroll.triggerDownScroll();
		},
        loadGoodsData(){
            this.$http.getSpeciaDetail({
                id: this.goods_id
            }).then((result)=>{
				this.products = result.data.goods;
				this.attribute = result.data.attr;
				this.item = result.data.item;
				this.images = result.data.photo;
				this.comments = result.data.comments;
				this.url = this.$config.uni_app_web_url + "special/view/" + this.goods_id;
				this.isLoading = false;
            }).catch(err=>{
                console.log(err);
            });
        },
        onChange(index) {
            this.current = index;
        },
        onBuyClicked(){
            if(this.isSkuStatus == false){
				this.isSkuStatus = true;
				return ;
			}

			if(!this.selectedGoodsInfo.isSubmit){
				this.$utils.msg("请选择规格！");
				return false;
			}

			this.$store.dispatch("isUsers").then(()=>{
				this.$utils.navigateTo("cart/confirm",{
					id: this.selectedGoodsInfo.id,
					sku_id: this.selectedGoodsInfo.selectedSku.id,
					num: this.selectedGoodsInfo.num,
					type: "special"
				});
			}).catch(()=>{
				this.$storage.set("VUE_REFERER","/special/view/id/" + this.selectedGoodsInfo.id);
				this.$utils.navigateTo("public/login");
			});
        }
    }
}
</script>

<style lang="scss" scoped>
#swiper-inner-box {
	position: relative;
	.swiper-box{
		width: 100%;
		height: 800rpx;
		image {
			width: 100%;
			height: 800rpx;
		}
	}
	.custom-indicator {
		position: absolute;
		right: 40rpx;
		bottom: 40rpx;
		padding: 12rpx 30rpx;
		font-size: 28rpx;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		border-radius: 12rpx;
	}
}
.goods-info{
    background-color: #fff;
	text {
		font-style: normal;
	}
	.price{
		display: block;
		padding: 30rpx 30rpx 10rpx 30rpx;
		color: red;
		font-size: 28rpx;
		text {
			font-size: 36rpx;
		}
	}
	.title{
		display: block;
		padding: 0 30rpx;
		color: #333;
		font-size: 32rpx;
	}
	.goods-info-box{
		display: block;
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		view {
			width: 33.33%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 26rpx;
			color: #555;
		}
		view:nth-child(1){
			text-align: left;
		}
		view:nth-child(3){
			text-align: right;
		}
	}
}
.goods-comments{
    margin-top: 20rpx;
    background-color: #fff;
    height: auto;
    .title {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 32rpx;
        width: 100%;
        border-bottom: 2rpx solid #e8e8e8;
        text:nth-child(1){
            float: left;
            color: #333;
            padding-left: 30rpx;
        }
        text:nth-child(2){
            float: right;
            color: #999;
            padding-right: 30rpx;
        }
    }
    .comments-empty { padding: 100rpx 30rpx; text-align: center; font-size: 32rpx; color: #666; }
    .goods-comments-list{
        .goods-comments-box{
            border-bottom: 2rpx solid #e8e8e8;
            min-height: 240rpx;
            background-color: #fff;
            padding-bottom: 40rpx;
            .t {
                padding: 0 30rpx;
                height: 170rpx;
                line-height: 160rpx;
                color: #666;
                .u{
                    float: left;
                    font-size: 30rpx;
					view { float: left; }
                    view:first-child{
                        width: 96rpx; height: 96rpx;
                        overflow: hidden; border-radius: 50%;
                        background-color: #eee; display: inline-block;
                        position: relative; top: 30rpx;
                        img {
                            width: 96rpx; height: 96rpx;
                        }
                    }
                    view:last-child { position: relative; left: 20rpx; }
                }
                .time{
                    float: right;
                    font-size: 28rpx;
                }
            }
            .c{
                padding: 0 30rpx 10rpx 30rpx;
                font-size: 30rpx; color: #333;
            }
            .d {
                background-color: #f7f7f7;
                margin: 0 30rpx;
                .d-1 {
                    padding: 10rpx 30rpx 0 30rpx;
                    font-size: 30rpx;
                }
                .d-2 {
                    padding: 20rpx 30rpx 20rpx 30rpx;
                    font-size: 28rpx;
                }
            }
        }
    }
}
.goods-content{
    background-color: #fff;
    width: 100%;
    margin-top: 30rpx;
    margin-bottom: 100rpx;
    .title {
        font-size: 32rpx;
        color: #282828;
        height: 96rpx;
        width: 100%;
        background-color: #fff;
        text-align: center;
        line-height: 96rpx;
    }
    image {
        width: 100%;
        height: auto;
        float: left;
    }
}
</style>