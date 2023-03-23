<template>
	<view class="share-box" :class="{'share-show':value}">
		<view class="share-gride">
			<view 
				v-if="providerList.length > 0"
				class="gride-box" 
				v-for="(item,index) in providerList" 
				:key="index"
				@click="share(item)"
			>
				<image :src="item.img"></image>
				<view>{{item.name}}</view>
			</view>
			<view v-if="providerList.length <= 0" class="share-empty">
				您还未开通相关服务
			</view>
		</view>
		<view id="close" class="iconfont" @click.stop="onClose">取消分享</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
			  type: Boolean,
			  default: false
			},
			title: {
				type: String,
				default: ""
			},
			text: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			},
			image: {
				type: String,
				default: ""
			}
		},
		data(){
			return {
				providerList: []
			};
		},
		mounted() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									id: 'weixin',
									name: '微信',
									img: '../../static/share/icon_weixin.png',
									sort:0
								})
								data.push({
									id: 'weixin',
									name: '朋友圈',
									type:'WXSenceTimeline',
									img: '../../static/share/icon_pengyouquan.png',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									id: 'sinaweibo',
									name: '新浪微博',
									img: '../../static/share/icon_weibo.png',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									id: 'qq',
									name: 'QQ',
									img: "../../static/share/icon_qq.png",
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		methods: {
			async share(e){
				if(this.text.length <= 0){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				
				if(this.image.length <= 0){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: e.id == 'qq' ? 1 : 0,
					success: (e) => {
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (shareOPtions.type){
					case 0:
						shareOPtions.summary = this.text;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.href = this.url;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片
					shareOPtions.imageUrl = await this.compress();
				}
				
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = this.url;
					shareOPtions.title = this.title;
				}
				
				uni.share(shareOPtions);
			},
			compress(){
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			},
			onClose(){
				this.$emit("input",!this.value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-box {
		box-shadow:0px 1px 10px #999;
		position: fixed;
		left: 0;
		bottom: 0;
		border-radius: 15rpx;
		background-color: #fff;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		height: 330rpx;
		font-size: 28rpx;
		border: 1px solid #ccc;
		z-index: 100001;
		overflow: hidden;
		transition:all .3s cubic-bezier(.65,.7,.7,.9);
		transform:translate3d(0,100%,0);
		
		.share-gride {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-top: 25rpx;
			.gride-box {
				width: 25%;
				height: 215rpx;
				text-align: center;
				image {
					width: 115rpx;
					height: 115rpx;
				}
			}
		}
		
		#close { 
			width: 100%;
			height: 95rpx;
			line-height: 95rpx;
			position: absolute; 
			bottom: 0rpx; left: 0rpx; 
			z-index: 1; color: #000; font-size: 44rpx; 
			cursor: pointer; 
			text-align: center;
			font-size: 32rpx;
			border-top: 1px solid #ebebeb;
		}
	}
	.share-show {
	    transform:translate3d(0,0,0);
	}
	.share-empty { font-size: 30rpx; text-align:center; width: 100%; position: absolute; top: 100rpx; }
</style>
