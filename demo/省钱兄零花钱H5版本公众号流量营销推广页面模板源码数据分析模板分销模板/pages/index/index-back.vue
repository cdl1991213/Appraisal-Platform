<template>
	<view class="container">
		<view class="user-section">
			<image src="https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/ff72f363508b4f66b536888217131407.jpg" class="bg"></image>
			<!-- 设置 -->
			<view class="user-info-box">
				<view class="user-View">
					<view style="width: 24%;" class="portrait-box">
						<image class="portrait" :src="image_url"></image>
					</view>
					<view class="portraitbOX">
						<view class="info-box" style="margin-top: 16upx">
							<text class="username" style="color: #FEFEFE" @click="goLogin">{{ mobile ? mobile : '游客' }}</text>
							<!-- #ifndef  H5 -->
							<!-- <image src="../../static/my_slices/xingxing.png" style="width: 40upx;height: 36upx;margin-top: -6upx;vertical-align: text-top; margin-left: 50upx;"></image> -->
							<!-- #endif -->
							<!-- #ifdef  H5 -->
							<!-- <image src="../../static/my_slices/xingxing.png" style="width: 40upx;height: 36upx;margin-top: -2upx;vertical-align: text-top; margin-left: 50upx;"></image> -->
							<!-- #endif -->
						</view>
						<view style="display: flex;">
							<view v-if="isTuan == 1" class="tuan">

							</view>
							<!-- v-if="relation_id" -->
							<view class="tuan">
								邀请码：{{invitationCode}}
								<text class="fuzi" @click="copyHref()">复制</text>
							</view>
						</view>

					</view>
				</view>
				<view class="userBox">

				</view>
				<view class="userBox2">
					<view>
						可提现：<text style="font-size: 40upx;">￥{{ moneys }}</text>
					</view>
					<button @click="getMoneys()" class="getMo">提现</button>


				</view>
			</view>

		</view>

		<view>
			<view class="tui-box ">
				<view class="tui-cell-header">
					<view class="tui-cell-title">会员服务</view>
				</view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item">
						<view class="tui-icon-box" @click="navToLogin('/pages/member/zijing')">
							<image src="../../static/my_slices/dingdan.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的收入</view>
					</view>
					<view class="tui-tool-item" @click="navToLogin('/pages/member/yaoqing')">
						<!-- 跳转不对 -->
						<view class="tui-icon-box">
							<image src="../../static/my_slices/jiaren.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的邀请</view>
					</view>

					<view class="tui-tool-item" @click="navToLogin('/pages/member/yao')">
						<!-- 跳转不对 -->
						<view class="tui-icon-box">
							<image src="../../static/my_slices/fenxiang.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">推广中心</view>
					</view>
					<view class="tui-tool-item" @click="navToLogin('/pages/member/cashList')">
						<!-- 跳转不对 -->
						<view class="tui-icon-box">
							<image src="../../static/my_slices/tixian.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">提现明细</view>
					</view>
				</view>
			</view>
			<view class="tui-box ">
				<view class="tui-cell-header">
					<view class="tui-cell-title">我的功能</view>
				</view>
				<view class="tui-order-list tui-flex-wrap" @tap='goCustomer'>
					<view class="tui-tool-item">
						<view class="tui-icon-box">
							<image src="../../static/my_slices/guanyuwom.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">联系客服</view>
					</view>

				</view>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				modalName: '',
				invitationCode: '',
				token: '',
				mobile: '',
				relation_id: '',
				image_url: 'https://www.gomyorder.cn/logo.png',
				isTuan: 0,
				moneys: '0',
			};
		},
		onShow() {
			this.token = this.$queue.getData('token');
			let mobile = this.$queue.getData('nickName');
			let image_url = this.$queue.getData('image_url');
			
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getUserInfo(userId);
				this.getUserMoney(userId);
			}

			if (mobile && mobile !== 'undefined') {
				this.mobile = mobile;
			} else {
				this.mobile = '';
			}
			if (image_url && image_url !== 'undefined') {
				this.image_url = image_url;
			} else {
				this.image_url = 'https://shegnqx.oss-cn-beijing.aliyuncs.com/20200923/cad8b871208644f094bc38e3e65585e6.png';
			}
		},

		methods: {
			goCustomer() {
				uni.navigateTo({
					url: '../member/customer'
				});
			},
			getMoneys() {
				let zhifubao = this.$queue.getData("zhifubao");
				if (zhifubao) {
					uni.navigateTo({
						url: '/pages/member/cash'
					});
				}else{
					uni.navigateTo({
						url: '/pages/member/zhifubao'
					});
				}
			},
			//邀请码复制
			copyHref() {
				uni.setClipboardData({
					data: this.invitationCode,
					success: r => {
						this.$queue.showToast('邀请码复制成功');
					}
				});
			},
			getUserMoney(userId) {
				this.$Request.getT('/user/selectUserMoney?userId=' + userId).then(res => {
					if (res.code === 0) {
						this.moneys = res.data.money;
					}
				});
			},
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/selectUserById?userId=' + userId).then(res => {
					if (res.code === 0) {
						this.invitationCode = res.data.invitationCode;
						this.$queue.setData("image_url", res.data.imgUrl);
						this.$queue.setData("nickName", res.data.nickName);
						this.$queue.setData("invitationCode", res.data.invitationCode);
						this.$queue.setData("inviterCode", res.data.inviterCode);
						this.$queue.setData("zhifubao", res.data.zhifubao);
						this.$queue.setData("zhifubaoName", res.data.zhifubaoName);

					} else {
						this.$queue.logout();
						uni.showModal({
							title: '用户信息提示',
							content: '本地用户信息失效需要重新授权登录',
							showCancel: false,
							success: e => {
								this.navTo('/pages/member/register');
							}
						});
					}
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navToLogin(url) {
				uni.navigateTo({
					url
				});

			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background: #FFFFFF;
	}

	.user-View {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 6px;
		padding: 36upx 25upx 0upx;
	}

	.userBox {
		width: 90%;
		border-bottom: 1upx solid #FFFFFF;
		margin: 20upx 40upx;
	}

	.userBox2 {
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		color: #FFFFFF;
		margin-left: 50upx;
	}

	.getMo {
		background-color: #fff;
		color: #ff1d6d;
		width: 166upx;
		height: 58upx;
		font-weight: bolder;
		line-height: 60upx;
		margin-top: 5upx;
		margin-right: 50upx;
		font-size: 32upx;
	}

	.tuan {
		margin-top: 12upx;
		font-size: 24upx;
		color: #FEFEFE;
		padding: 4upx 20upx;
	}

	.portraitbOX {
		text-align: left;
		margin-left: 12upx;
		width: 260px;
		position: relative;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 14rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 46rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 38rpx;
		line-height: 38rpx;
		font-weight: bolder;
		color: #333;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 60rpx;
		height: 60rpx;
		display: block;
		padding: 4upx;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10px;
	}

	.tixian {
		background: -moz-linear-gradient(left, #f15b6c, #E10A07 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #E10A07));
		background: -webkit-linear-gradient(left, #f15b6c 0, #E10A07 100%);
		background: -o-linear-gradient(left, #f15b6c 0, #E10A07 100%);
		background: -ms-linear-gradient(left, #f15b6c 0, #E10A07 100%);
		background: linear-gradient(to left, #f15b6c 0, #E10A07 100%);
	}

	.user-section {
		// margin-top: -20upx;
		height: 326upx;
		width: 706upx;
		margin: 0 auto;
		// padding: 50upx 50upx 0;
		position: relative;
		border-radius: 10upx;

		.bg {
			box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
			position: absolute;
			left: -10upx;
			// top:96upx;
			width: 100%;
			height: 100%;
			filter: blur(1px);
		}
	}

	.user-info-box {
		width: 100%;
		height: 200upx;
		// display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 140upx;
			height: 140upx;
			border-radius: 50%;
			margin-left: 20upx;
		}

		.username {
			font-size: 16px;
			color: #f2f2f2;
			margin-top: 16px;
			margin-left: 10px;
		}

		.username1 {
			font-size: 14px;
			color: whitesmoke;
			margin-top: 16px;
			margin-left: 10px;
		}
	}

	.fuzi {
		border: 1upx solid #FFFFFF;
		padding: 4upx 16upx;
		border-radius: 20upx;
		font-size: 20upx;
		margin-left: 20upx;
	}
</style>
