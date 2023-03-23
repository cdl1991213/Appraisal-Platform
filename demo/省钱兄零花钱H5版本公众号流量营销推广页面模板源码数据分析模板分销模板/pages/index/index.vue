<template>
	<view class="container">
		<view class="userinfo-card">
			<view class="card-box">
				<view class="user-section">
					<view class="avatar-wrap">
						<image class="avatar" :src="image_url"></image>
					</view>
					<view class="portrait-box">
						<view class="info-box">
							<text class="username" @click="goLogin">{{ mobile ? mobile : '游客' }}</text>
						</view>
						<view class="tuan" v-if="invitationCode">
							<view class="ma">邀请ID：{{invitationCode}}</view>
							<view class="fuzi" @click="copyHref()">复制</view>
						</view>
					</view>
				</view>
				<view class="balance-card-wrap">
					<view class="balance-card">
						<view class="tit">可提现金额(元)</view>
						<view class="xia">
							<view class="num">
								<text style="font-size: 40upx;">￥</text>{{ moneys }}
							</view>
							<view @click="getMoneys()" class="withdraw-btn">立即提现</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="income-card" style="margin-top: 0upx;">
				<view class="tit" @click="goMyEarnings">
					<text>我的收益</text>
					<image src="@/static/right_icon.png" mode=""></image>
				</view>
				<view class="show-content">
					<view class="view-category">
						<view class="num"><text style="font-size: 24upx;">￥</text>{{myAllMoney}}</view>
						<view class="text">全部收益</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num"><text style="font-size: 24upx;">￥</text>{{myZhishu}}</view>
						<view class="text">直属收益</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num"> <text style="font-size: 24upx;">￥</text> {{myFeiZhishu}}</view>
						<view class="text">非直属收益</view>
					</view>
				</view>
			</view>
			<!-- 我的团队 -->
			<view class="income-card">
				<view class="tit" @click="goMyTeam">
					<text>我的团队</text>
					<image src="@/static/right_icon.png" mode=""></image>
				</view>
				<view class="show-content">
					<view class="view-category">
						<view class="num">{{myTuanAllNumber}}</view>
						<view class="text">全部成员</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">{{myTuanZhishu}}</view>
						<view class="text">直属成员</view>
					</view>
					<view class="line"></view>
					<view class="view-category">
						<view class="num">{{myTuanFeiZhishu}}</view>
						<view class="text">非直属成员</view>
					</view>
				</view>
			</view>
			<!-- 工具 -->
			<view class="tool-card">
				<view class="tool-item" @click="navToLogin('/pages/member/yao')">
					<image src="@/static/rindex/tuiguang.png" mode="widthFix" class="view-image-left"></image>
					<view class="item-right">
						<view class="view-text">推广中心</view>
						<image src="@/static/right_icon.png" class="view-image-right"></image>
					</view>
				</view>
				<view class="tool-item" @click="navToLogin('/pages/member/cashList')">
					<image src="@/static/rindex/tixian.png" mode="widthFix" class="view-image-left"></image>
					<view class="item-right">
						<view class="view-text">提现明细</view>
						<image src="@/static/right_icon.png" class="view-image-right"></image>
					</view>
				</view>
				<view class="tool-item" @tap='goCustomer'>
					<image src="@/static/rindex/kefu.png" mode="widthFix" class="view-image-left"></image>
					<view class="item-right">
						<view class="view-text">客服中心</view>
						<image src="@/static/right_icon.png" class="view-image-right"></image>
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
				myAllMoney: '0.0',
				myZhishu: '0.0',
				myFeiZhishu: '0.0',

				myTuanAllNumber: '0',
				myTuanZhishu: '0',
				myTuanFeiZhishu: '0',
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
				this.getMoney(userId);
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
		onLoad() {
			this.getUser();
		},
		methods: {
			getUser(){
				setTimeout(d =>{
					this.token = this.$queue.getData('token');
					let mobile = this.$queue.getData('nickName');
					let image_url = this.$queue.getData('image_url');
					
					let userId = this.$queue.getData('userId');
					if (userId) {
						this.getMoney(userId);
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
				},2000);
			},
			getMoney(userId) {
				this.$Request.getT('/user/selectUserSumMoney?userId=' + userId).then(res => {
					if (res.code === 0) {
						// parseFloat(this.MaxMoney + this.newsList[i].goods.memberPrice);
						// this.myAllMoney = parseFloat(res.data.zhiMoney + res.data.feiMoney);
						let tempVal = parseFloat(res.data.zhiMoney + res.data.feiMoney).toFixed(3)
						this.myAllMoney = tempVal.substring(0, tempVal.length - 1)
						this.myZhishu = res.data.zhiMoney;
						this.myFeiZhishu = res.data.feiMoney;
						this.myTuanAllNumber = parseInt(res.data.zhiUser) + parseInt(res.data.feiUser);
						this.myTuanZhishu = res.data.zhiUser;
						this.myTuanFeiZhishu = res.data.feiUser;
					}
				});
			},
			goMyEarnings() {
				uni.navigateTo({
					url: '/pages/member/zijing'
				});
			},
			goMyTeam() {
				uni.navigateTo({
					url: '/pages/member/yaoqing'
				});
			},
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
				} else {
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
		background: #F2F3F7;
	}

	.container {
		.userinfo-card {
			.card-box {
				width: 100%;
				height: 400upx;
				position: relative;
				z-index: 0;

				.user-section {
					position: absolute;
					top: 0;
					z-index: 10;
					width: 100%;
					padding: 50upx 30upx 210upx;
					display: flex;

					.avatar-wrap {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						overflow: hidden;

						.avatar {
							width: 100%;
							height: 100%;
						}
					}

					.portrait-box {
						margin-left: 18upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.info-box {
							font-size: 38upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333;
						}

						.tuan {
							display: flex;
							align-items: center;

							.ma {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333;
							}

							.fuzi {
								width: 64upx;
								height: 34upx;
								background: #CCCCCC;
								border-radius: 15upx;
								font-size: 20upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								text-align: center;
								line-height: 34upx;
								margin-left: 10upx;
							}
						}
					}
				}

				.balance-card-wrap {
					width: 100%;
					height: 200upx;
					padding: 0 20upx;
					position: absolute;
					bottom: 0;
					z-index: 10;

					.balance-card {
						width: 100%;
						height: 200upx;
						background: linear-gradient(90deg, #fddeb8 0%, #f9c378 100%);
						border-radius: 20upx;
						padding: 30upx;

						.tit {
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #754202;
						}

						.xia {
							width: 100%;
							display: flex;
							justify-content: space-between;

							.num {
								font-size: 70upx;
								font-family: DINPro;
								font-weight: bold;
								color: #754202;
							}

							.withdraw-btn {
								width: 150upx;
								height: 60upx;
								line-height: 60upx;
								text-align: center;
								background: #3B3533;
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #F9C378;
								border-radius: 10upx;
							}
						}
					}
				}
			}

		}


		.main {
			padding: 20upx;

			.income-card {
				width: 100%;
				background-color: #fff;
				border-radius: 20upx;
				padding: 30upx;
				margin-top: 20upx;

				.tit {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 32upx;
					line-height: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;

					image {
						width: 10upx;
						height: 21upx;
					}
				}

				.show-content {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-top: 40upx;

					.view-category {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.num {
							font-size: 38upx;
							font-family: PingFang SC;
							font-weight: 800;
							color: #333333;
						}

						.text {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
					}

					.line {
						width: 1px;
						height: 65upx;
						background-color: #E6E6E6;
					}
				}
			}

			.tool-card {
				background-color: #ffffff;
				width: 100%;
				padding: 0 30upx;
				margin-top: 20upx;
				border-radius: 20upx;

				.tool-item {
					display: flex;
					flex-direction: row;
					width: 100%;
					height: 100upx;
					align-items: center;
					justify-content: space-between;

					.view-image-left {
						width: 44upx;
					}

					.item-right {
						flex: 1;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;

						.view-text {
							margin-left: 22upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #1A1A1A;
						}

						.view-image-right {
							width: 10upx;
							height: 21upx;
						}
					}
				}
			}
		}
	}
</style>
