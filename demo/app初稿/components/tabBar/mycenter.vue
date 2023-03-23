<template>
	 <scroll-view class="main_box" scroll-y="true"  @scrolltolower="lower">
		<view class="login">
			<view class="content">
				<!-- 头部logo -->
				<view class="header">
					<image src="../../static/img/app.png"></image>
				</view>
				<!-- 主体表单 -->
				<view class="main">
					<wInput
						v-model="phoneData"
						type="text"
						maxlength="11"
						placeholder="用户名/电话"
						:focus="isFocus"
					></wInput>
					<wInput
						v-model="passData"
						type="password"
						maxlength="11"
						placeholder="密码"
					></wInput>
				</view>
				
				<wButton 
					class="wbutton"
					text="登 录"
					:rotate="isRotate" 
					@click="startLogin"
				></wButton>
				
				<!-- 其他登录 -->
				<view class="other_login cuIcon">
					<view class="login_icon">
						<view class="cuIcon-weixin" @tap="login_weixin"></view>
					</view>
					<view class="login_icon">
						<view class="cuIcon-weibo" @tap="login_weibo"></view>
					</view>
					<view class="login_icon">
						<view class="cuIcon-github" @tap="login_github"></view>
					</view>
				</view>
				
				<!-- 底部信息 -->
				<view class="footer">
					<navigator url="../../pages/mycenter/forget" open-type="navigate">找回密码</navigator>
					
					<text>|</text>
					
					<navigator url="../../pages/mycenter/register" open-type="navigate">注册账号</navigator>
				</view>
			</view>
		</view>	
	</scroll-view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	
	export default{
		data() {
			return{
				
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
				isLogin:false,
				loginId:""//登录的ID
			};
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		components:{
			wInput,
			wButton,
		},
		props: {
					mycenter:{
						type:Array,
						value:[]
					}
				},
		methods: {
			lower(){
				uni.showToast({title:'加载更多'})
			},
			
			startLogin(e){
				console.log(this.mycenter)
				let mycenter = this.mycenter
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					console.log('别急')
					return false;
				}
				_this.isRotate=true
				//登录
				for (var i = 0; i < mycenter.length; i++) {
					
					if (this.phoneData.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '用户名不能为空'
						});
						_this.isRotate=false
						return;
					}
					if (this.passData.length == "") {
						 uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '密码不能为空'
						});
						_this.isRotate=false
						return;
					}
					if(this.phoneData == mycenter[i].zhanghao){
						if (this.passData == mycenter[i].password) {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '登录成功'
							})
							//登录成功后进行跳转
							setTimeout(function(){
								_this.loginId = i,
								_this.isRotate=false,
								_this.isLogin = true,
								_this.$emit("isLogin",_this.isLogin),
								_this.$emit("loginId",_this.loginId),
								uni.navigateTo({
									url:"/pages/mycenter/usermyself/usermyself"
								})
							},3000)
							return;
						}
					}
				}
				if(this.phoneData != ""&&this.passData != ""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名或密码不正确'
					});
					_this.isRotate=false
					return false;
				}
				setTimeout(function(){
					_this.isRotate=false
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '登录超时'
					})
				},3000)
			},
			
			//合作登陆
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>