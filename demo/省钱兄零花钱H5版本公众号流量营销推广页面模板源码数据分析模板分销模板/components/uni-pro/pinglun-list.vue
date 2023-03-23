<template>

	<view style="background-color: #fff;border-bottom: 1upx solid #CCCCCC;padding: 20upx 0;z-index: 999;margin-bottom: 20upx;">
		<!--头部标题介绍-->
		<view style="display: flex">
			<view>
				<image class="headImage" :src="images"></image>
			</view>
			<view class="box-name">
				<view class="name" style="width: 75%">
					<text>{{name}}</text><br>
				</view>
				<text class="total">{{ showTime | formatDate }}</text>
			</view>
		</view>
		<!--短文-->
		<view style="text-align: left;display: flex;margin-left: 10upx;">
			<view>
				<view @click="copyHref()" class="content" v-html="content">
				</view>
			</view>
		</view>

		<!--图片-->
		<view style="text-align: center;display: flex;margin-top: 8px;margin-left: 10upx;">
			<view>
				<view v-for="(image,index) in imagecont" :key="index" class="box-float">
					<image @click="openGoods()" class="image" :src="image.img" @longpress="toSave(image)" lazy-load='true'
					 fade-show='true'></image>
				</view>
			</view>
		</view>
		<view>颜色分类：{{color}} {{gongyi}} 尺码：{{size}}</view>
	</view>


</template>

<script>
	export default {
		name: "pinglun-list",
		props: [
			'name',
			"to",
			"content",
			'imagecont',
			'color',
			'gongyi',
			'size',
			"images",
			"copy_content",
			"showTime",
		],
		methods: {
			openGoods() {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + this.to + "&relation_id=" + relation_id,
					})
				} else {
					uni.navigateTo({
						url: "/pages/detail/goodsinfo?itemid=" + this.to,
					})
				}
			},
			/**
			 * 复制链接
			 */
			copyHref() {
				let relation_id = this.$queue.getData("relation_id");
				if (relation_id) {
					uni.setClipboardData({
						data: this.copy_content,
						success: (r => {
							this.$queue.showToast("素材复制成功")
						}),
					})
				} else {
					uni.setClipboardData({
						data: this.copy_content,
						success: (r => {
							this.$queue.showToast("素材复制成功")
						}),
					})
				}
			},
			/**
			 * 保存图片
			 * @param url
			 */
			toSave(url) {
				//#ifndef H5
				uni.getImageInfo({
					src: url,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 3000
								});
							}
						});
					}
				});

				//#endif
			},
		},
		filters: {
			formatDate: function(value) {
				value = parseInt(value + "000");
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d 
			}
		}
	}
</script>

<style scoped>
	.headImage {
		margin-right: 8px;
		height: 35px;
		width: 35px;
		border-radius: 50%;
	}
.headImages{
	margin-right: 8px;
	height: 39upx;
	width: 39upx;
	border-radius: 50%;
}
	.name {
		font-size: 15px;
		color: #333333;
	}
	
	.header-wu{
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 24upx;
		color:#666666;
		margin-bottom: 20upx;
	}
	.total {
		font-size: 14px;
		color: #999999;
		width: 30%;

		/* padding-left: 16px; */
	}
.fan {
	width: 14upx;
	height: 20upx;
	/* float: right; */
	margin-left: 10px;
	margin-top:40upx;
	
}
	.box-name {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.box-click {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		font-size: 15px;
	}

	.box-float {
		float: left;
		padding-top: 5px;
		padding-left: 5px;
	}

	.image {
		height: 180upx;
		width: 206upx;
		margin-right: 12upx;
	}
</style>
