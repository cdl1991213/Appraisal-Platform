<template>
	<view>
		修改成功
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id:"",
				password:""
			}
		},
		onLoad(option) {
			this._id = option._id
			this.password = option.password
			uniCloud.callFunction({
				name:"mycenter",
				success: (e) => {
					this.mycenter = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"mycenterUpdate",
				data:{
					_id:this._id,
					password:this.password
				},
				success: (e) => {
					console.log(e)
				},
				fail: (err) => {
					console.log(err)
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
