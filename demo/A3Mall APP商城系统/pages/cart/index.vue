<template>
	<view class="wrap">
		
		<view class="list-wrap">
			<mescroll-body 
				ref="mescrollRef" 
				@init="mescrollInit" 
				@down="downCallback" 
				@up="loadData"
				:up="upOption" 
				:down="downOption" 
				@emptyclick="emptyClick" 
			>
				<checkbox-group @change="checkboxChange">
				<view class="list-box">
					<view
						class="list-item"
						v-for="item in goods"
						:key="item.id"
					>
						<view class="item-check">
							<checkbox :value="item.id" :checked="item.checked" />
						</view>
						<view class="pic">
							<image :src="item.photo"></image>
						</view>
						<view class="goods">
							<view class="t">{{ item.title }}</view>
							<view class="m">{{ item.attr }}</view>
							<view class="b">
								<view>{{ item.price }}</view>
								<view>
									<uni-number-box 
										:min="1" 
										:max="item.nums" 
										:value="item.goods_nums"
										:disabled="item.disabled"
										@change="stepperNum($event,item)"
									/>
								</view>
							</view>
						</view>
					</view>
				</view>
				</checkbox-group>
				
			</mescroll-body>
			
			<view class="cart-bottom">
				<view class="check-box">
					<checkbox-group @change="checkboxAll">
						<checkbox :checked="isChecked" />
					</checkbox-group>
				</view>
				<view class="cart-bottom-text">
					<view>合计：</view>
					<view>
						<text>¥</text>
						<text>{{total}}</text>
					</view>
				</view>
				<view class="btn" @click="onSubmit">
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components:{
			MescrollBody,MescrollUni
		},
		data(){
			return {
				isChecked: false,
				goods: [], // 数据列表
				array: [],
				total: 0.00,
				downOption: {
					auto: false
				},
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					isLock: false, // 是否锁定上拉加载,默认false;
					isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					offset: 80, // 距底部多远时,触发upCallback(仅mescroll-uni生效, 对于mescroll-body则需在pages.json设置"onReachBottomDistance")
					bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- END --', // 没有更多数据的提示文本
					
					empty: {
						use: true, // 是否显示空布局
						icon: this.$http.domain()+"static/images/cart-empty.png", // 图标路径
						tip: '~ 暂无相关数据 ~', // 提示
						btnText: '去逛逛 >', // 按钮
						fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						zIndex: 99 // fixed定位z-index值
					}
				}
			};
		},
		onShow() {
			this.$nextTick(()=>{
				let users = this.$storage.getJson("users");
				if(users == null){
					this.$utils.navigateTo('public/login');
				}else{
					this.downCallback();
				}
			})
		},
		onNavigationBarButtonTap(event) {
			if(event.index == 0){
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				let currentWebview = page.$getAppWebview();
				let obj = currentWebview.getStyle().titleNView;
				
				if (!obj.buttons) {
					return;
				}
				
				if(this.deleteGoods() > 0){
					this.$utils.msg("删除成功");
				}else{
					this.$utils.msg("请选择要删除的商品");
				}
			}
		},
		watch:{
			goods:{
				handler(newValue, oldValue){
					let total = 0.00;
					this.goods.forEach((item,index)=>{
						if(item.checked){
							total += parseFloat(item.price) * item.goods_nums;
						}
					});
					
					this.total = total;
				},
				deep: true
			}
		},
		methods: {
			deleteGoods(){
				let arr = [];
				this.goods = this.goods.filter((item)=>{
					if(item.checked){
						arr.push(item);
					}
					return !item.checked;
				});
	
				if(arr.length <= 0){
					return 0;
				}
	
				let id = [];
				arr.forEach((item)=>{
					id.push(item.id);
				})
	
				this.$http.deleteCart({
					id: id.join(",")
				}).then((res)=>{
					if(res.data > 0){
						uni.setTabBarBadge({ index: 2, text: res.data.toString() });
					}else{
						uni.removeTabBarBadge({ index: 2 })
					}
					this.$store.commit("UPDATECART",res.data);
				}).catch((err)=>{
					
				});
				
				return arr.length;
			},
			onSubmit(){
				let array = [];
				for(let i in this.goods){
					if(this.goods[i].checked){
						array.push(this.goods[i].id);
					}
				}
				
				if(array.length <= 0){
					this.$utils.msg("请选择需要结算的商品");
					return false;
				}
				
				this.$utils.navigateTo("cart/confirm",{
					id: array.join(","),
					type: "cart"
				});
			},
			checkboxChange: function (e) {
				let items = this.goods,values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					let item = items[i];
					if(values.includes(item.id)){
						this.$set(item,'checked',true);
					}else{
						this.$set(item,'checked',false);
					}
				}
			},
			checkboxAll: function(e) {
				this.isChecked = !this.isChecked;
				this.setAllCheckbox(this.isChecked);
			},
			
			//全选设置
			setAllCheckbox: function(checked) {
				this.array = [];
				for(let i in this.goods){
					this.goods[i].checked = checked;
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认 10 */
			loadData(page) {
				this.$http.getCartList({
					page: page.num
				}).then(result=>{
					this.mescroll.endByPage(result.data.list.length, result.data.total);
					if(result.status==1){
						if(page.num == 1) this.goods = [];
						result.data.list.forEach((item,index)=>{
							result.data.list[index]['checked'] = false;
							result.data.list[index]['disabled'] = false;
						})
						this.goods = this.goods.concat(result.data.list);
					}else if(result.status == -1){
						this.mescroll.endErr();
					}
				}).catch(error=>{
					this.mescroll.endErr();
				});
			},
			emptyClick(){
				this.$utils.switchTab("index/index");
			},
			/**
			 * 更新商品数量
			 * @param value     数量
			 * @param detail    索引
			 */
			stepperNum(value, item){
				for(let i in this.goods){
					if(this.goods[i].id==item.id){
						if(this.goods[i].goods_nums != value){
							this.$http.updateCartGoods({
								id: this.goods[i].goods_id,
								sku_id: this.goods[i].product_id,
								num: value
							}).then((res)=>{
								if(res.status){
									this.goods[i].goods_nums = value;
									this.$store.commit("UPDATECART",res.data.count);
									if(res.data.count > 0){
										uni.setTabBarBadge({ index: 2, text: res.data.count.toString() });
									}else{
										uni.removeTabBarBadge({ index: 2 })
									}
								}else{
									this.goods[i].disabled = true;
								}
							}).catch((error)=>{
								this.goods[i].disabled = true;
							});
						}
						break;
					}
				}
				
				return false;
			}
		}
	}
</script>

<style lang="scss">
	.cart-bottom{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0px;
		left: 0;
		border-top: 2rpx solid #eee;
		background-color: #fff;
		.check-box{
			float: left;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 45rpx;
		}
		.cart-bottom-text{
			padding-right: 240rpx;
			color: #323233;
			text-align: right;
			font-size: 24rpx;
			float: right;
			height: 100rpx;
			line-height: 100rpx;
			view{
				display: inline-block;
				&:last-child {
					color: #ee0a24;
					text {
						color: #ee0a24;
						&:last-child {
							font-size: 34rpx;
							padding-left: 5rpx;
						}
					}
				}
			}
		}
		.btn{
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			border: none;
			position: absolute;
			display: inline-block;
			margin: 0;
			padding: 0;
			font-size: 30rpx;
			text-align: center;
			border-radius: 50rpx;
			cursor: pointer;
			transition: opacity .2s;
			top:10rpx;
			right: 20rpx;
			color: #fff;
			background-color: #ee0a24;
			background: linear-gradient(90deg,#ff6034,#ee0a24);
		}
	}
	uni-checkbox .uni-checkbox-input{ 
		border-radius: 50%; width: 30rpx !important; height: 30rpx !important;
		&.uni-checkbox-input-checked{ 
			background: #3D7EFF; border-color:#3D7EFF; 
			&::before{
				width: 20rpx;
				height: 20rpx;  
				line-height: 20rpx;
				text-align: center;
				font-size: 18rpx;
				color: #fff;
				background: transparent;
				transform: translate(-50%, -50%) scale(1);
			}
		}
	}

	.wrap{
		width: 100%;
		background: #fafafa;
	}
	
	.list-box{
	    display: flex;
	    flex-wrap: wrap;
	    flex-direction: column;
		background: #fafafa;
	    .list-item{
	        width: 88%;
	        height: 160rpx;
	        margin: 0 auto;
	        background-color: #fff;
	        margin-bottom: 20rpx;
	        border-radius: 10rpx;
	        font-size: 28rpx;
	        padding: 20rpx 20rpx;
	        &:first-child{
	            margin-top: 20rpx;
	        }
	        .item-check{
	            float: left;
	            width: 7%;
	            height: 100%;
	            position: relative;
	            margin-top: 60rpx;
	        }
	        .pic{
	            float: left;
	            width: 20%;
	            image {
	                width: 160rpx;
	                height: 160rpx;
	            }
	        }
	        .goods{
	            float: right;
	            width: 68%;
	            font-size: 28rpx;
	            color: #333;
	            .t{
	                width: 100%;
	                height: 80rpx;
	                display: -webkit-box;
	                overflow: hidden;
	                -webkit-line-clamp: 2;
	                -webkit-box-orient: vertical;
	            }
	            .m{
	                color: #666;
	                font-size: 24rpx;
	            }
	            .b{
	                height: 60rpx;
	                view:first-child{
	                    float: left;
	                    line-height: 60rpx;
	                    color: red;
	                }
	                view:last-child{
	                    float: right;
	                }
	            } 
	        }
	    }
	
	}
</style>
