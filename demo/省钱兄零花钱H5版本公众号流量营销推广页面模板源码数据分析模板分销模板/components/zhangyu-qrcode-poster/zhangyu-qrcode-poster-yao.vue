<template>
	<view class="content" v-if="isShow" @click.stop="isShow=false">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
		<view class="save-btn" @click.stop="saveImage">保存图片</view>
	</view>
</template>

<script>
	export default{
		props:{
			headerImg:{
				type: String,
				default: 'https://oss.zhangyubk.com/%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82.png'
			},
			title:{
				type: String,
				default: '100000'
			},
			subTitle:{
				type: String,
				default: ''
			},
			PriceTxt: {
				//原价
				Type: String,
				default: '33'
			},
			OriginalColor: {
				//默认颜色（如原价与扫描二维码颜色）
				Type: String,
				default: '#b8b8b8'
			},
			price:{  //优惠价
				type: Number,
				default: 36.89
			},
			abImg:{
				type: String,
				default: 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/ef1c9b7eabae4a98a9796eb44507458c.png'
			},
			Imgquan:{
				type: String,
				default: 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/fb4c7330d8ab4736b364cbce08d2a3d9.png'
			}
		},
		data(){
			return {
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false,
				qrcode: 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/e02c7c932fec45adba7b1260a176a691.png'
			}
		},
		methods:{
			//显示
			showCanvas(){
				this.isShow = true
				this.__init()
			},
			//初始化画布
			async __init(){
				uni.showLoading({
				    title: '海报生成中...',
					mask: true
				})
				this.ctx = uni.createCanvasContext('my-canvas',this)
				this.canvasW = uni.upx2px(650);
				this.canvasH = uni.upx2px(1180);
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0,0,this.canvasW,this.canvasH)
				//获取标题图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(650);
				let hH = uni.upx2px(1180);
				//绘制标题图
		
				this.ctx.drawImage(headerImg.path,((this.canvasW-hW) / 2),((this.canvasW-hW) / 2), hW, hH);
				this.ctx.setFontSize(12); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText('邀请码:',108,498 )
				this.ctx.fillText(this.title,148,498 )
				
				//小程序码
			let qrcodeImg = await this.getImageInfo(this.qrcode)
			console.log('eeeeee',qrcodeImg)
			this.ctx.drawImage(qrcodeImg.path,108,388,88, 88)
				
				//延迟渲染
				setTimeout(()=>{
					this.ctx.draw(true,()=>{
						uni.hideLoading()
					})
				},500)
			},
		
			//获取图片
			getImageInfo(imgSrc){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功',image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败',err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage(){
				//判断用户授权
				uni.getSetting({
				   success(res) {
				      console.log('获取用户权限',res.authSetting)
					  if(Object.keys(res.authSetting).length>0){
						  //判断是否有相册权限
						  if(res.authSetting['scope.writePhotosAlbum']==undefined){
							  //打开设置权限
							  uni.openSetting({
							    success(res) {
							      console.log('设置权限',res.authSetting)
							    }
							  })
						  }else{
							  if(!res.authSetting['scope.writePhotosAlbum']){
								  //打开设置权限
								  uni.openSetting({
								    success(res) {
								      console.log('设置权限',res.authSetting)
								    }
								  })
							  }
						  }
					  }else{
						  return
					  }
				   }
				})
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					complete: (res) => {
						console.log('保存到相册',res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(()=>{
									that.isShow = false
								},2000)
							}
						})
					}
				},this);
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 999;
	.save-btn{
		margin-top: 35rpx;
		color: #FFFFFF;
		background: linear-gradient(to right, #FE726B , #FE956B);
		padding: 15rpx 40rpx;
		border-radius: 50rpx;
	}
}
</style>
