<template>
    <view>
        <view class="feedback-body feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head" style="text-align: right;">
                    <view class=""></view>
                    <view class="uni-uploader-info">{{imgList.length}}/{{count}}</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files" >
                        <block v-for="(image,index) in imgList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image mode="aspectFill" class="uni-uploader__img" :src="image"></image>
                                <view v-if="index" class="set-capital" style="background: #0A98D5;" @tap="setCapital(index)">设为主图</view>
                                <view v-else class="set-capital">主图</view>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imgList.length < count">
                            <view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>
<script type="text/javascript">
    export default {
        name: 'image-choose',
        props: {

            imgList: {
                //接收的图片列表[{src:12.jpg}]
                type: Array,
                default: function() {
                    return []
                }
            },
            quality: {
                //质量
                type: Number,
                default: 1
            },
            count: {
                //最多数量
                type: Number,
                default: 5
            },
            changes: {
                //监听变化
                type: Function,
                default: null
            }
        },

        data() {
            return {

            }
        },
        watch: {

            // imgList: {
            //     handler(val, oldval) {
            //         this.$emit("changes", val);
            //         // console.log(val)
            //     },
            //     deep: true
            // }
        },

        methods: {

            chooseImg() { //选择图片
                // console.log('选择图片')
                var count = this.count - this.imgList.length;
                uni.chooseImage({
                    count: count,
                    success: (res) => {
                        var imgs = res.tempFilePaths || [];
                        var count = imgs.length + this.imgList.length;
                        var imgList = this.imgList;
                        if (count <= this.count) {
                            imgList = this.imgList.concat(res.tempFilePaths);
                            this.$emit("changes", imgList);
                        } else {
                            var len = this.count - this.imgList.length;
                            // console.log(len)
                            for (var i = 0; i < len; i++) {
                                imgList.push(res.tempFilePaths[i])
                            }
                            this.$emit("changes", imgList);
                            uni.showToast({
                                title: '最多只能添加' + this.count + '张图片',
                                icon: 'none'
                            })

                        }


                    },
                })
            },
            close(e) {
                var imgList = this.imgList;
                imgList.splice(e, 1);
                this.$emit("changes", imgList);

            },
            setCapital(i, name) {
                var imgList=this.imgList;
                imgList[0]= imgList.splice(i,1,imgList[0])[0];
                this.$emit("changes", imgList);
            },

        }
    }
</script>
<style scoped>
    .set-capital {
        text-align: center;
        line-height: 30px;
        height: 30px;
        padding: 0 5px;
        right: 0;
        /* width: 30px; */
        background: #1AAD19;
        color: #FFFFFF;
        position: absolute;
        bottom: 0px;
        font-size: 12px;
    }

    .close-view {
        text-align: center;
        line-height: 14px;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #FF5053;
        color: #FFFFFF;
        position: absolute;
        top: -6px;
        right: -4px;
        font-size: 12px;
    }
	.feedback-body {
		background: #fff;
	}
	.feedback-uploader {
		padding: 22upx 20upx;
	}
	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-uploader-info {
		color: #B2B2B2;
	}
	.uni-uploader-body {
		margin-top: 16upx;
	}
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.uni-uploader__file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;
	}
	.uni-uploader__img {
		display: block;
		width: 210upx;
		height: 210upx;
	}
	.uni-uploader__input-box {
		position: relative;
		margin:10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}
	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
