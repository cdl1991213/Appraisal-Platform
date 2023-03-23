<template>
	<view style="text-align: left">
		<view style="width: 90%;height: 80upx;background-color: #F8F8F8;display: flex;justify-content: space-between;line-height: 80upx;text-align: center;margin:20upx auto">
			<view class="zhushubox" :style="	index == 1	? ' background:#CFAB71;;width:50%;border-radius: 10px 0px 0px 10px;color:#fff'	: 'border-radius: 10px 0px 0px 10px;background:#F5F5F5;width:50%;border-radius:0px 10px 10px 0px;'	"
			 @tap="zhishu(1)">直属成员</view>
			<view class="zhushubox" :style="	index == 2	? ' background:#CFAB71;;width:50%;border-radius:  0 10px 10px 0;color:#fff'	: 'background:#F5F5F5;;width:50%;border-radius:  0 10px 10px 0; border-radius: 0px 10px 10px 0px;'	"
			 @tap="tuan(2)">非直属成员</view>
		</view>
		<view style="width: 90%;height: 80upx;background-color: #F8F8F8;display: flex;justify-content: space-between;line-height: 80upx;text-align: center;margin:20upx auto">
			<view class="zhushubox" style="border-right: 1upx solid #CCCCCC;width: 50%;">总人数：{{sumCount}}人</view>
			<view class="zhushubox">有效总人数：{{count}}人</view>
		</view>
		<view>
			<view v-for="(item, index) in list" :key="index" class="item">
				<view>
					<view style="color: #999999;font-size: 28upx;display: flex;">
						<view style="margin-top: 5upx;">{{index + 1}}</view>
						<image :src="item.imgUrl" style="width: 50upx;height: 50upx;margin-left: 40upx;border-radius: 50upx;"></image>
						<view style="margin-bottom: 8upx;margin-left: 40upx;">{{ item.nickName }}</view>
					</view>
					<view style="margin-top: 20upx;">邀请时间 {{ item.createTime }}</view>
				</view>
			</view>
			<!-- 加载更多提示 -->
			<view class="s-col is-col-24" v-if="list.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				size: 10,
				index: 1,
				show: false,
				count: 0,
				sumCount: 0,
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			};
		},
		onLoad() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getMoney(userId, this.index);
			}
		},
		onPullDownRefresh: function() {
			this.checkUser();
		},
		methods: {
			zhishu(nub) {
				this.index = nub
				this.checkUser();
			},
			tuan(nub) {
				this.index = nub
				this.checkUser();
			},
			checkUser() {
				this.page = 1;
				let userId = this.$queue.getData('userId');
				if (userId) {
					this.getMoney('', this.index);
				}
			},
			getMoney(type, isDirectly) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/user/selectUserList?page=' + this.page + '&limit=' + this.size + '&userId=' + userId +
					'&isDirectly=' + isDirectly).then(res => {
					if (res.code === 0) {
						if (this.page === 1) {
							this.list = [];
						}
						//1,待到账 2，已到账，3，失效
						this.count = res.data.count;
						this.sumCount = res.data.sumCount;
						res.data.pageUtils.list.forEach(d => {
							this.list.push(d);
						});
						if (res.data.pageUtils.list === this.size) {
							this.loadingType = 0;
						} else {
							this.loadingType = 3;
						}
					} else {
						this.loadingType = 2;
					}
					uni.hideLoading();
					if (type === 'Refresh') {
						uni.stopPullDownRefresh(); // 停止刷新
					}
				});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getMoney('', this.index);
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getMoney('Refresh', this.index);
		}
	};
</script>

<style lang="scss">
	@import '../../static/css/index.css';

	page {
		background: #ffffff;
	}

	.header-imgsuo {
		position: absolute;
		top: 28upx;
		width: 28upx;
		height: 28upx;
		margin-right: 10upx;
		align-items: center;

	}

	.zhushubox {
		width: 50%;
		text-align: center;
	}

	.search_submit {
		width: 15%;
		margin-top: 20upx;
		height: 30px;
		line-height: 30px;
		background-color: #f92d60;
		color: #FFFFFF;
		float: right;
		font-size: 28upx;
		z-index: 30;
	}

	.icon-headerI {
		font-size: 12px;
		color: #999999;
		margin-left: 50upx;
	}





	.item {
		background: white;
		padding: 32rpx;
		margin: 32rpx;
		font-size: 28rpx;
		box-shadow: 7px 9px 34px rgba(0, 0, 0, 0.1);
		border-radius: 16upx;
	}
</style>
