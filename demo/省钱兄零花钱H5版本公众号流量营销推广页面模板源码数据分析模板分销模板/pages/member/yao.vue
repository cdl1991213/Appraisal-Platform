<template>
	<view class="content">
		<view class="view1" v-bind:style="{backgroundImage: 'url('+backgroundImage+')'}">
			<view style="display: flex; flex-direction: row; padding-top: 880upx;">
				<image :src="url" style="width: 100upx;height: 100upx;margin-left: 30upx;"></image>
				<!-- <view class="login-view-text1" style="margin-left: 30upx;width: 59%;">
					<view style="color: #FFFFFF;font-size: 16px;">{{ nickName }}</view>
					<view style="color: #FFFFFF; font-size: 12px;margin-top: 20upx;">邀请码:{{invitationCode}}</view>
				</view> -->
				<canvas canvas-id="qrcode" style="width: 140upx;height: 130upx;" />
			</view>
		</view>
		<view style="display: flex;flex-direction: row; padding: 40upx;">
			<button @tap="showModal()" type="default" style="background-color: #FF5808;font-size: 16px;font-weight: bold;color: #FFFFFF; width: 90%; margin-left: 40upx;border-radius: 50upx;">生成海报邀请</button>

			<!-- 生成海报 -->
			<!-- 图片展示由自己实现 -->
			<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
					</view>
					<view class="flex_row marginTop2vh">
						<!-- #ifdef H5 -->
						<button type="primary" size="mini">长按上方图片保存</button>
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<!-- 画布 -->
			<view class="hideCanvasView">
				<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
			</view>
		</view>
		<tki-qrcode ref="qrcode" :val="url" :size="200" background="#fff" foreground="#000" pdground="#000" :onval="true"
		 :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" v-if="backgroundImage && erweimapath && haibaoShow" @tap="hideModal">
				<view class="bg-img">
					<wm-poster @success="posterSuccess" :imgSrc="backgroundImage" :Referrer="'我的推广码'" :QrSrc="url"
					 Title="快来和我一起做任务赚零花钱吧" :LineType="false"></wm-poster>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';

	import wmPoster from '@/components/wm-poster/wm-posterorders.vue';
	import uQRCode from "../../js_sdk/Sansnn-uQRCode/uqrcode.js"
	import _app from '../../js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	export default {
		components: {
			tkiQrcode,
			wmPoster,
			getSharePoster
		},
		data() {
			return {
				erweimapath: '',
				poster: {},
				qrShow: false,
				haibaoImg: null,
				haibaoShow: false,
				modalName: '',
				canvasId: 'default_PosterCanvasId',
				imageUrl: '',
				userImageUrl: '',
				nickName: '',
				invitationCode: '',
				backgroundImage: '',
				tuiguang: '',
				QRtkcket:'',
				url: ''
			};
		},
		onLoad() {
			let invitationCode = this.$queue.getData("invitationCode");
			if (invitationCode) {
				this.getQRCode(invitationCode);
			}
			this.getBackImageList();
			
		},
		methods: {
			getQRCode(inviterCode) {
				this.$Request.getT('/wx/getQRCode?inviterCode=' + inviterCode).then(res => {
					if (res.code === 0) {
						this.url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + res.data.ticket;
						
					}
				});
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					this.$queue.showLoading('海报生成中...');
				} else {
					this.modalName = 'Image';
				}
			},
			hideModal() {
				this.modalName = null;
			},
			qrR(path) {
				this.erweimapath = path;
			},
			getBackImageList() {
				this.$Request.getT('/banner/selectInvitationBackground').then(res => {
					if (res.code === 0) {
						this.backgroundImage = res.data.imageUrl;
						this.tuiguang = res.data.describes + '\n';
					}
				});
				this.showModal();
			},
			make() {
				uQRCode.make({
					canvasId: 'default_PosterCanvasId',
					componentInstance: this,
					text: this.url,
					size: 68,
					margin: 4,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						console.log(res)
					}
				})
			},
			saveImage() {
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style scoped>
	page {
		background: #ffffff;
	}
	
	.view1 {
		background-size: 100%;
		width: 95%;
		height: 1000upx;
		margin: 20upx 20upx 0 20upx;
	}
	
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
