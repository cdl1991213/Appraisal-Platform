<template>
	<view>
		发布成功
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				content:"",
				length:Number
			}
		},
		onLoad(option) {
			this.title = option.title
			this.content = option.content
			this.length = option.length
			//通过URL传值，只会传递字符串
			console.log(Number.isInteger(this.length))
			uniCloud.callFunction({
				name:"sendNews",
				data:{
					title:this.title,
					content:this.content,
					source:"好鉴APP",
					comment_count:0,
					image_url:"/static/discuss/8.jpg",
					article_type:this.length
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
