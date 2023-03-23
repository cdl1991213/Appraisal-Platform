<template>
	<view>
		<view class="top">
			<view>A3Mall</view>
			<view>素烟姿</view>
			<image src="../../static/images/login-bg.png"></image>
		</view>
		
		<view class="theform">
			<form @submit="onSubmit">
				<view class="fields-box">
					<view class="field-box iconfont">
						<input type="number" class="uni-input" name="phone" value="18319517777" placeholder="手机号" />
					</view>
					<view class="field-box iconfont">
						<input type="password" class="uni-input" name="password" value="admin888" placeholder="密码" />
					</view>
				</view>
				
				<view class="btn">
					<button :disabled="isSubmit" form-type="submit">登 陆</button>
				</view>
			</form>
			<view class="tips-box clear">
				<view><navigator url="register" hover-class="none">用户注册</navigator></view>
				<view><navigator url="forget" hover-class="none">忘记密码</navigator></view>
			</view>
		</view>
		
		<loading v-if="isSubmit" :layer="true"></loading>
	</view>
</template>
 
<script>
	import loading from '../../components/tool/loading'
	import { checkPhone } from '../../common/check';
	export default {
		components: {
			loading
		},
		data() {
			return {
				isSubmit: false
			}
		},
		onLoad() {
		},
		onBackPress(e){
			if (e.from === 'navigateBack') {
				return false;
			}
			
			this.$utils.switchTab('index/index');
			return true;
		},
		methods: {
			onSubmit(e){
				let formData = e.detail.value;
				this.isSubmit = true;
				if(formData.phone == ''){
					this.isSubmit = false;
					this.$utils.msg("请填写手机号码！");
					return ;
				}else if(!checkPhone(formData.phone)){
					this.isSubmit = false;
					this.$utils.msg("您填写的手机号码不正确！");
					return ;
				}else if(formData.password == ''){
					this.isSubmit = false;
					this.$utils.msg("请填写密码！");
					return ;
				}
				
				this.$http.sendLogin({
					username: formData.phone,
					password: formData.password
				}).then((result)=>{
					if(result.status){
						this.$store.commit("UPDATEUSERS",result.data);
						this.$utils.switchTab('ucenter/index');
					}else{
						this.$utils.msg(result.info);
					}
					
					this.isSubmit = false;
				}).catch((error)=>{
					this.isSubmit = false;
					this.$utils.msg("连接网络错误，请检查网络是否连接！");
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		background-color: #b61922;
		width: 100%;
		height: 386rpx;
		position: relative;
		z-index: 1;
		view {
			z-index: 2;
			position: absolute;
			&:nth-child(1) {
				top: 90rpx;
				font-size: 72rpx;
				color: #fff;
				width: 100%;
				text-align: center;
				&::after {
					position: absolute;
					content: " ";
					background-color: #d1676d;
					height: 1px;
					width: 210rpx;
					top: 120rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
			&:nth-child(2) {
				top: 225rpx;
				font-size: 49rpx;
				color: #fff000;
				text-align: center;
				width: 100%;
			}
		}
		image {
			width: 100%;
			height: 386rpx;
		}
	}
	
	.theform {
		width: 590rpx;
		margin: 70rpx auto 0 auto;
		.fields-box{
			width: 100%;
			border: 1px solid #d2cdcd;
			overflow: hidden;
			border-radius: 10rpx;
			.field-box{
				width: 100%;
				height: 100rpx;
				position: relative;
				font-size: 40rpx;
				&:first-child {
					border-bottom:1px solid #d2cdcd;;
				}
				input { 
					width: 100%; height: 100rpx; line-height: 100rpx; 
					text-indent: 100rpx; font-size:29rpx; color: #888;
				}
				&:nth-child(1):before { 
					content: "\e61b";
					color: #bfbfbf;
					position: absolute;
					left: 30rpx;
					top: 28rpx;
				}
				&:nth-child(2):before {
					content: "\e61a";
					color: #bfbfbf;
					position: absolute;
					left: 30rpx;
					top: 28rpx;
				}
			}
		}
		.btn{
			width: 100%;
			margin-top: 48rpx;
			button{
				color: #fff;
				background-color: #b91922;
				border: 1px solid #b91922;
				border-radius: 10rpx;
				font-size: 33rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
			}
		}
		.tips-box{
			width: 100%;
			font-size: 28rpx;
			color: #888;
			margin-top: 45rpx;
			view {
				width: 50%;
				float: left;
				&:last-child {
					text-align: right;
				}
			}
		}
	}
</style>