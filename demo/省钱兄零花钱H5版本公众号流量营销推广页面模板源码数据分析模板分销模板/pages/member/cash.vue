<template>
	<view class="cash" style="background: #FFFFFF;">
		<view style="padding: 30upx;">
			<view style=";font-size: 40upx;font-weight: 800;">提现</view>
			<view style="color: #666666;font-size: 24upx;margin-top:20upx;margin-bottom:100upx">请填写真实有效的信息</view>
			<view style="">真实姓名</view>
			<wInput v-model="wxzsname" style='padding-left:0' type="text" LeftInput="0" placeholder="请输入真实姓名" paddingView="46"></wInput>

			<view style="margin-top:40upx">提现金额</view>
			<wInput v-model="wxphone" type="text" style='padding-left:0' LeftInput="0" placeholder="请输入你要提现的金额" paddingView="46"></wInput>
			<view style="width: 90%;display: flex;">
				<view style="color: #666666;font-size: 22upx;width: 70%;border-right: 1upx solid #CCCCCC;height: 20upx;margin-top:10upx;line-height: 10upx;  padding: 20upx 20upx 20upx 10upx">可提现金额
					{{money}}元</view>
				<view style="color: #008fff;font-size: 20upx;padding: 20upx 0 20upx 20upx ;line-height: 20upx;" @tap='AllCash'>全部提现</view>
			</view>
		</view>

		<button class="btn" @tap="getOut">立即提现</button>
		<!-- <view style="padding: 30upx;">
			<view style="color: #666666;font-size: 24upx;margin-top:80upx">说明</view>
			<view style="color: #666666;font-size: 24upx;line-height:50upx">1.请填写正确提现账号</view>
		</view> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '0.00',
				index: 1,
				zhifubao: '',
				zhifubaoName: '',
				wxphone: '',
				wxzsname: ''
			}
		},
		onShow: function(e) {
			this.getMoney();
		},

		methods: {
			getOut() {
				if (this.wxzsname != undefined && this.wxzsname != '') {} else {
					this.$queue.showToast('真实姓名不能为空');
					return;
				}
				if (this.wxphone < 1) {
					this.$queue.showToast('金额不能小于1,请输入正确金额!');
					return;
				}
				
				if (!/^\d+$/.test(this.wxphone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确金额，不能包含中文，英文，特殊字符和小数'
					});
					return;
				}
				
				let userId = this.$queue.getData('userId');
				this.$Request.postJson('/user/cashMoney?userId=' + userId + '&money=' + this.wxphone).then(res => {
					if (res.code === 0) {
						this.$queue.showToast(res.msg);
						this.getMoney();
					} else {
						this.$queue.showToast(res.msg);
					}
				});
			},
			AllCash() {
				this.wxphone = this.money;
			},
			zfblq(t) {
				this.index = t;
			},
			moneyList() {
				uni.navigateTo({
					url: '/pages/member/moneyList'
				})
			},
			list() {
				uni.navigateTo({
					url: '/pages/member/cashList'
				})
			},
			goZhifuBao() {
				uni.navigateTo({
					url: "/pages/member/zhifubao"
				})
			},
			getMoney() {
				let that = this;
				let token = this.$queue.getData("token");
				let userId = this.$queue.getData("userId");
				if (token) {
					this.$Request.getT("/user/selectUserMoney?userId=" + userId).then(res => {
						if (res.code === 0 && res.data) {
							that.money = parseFloat(res.data.money).toFixed(2);
						} else {
							that.money = '0.00';

						}
					});
					this.$Request.getT("/user/selectUserById?userId=" + userId).then(res => {
						if (res.code === 0 && res.data) {
							that.zhifubao = res.data.zhifubao;
							that.zhifubaoName = res.data.zhifubaoName;
						}
						uni.hideLoading();
					});
				}

			}
		}
	}
</script>

<style lang='less'>
	page {
		background: #FFFFFF;
		/* padding: 30upx; */
	}

	.lqbtn {
		padding: 30upx 10upx;
		border: 1upx solid #CCCCCC;
		width: 40%;
		text-align: center;
		border-radius: 10upx;
	}

	.container {
		top: 10upx;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.btn {
		margin-top: 120upx;
		background-color: #3F64FF;
		color: #fff;
		width: 688upx;
		height: 102upx;
		line-height: 102upx;
		text-align: center;
		font-size: 32upx;
		border-radius: 50upx;
	}
</style>
