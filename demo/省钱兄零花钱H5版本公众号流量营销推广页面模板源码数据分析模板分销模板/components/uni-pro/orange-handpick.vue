<template>

	<view style="background-color: #fff;">
		<!--头部标题介绍-->
		<view style="display: flex;">
			<view>
				<image class="headImage" src="../../static/rfaxian/touxiang.png"></image>
			</view>
			<view class="box-name">
				<view class="name" style="width: 75%">
					<text>聚多佳品小编</text><br>
				</view>
				<text class="total">{{ showTime | formatDate }}</text>
			
			</view>
		</view>
		<!--短文-->
		<view style="text-align: left;display: flex;margin-left: 80upx;">
			<view>
				<view class="content" v-html="content">
				</view>
			</view>
		</view>

		<!--图片-->
		<view style="text-align: center;display: flex;margin-top: 8px;margin-left: 78upx;">
			<view>
				<view v-for="(image,index) in images" :key="index" class="box-float">
					<image @click="openGoods()" class="image" :src="image+'_310x310.jpg'" @longpress="toSave(image)" lazy-load='true'
					 fade-show='true'></image>
				</view>
			</view>
		</view>
		<view class="" style="width: 608upx;height: 134upx;background-color: #f8f8f8;margin-left: 90upx;padding: 20upx;display: flex;margin-top: 20upx;">
			<image style="width: 96upx;height:96upx;float: left;margin-right: 30upx;" src="https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/7b21e07458dc4c7989402ee99df4c5bc.png"></image>
			<view style="width: 70%;">
				<view class="header-wu">{{faxian}}</view>
				<view class="" style="font-weight: bolder;">券后价￥{{total}}</view>
			</view>
			<view>
				<image src="https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/c3e8373b94034481b1cca70cb2176a0d.png" class="fan"></image>
			</view>
		</view>
		<view style="display: flex;">
			<!--底部-->
			<view style="text-align: right;margin:20upx 90upx;">
				<text class="total" style="">
					<image class="headImages" src="../../static/rfaxian/touxiang.png"></image>
					<image class="headImages" src="../../static/rfaxian/touxiang.png"></image>
					<image class="headImages" src="../../static/rfaxian/touxiang.png"></image>
					<text>{{ total }} k</text>
				</text>
			</view>
		</view>
		<view style="display: flex;margin-left: 120upx;justify-content: space-around;">
			<button class="btnfen" style="background-color: #ff4335;" @click="sharePoster">分享素材</button>
			<qrcode-poster ref="poster" :title="faxian"  :headerImg="images[0]" ></qrcode-poster>
			<button class="btnfen" style="background-color: #ecc470;margin: 0 30upx;" @click="copyHref()">复制文案</button>
			<jsfun-picker :listArr="priceList" :defaultArr="priceDefault" type="single" :isShows='isShows' @click="priceChange">
				<button class="btnfen" style="background-color: #ff3366;">分享商品</button>
			</jsfun-picker>
		</view>


	</view>


</template>

<script>
	import jsfunPicker from '@/components/jsfun-picker/jsfun-picker.vue'
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	export default {
		name: "orange-handpick",
		props: [
			"total",
			"to",
			"content",
			"images",
			"copy_content",
			"showTime",
		],
		components: {
			jsfunPicker,
			QrcodePoster
		},

		data() {
			return {
				priceList: [{
					dictLabel: '复制文案并生成聚多佳品小程序',
					imgurl: 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/3f38fe1194e244fbb1a6edf87fe9f142.png'
				}, {
					dictLabel: '复制文案并生成拼多多H5图片',
					imgurl: 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/e43a97115639487ca567e98bdb5bcb1b.png'
				}],
				isShows:false,
				priceDefault: '',
				faxian:'发现发现发现发现发现发现发现发现发现发现发现发现',
				is_show_model: false, //是否显示分享模态窗
			}
		},
		methods: {
			openGoods() {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + this.to + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + this.to,
					})
				}
			},
			priceChange(data) {
				console.log('datadata', data)
				if(data.index==1){
					this.sharePoster()
					this.isShows=false;
					console.log('this.isShows',this.isShows)
				}
				
			},
			sharePoster() {
				//获取带参数二维码
				this.is_show_model = false
				this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg')
			},
			/**
			 * 复制链接
			 */
			copyHref() {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.setClipboardData({
						data: this.copy_content,
						success: (r => {
							this.$queue.showToast("素材复制成功")
						}),
					})
				} else {
					uni.setClipboardData({
						data: this.copy_content,
						success: (r => {
							this.$queue.showToast("素材复制成功")
						}),
					})
				}
			},
			/**
			 * 保存图片
			 * @param url
			 */
			toSave(url) {
				//#ifndef H5
				uni.getImageInfo({
					src: url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 3000
								});
							}
						});
					}
				});

				//#endif
			},
		},
		filters: {
			formatDate: function(value) {
				value = parseInt(value + "000");
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return MM + '-' + d + ' ' + h + ':' + m
			}
		}
	}
</script>

<style scoped>
	.headImage {
		margin-right: 8px;
		height: 35px;
		width: 35px;
		border-radius: 50%;
	}

	.btnfen {
		color: #FFFFFF;
		width: 175upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
	}

	.headImages {
		margin-right: 8px;
		height: 39upx;
		width: 39upx;
		vertical-align: middle;
		border-radius: 50%;
	}

	.name {
		font-size: 15px;
		color: #333333;
	}

	.header-wu {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 24upx;
		color: #666666;
		margin-bottom: 20upx;
	}

	.total {
		font-size: 14px;
		color: #999999;
		width: 30%;

		/* padding-left: 16px; */
	}

	.fan {
		width: 14upx;
		height: 20upx;
		/* float: right; */
		margin-left: 10px;
		margin-top: 40upx;

	}

	.box-name {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.box-click {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		font-size: 15px;
	}

	.box-float {
		float: left;
		padding-top: 5px;
		padding-left: 5px;
	}

	.image {
		height: 160upx;
		width: 160upx;
		margin-right: 12upx;
	}


	.share {
		position: fixed;
		color: #FFFFFF;
		right: 0;
		bottom: 190rpx;
		background: linear-gradient(to bottom right, #FE726B, #FE956B);
		padding: 10rpx 10rpx 10rpx 20rpx;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		box-shadow: 0 0 20upx rgba(0, 0, 0, .09);
	}

	.cancel {
		width: 100vw;
		padding: 30rpx;
		text-align: center;
		background: #FFFFFF;
		color: red;
		font-weight: bold;
		font-size: 30rpx;
	}

	.md-content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 50rpx 0;
	}

	.md-content-item {
		margin: 0 70rpx;
		position: relative;
	}

	.md-content-item image {
		width: 100rpx;
		height: 100rpx;
	}

	.md-content-item view {
		margin-top: 15rpx;
		font-size: 28rpx;
	}

	.sharebtn {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
</style>
