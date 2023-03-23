<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
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
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码(tip:四位数即可)"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>
		
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
				phoneData: "", //电话
				passData: "", //密码
				registerData:"",//用户名
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
				mycenter:[]
			}
		},
		components:{
			wInput,
			wButton
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
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate=true
				
				
				for(var i = 0; i< this.mycenter.length; i++){
					if (this.phoneData.length != 11) {
					    setTimeout(function(){
					    	_this.isRotate=false
					    	uni.showToast({
					    		icon: 'none',
					    		position: 'bottom',
					    		title: '手机号不正确'
					    	})
					    },3000)
					    return false;
					}
					if (this.verCode.length != 4) {
					    setTimeout(function(){
					    	_this.isRotate=false
					    	uni.showToast({
					    		icon: 'none',
					    		position: 'bottom',
					    		title: '验证码不正确'
					    	})
					    },3000)
					    return false;
					}
					if(this.registerData == this.mycenter[i].zhanghao){
							uni.navigateTo({
								url:"forgetSuccess?_id=" + this.mycenter[i]._id + "&password=" + this.passData
							})
					}
				}
				
				
				if(_this.phoneData != ""&&_this.passData != ""&&_this.registerData != ""&&_this.verCode != ""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号码或用户名错误'
					});
					_this.isRotate=false
					return false;
				}
				
				setTimeout(function(){
					_this.isRotate=false
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '重置超时'
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

