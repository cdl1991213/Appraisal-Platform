<template>
	<view>
		注册成功
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhanghao:"",
				password:""
			}
		},
		onLoad(option) {
			this.zhanghao = option.zhanghao
			this.password = option.password
			uniCloud.callFunction({
				name:"mycenter",
				success: (e) => {
					this.mycenter = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"register",
				data:{
					zhanghao:this.zhanghao,
					password:this.password,
					nicheng:"陈迪龙的小号",
					txurl:"/static/mycenter/touxiang/1.jpg",
					qianming:"这人很懒，没有留下个性签名"
				},
				success: (e) => {
					
				}
			}),
			setTimeout(function(){
				uni.navigateTo({
					url:"../index/index"
				})
			},3000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
