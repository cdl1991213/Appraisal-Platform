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
				default: ''
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
				this.canvasH = uni.upx2px(1080);
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0,0,this.canvasW,this.canvasH)
				//绘制圆角背景
				this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH,uni.upx2px(18),'#FFFFFF')
				//获取标题图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(600);
				let hH = uni.upx2px(520);
				//绘制标题图
				this.drawRoundImg(this.ctx,headerImg.path,((this.canvasW-hW) / 2),((this.canvasW-hW) / 2),hW,hH,8)
				//绘制标题
				this.ctx.setFontSize(18); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText(this.title,((this.canvasW-hW) / 2),(
				((this.canvasW-hW) / 2) + hH + 30))
				//绘制副标题
				this.ctx.setFontSize(14);
				this.ctx.setFillStyle('#858585');
				let sWidth = this.ctx.measureText(this.subTitle).width
				if(sWidth > hW){
					this.ctx.fillText(this.subTitle.slice(0,19) + '...',((this.canvasW-hW) / 2),(
					((this.canvasW-hW) / 2) + hH + 55))
				}else{
					this.ctx.fillText(this.subTitle,((this.canvasW-hW) / 2),(
					((this.canvasW-hW) / 2) + hH + 55))
				}
				// 优惠券
				
				let Imgquan = await this.getImageInfo(this.Imgquan)
				let hWy = uni.upx2px(160);
				let hHy = uni.upx2px(50);
				this.ctx.setFillStyle('#FFFFFF');
				this.ctx.drawImage(Imgquan.path,(((this.canvasW-hW) / 2) + 218),(
				((this.canvasW-hW) / 2) + hH + 56),hWy,hHy,8)
				this.ctx.fillText(this.price,((this.canvasW-hW) / 2 + 228),(
				((this.canvasW-hW) / 2) + hH + 72))
				this.ctx.fillText('元券',((this.canvasW-hW) / 2 + 264),(
				((this.canvasW-hW) / 2) + hH + 71))
				//绘制价格
				this.ctx.setFontSize(14);
				this.ctx.setFillStyle('#f54545');
				this.ctx.fillText('券后价￥',((this.canvasW-hW) / 2),(
				((this.canvasW-hW) / 2) + hH + 76))
				this.ctx.setFontSize(18);
				this.ctx.fillText(this.price,(((this.canvasW-hW) / 2) + 58),(
				((this.canvasW-hW) / 2) + hH + 76))
				//绘制原价格
				// // #ifdef H5
				// if (this.PriceTxt != '' && this.price != '') {
				// 	//判断是否有销售价格且原价
				// 	this.ctx.setFillStyle(this.OriginalColor);
				// 	this.ctx.setFontSize(uni.upx2px(24));
				// 	this.ctx.fillText('原价￥',this.PriceTxt, (((this.canvasW-hW) / 2) + 88),(
				// ((this.canvasW-hW) / 2) + hH + 76)); //商品原价
				// }
				
				// // #endif
				// let _strlineW= (((this.canvasW-hW) / 2) + 78)
				// let _strHeight= (((this.canvasW-hW) / 2) + hH + 76)
				// this.ctx.strokeStyle = this.OriginalColor;
				// this.ctx.moveTo(_strlineW, _strHeight - uni.upx2px(10)); //起点
				// this.ctx.lineTo(_strlineW + this.ctx.measureText(this.OriginalTxt).width, _strHeight - uni.upx2px(10)); //终点
				
				
				
				
				
				
				//绘制虚线
				this.drawDashLine(this.ctx,10,(((this.canvasW-hW) / 2) + hH + 120),(this.canvasW-10),(((this.canvasW-hW) / 2) + hH + 120),5)
				//左边实心圆
				this.drawEmptyRound(this.ctx,0,(((this.canvasW-hW) / 2) + hH + 120),10)
				//右边实心圆
				this.drawEmptyRound(this.ctx,this.canvasW,(((this.canvasW-hW) / 2) + hH + 120),10)
				//提示文案
				this.ctx.setFontSize(12);
				this.ctx.setFillStyle('#858585');
				this.ctx.fillText('长按或扫描识别二维码领券',30,(((this.canvasW-hW) / 2) + hH + 150))
			
				//底部广告
				let BottomAdImg = await this.getImageInfo(this.abImg)
				this.ctx.drawImage(BottomAdImg.path,15,(((this.canvasW-hW) / 2) + hH + 160),300,86)
				//小程序码
				let qrcodeImg = await this.getImageInfo(this.qrcode)
				this.ctx.drawImage(qrcodeImg.path,238,(((this.canvasW-hW) / 2) + hH + 170), 72, 72)
				//延迟渲染
				setTimeout(()=>{
					this.ctx.draw(true,()=>{
						uni.hideLoading()
					})
				},500)
			},
			//绘制实心圆
			drawEmptyRound(ctx,x,y,radius){
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI,true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//绘制虚线
			drawDashLine(ctx,x1,y1,x2,y2,dashLength){
				ctx.setStrokeStyle("#cccccc")//设置线条的颜色
				ctx.setLineWidth(1)//设置线条宽度
				var dashLen = dashLength,
				xpos = x2 - x1, //得到横向的宽度;
				ypos = y2 - y1, //得到纵向的高度;
				numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
				//利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
				for(var i=0; i<numDashes; i++){
				 if(i % 2 === 0){
					 ctx.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
					 //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
				  }else{
					  ctx.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
				  }
				}
				ctx.stroke();
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius){
				ctx.beginPath()
				ctx.save()
				// 左上角
				ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
				ctx.stroke()
				ctx.clip()
				ctx.drawImage(img, x, y, width, height);
				ctx.restore()
				ctx.closePath()
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color){
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color); 
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round');  //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius/2, y + radius/2, width - radius , height - radius );
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
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
