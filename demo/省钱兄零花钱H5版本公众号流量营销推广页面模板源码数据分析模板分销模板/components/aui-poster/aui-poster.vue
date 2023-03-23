<template name="aui-poster">
	<view class="aui-poster" v-if="SHOW" :class="{
		'aui-poster-in': FADE==1,
		'aui-poster-out': FADE==0}"
	>
	<view style="">
		<view class="aui-mask" v-if="mask" @touchmove.stop.prevent data-type="close" @click.stop="maskTapClose ? _clickFn($event) : ''"></view>
		<view class="aui-poster-main">
			<view  style="width: 505upx;height: 700upx;">
					<image src="https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/8b04c1e45bbb4d75b635e463cf73da7c.jpg" style="width: 286upx;height: 84upx;margin-left: 30%;margin-top: 20upx;"></image>
				<img class="aui-poster-img" mode="widthFix" :src="image" data-type="main">
				<view class="" style="font-size: 22upx;width: 90%;height: 60upx;background: #f6f6f6;border-radius: 10upx;line-height: 60upx;margin-left: 14%;margin-top: 20upx;text-align: center;">
					识别关注公众号二维码，了解更多企业资讯
				</view>
			</view>
			<view style="height: 100upx;background:#f31a4f;color: #FFFFFF;text-align: center;line-height: 100upx;border-radius: 0upx 0upx 20upx 20upx;">保存到相册</view>
			<img class="aui-poster-close" mode="widthFix" data-type="close" @click.stop="_clickFn($event)" src="https://xbjz1.oss-cn-beijing.aliyuncs.com/upload/default/gz-close.png">
		</view>
	</view>
	
	</view>
</template>

<script>
	export default {
		name: 'aui-poster',
		props: {			
			mask: { //是否显示遮罩，默认false
				type: Boolean,
				default: true
			},
			maskTapClose: { //遮罩层点击是否关闭
				type: Boolean,
				default: false
			},
			image: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				SHOW: false,
				FADE: -1
			};
		},
		created(){
			var _this = this;
				
		},
		onLoad(){
			
		},
		methods:{
			show(){
				var _this = this;
				return new Promise(function(resolve, reject){
					_this.SHOW = true;
					_this.FADE = 1;					
					resolve();
				});
			},
			hide(){
				var _this = this;
				return new Promise(function(resolve, reject){
					_this.FADE = 0;
					var _hidetimer = setTimeout(()=>{
						_this.SHOW = false;
						_this.FADE = -1;
						clearTimeout(_hidetimer);
					},100)
					resolve();
				});
			},
			_clickFn(e){
				var _this = this,
					type = e.currentTarget.dataset.type;
				_this.hide();
				var _closetimer = setTimeout(()=>{
					_this.$emit("callback", {type: type});
					clearTimeout(_closetimer);
				},100)
			},			
		}
	}
</script>

<style>
	/*poster 广告弹窗*/
	.aui-poster{width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 998;}
	.aui-poster .aui-mask{z-index: 996; position: absolute;}
	.aui-poster-main{width: 80%; opacity: 0; position: fixed; top: -50vh; left: 10%; z-index: 999;background: #FFFFFF;border-radius: 20upx;}
	.aui-poster-in .aui-poster-main{animation: aui-slide-up_to_middle .3s ease-out forwards;}
	.aui-poster-out .aui-poster-main{animation: aui-slide-middle_to_up .2s ease-out forwards;}
	.aui-poster-main .aui-poster-img{width: 90%; pointer-events: auto; position: relative; z-index: 999;left: 14%;top:20upx}
	.aui-poster-main .aui-poster-close{width: 30px; position: absolute; top: -webkit-calc(100% - 10px); top: calc(100% - 10px); left: 50%; -moz-transform: translate(-50%,0); -ms-transform: translate(-50%,0); -webkit-transform: translate(-50%,0); transform: translate(-50%,0); z-index: -1;}
	
</style>
