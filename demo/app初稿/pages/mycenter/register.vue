<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/img/app.png"></image> 
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码(输入11位即可)"
				></wInput>
				<wInput
					v-model="registerData"
					type="text"
					maxlength="11"
					placeholder="请输入用户名"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="登录密码"
					isShowPass
				></wInput>
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码(tip:四位数即可)"
					
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
					
			</view>
				
			<wButton 
				class="wbutton"
				text="注 册"
				:rotate="isRotate" 
				@click.native="startReg()"
			></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				> 同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《好鉴APP用户登录注册协议》</navigator>
			</view>
		</view>
		
		<!-- 底部信息 -->
		<view class="footer">
			<navigator url="../index/index" open-type="navigate">重新登录</navigator>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				phoneData:'', // 用户/电话
				registerData:"",//用户名
				passData:'', //密码
				verCode:"", //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				mycenter:[],
				isregister:false //是否已经注册
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		onLoad() {
			uniCloud.callFunction({
				name:"mycenter",
				success: (e) => {
					this.mycenter = e.result.data
					console.log(this.mycenter)
				}
			})
		},
		methods: {
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
		    startReg() {
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate=true
				
				for(var i = 0; i< this.mycenter.length; i++){
					if (this.showAgree == false) {
					    uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '请先同意《协议》'
					    });
						setTimeout(function(){
							_this.isRotate=false
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '注册超时'
							})
						},3000)
					    return false;
					}
					if (this.phoneData.length !=11) {
					    uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '手机号不正确'
					    });
						setTimeout(function(){
							_this.isRotate=false
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '注册超时'
							})
						},3000)
					    return false;
					}
					if (this.verCode.length != 4) {
					    uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '验证码不正确'
					    });
						setTimeout(function(){
							_this.isRotate=false
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '注册超时'
							})
						},3000)
					    return false;
					}
					if(this.registerData == this.mycenter[i].zhanghao){
						_this.isregister = true
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '用户名已存在'
						})
						setTimeout(function(){
							_this.isRotate=false
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '注册超时'
							})
						},3000)
						return false;
					}
				}
				
				if(_this.isregister == false){
					uni.navigateTo({
						url:"registerSuccess?zhanghao=" + this.registerData +"&password=" + this.passData 
					})
				}
				setTimeout(function(){
					_this.isRotate=false
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '注册超时'
					})
				},3000)
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("../../components/tabBar/css/main.css");
</style>