<template>
	<!-- 开关 -->
	<view class="ss-switch-box" @click="switchChange">
		<slot></slot>
		<view data-name="switch" class="ss-switch" :style="style_" :class="{'ss-switch__active': switchSel_, 'ss-switch__disabled' : disabled}">
			<text data-name="text" class="ss-switch__text ss-switch__text_on" :style="textStyle_">{{onText}}</text>
			<text data-name="text" class="ss-switch__text ss-switch__text_off" :style="textStyle_">{{offText}}</text>
			<text data-name="slide" class="ss-switch__slide" :style="slideStyle_"></text>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchWidth: 0,
				translateX: 0,
				newValue: 0
			}
		},
		props: {
			onVal: {//选中的值
				type: [String, Number, Boolean],
				default: true
			},
			offVal: {//未选中的值
				type: [String, Number, Boolean],
				default: false
			},
			value: {//双向绑定的值
				type: [String, Number, Boolean, Array],
				default: false
			},
			onText: {
				type: String,
				default: ''
			},
			offText: {
				type: String,
				default: ''
			},
			textColor: {//滑动球颜色
				type: String,
				default: '#fff'
			},
			textSelColor: {//滑动球颜色
				type: String,
				default: '#fff'
			},
			//可以是渐变色
			color: {
				type: String,
				default: '#dadada'
			},
			selColor: {
				type: String,
				default: '#06bd01'
			},
			disabled: {//禁止滑动
				type: [String, Boolean],
				default: false
			},
			disabledText: {//禁止滑动的提示
				type: String,
				default: ''
			},
			slideColor: {//滑动球颜色
				type: String,
				default: '#fff'
			},
			slideSelColor: {//滑动球颜色
				type: String,
				default: '#fff'
			},
			scale: {//禁止滑动
				type: [Number, String],
				default: 1
			}
		},
		computed: {
			scale_() {
				let scale = this.reservedDecimal(this.scale, 2);
				return scale > 1 ? 1 : scale;
			},
			disabled_() {
				return String(this.disabled) === 'false' ? false : true;
			},
			switchSel_() {
				let valueType = typeof this.value;
				if(valueType === 'number'){
					return this.value === this.onVal * 1;
				}else if(valueType === 'string'){
					return this.value === String(this.onVal);
				}else if(valueType === 'boolean'){
					return JSON.stringify(this.value) === JSON.stringify(this.onVal);
				}else{
					return this.value.findIndex(o => o === this.onVal) !== -1;
				}
			},
			textStyle_() {
				let style = {
					color: this.switchSel_ ? this.textSelColor : this.textColor
				};
				return style;
			},
			style_() {
				let isGradient = this.color.indexOf('linear-gradient') !== -1 ? true : false;
				let isSelGradient = this.selColor.indexOf('linear-gradient') !== -1 ? true : false;
				let color = this.switchSel_ ? this.selColor : this.color;
				let bgPro = this.switchSel_ ? (isSelGradient ? 'backgroundImage' : 'backgroundColor') : (isGradient ? 'backgroundImage' : 'backgroundColor');
				let style = {
					[bgPro]: ['-webkit-' + color, color],
					width: this.switchWidth + 'px',
					opacity: this.switchWidth ? 1 : 0,
					transform: 'scale(' + this.scale_ + ')'
				}
				return style
			},
			slideStyle_() {
				let isGradient = this.slideColor.indexOf('linear-gradient') !== -1 ? true : false;
				let isSelGradient = this.slideSelColor.indexOf('linear-gradient') !== -1 ? true : false;
				let color = this.switchSel_ ? this.slideSelColor : this.slideColor;
				let bgPro = this.switchSel_ ? (isSelGradient ? 'backgroundImage' : 'backgroundColor') : (isGradient ? 'backgroundImage' : 'backgroundColor');
				let style = {
					[bgPro]: ['-webkit-' + color, color],
					transform: 'translateX(' + (this.switchSel_ ? this.translateX : 0 ) + ')'
				}
				return style
			}
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					// 计算滑块位置,重置rpx转px的偏差问题
					const query = uni.createSelectorQuery().in(this);
					query.selectAll('.ss-switch__text, .ss-switch__slide, .ss-switch').boundingClientRect(data => {
						let switchWidth  = 0;
						let textData = data.filter(o => o.dataset.name === 'text').map(o => {
							let width = o.width
							switchWidth += width;
							return width;
						});
						let switchHeight = (data.find(o => o.dataset.name === 'switch') || {}).height || 0
						let slideData = data.find(o => o.dataset.name === 'slide') || {};
						let maxWidth = Math.max.apply(null, textData);
						let minWidth = Math.min.apply(null, textData);
						let offsetTop = uni.upx2px(20);
						let textDstEqual = (maxWidth - minWidth) < 1;
						let textDst = Math.abs(slideData.width - maxWidth) + (textDstEqual ? 1 : 2) * offsetTop
						this.switchWidth = this.reservedDecimal(switchWidth + textDst);
						console.log(switchWidth);
						console.log(this.switchWidth);
						let translateX = this.reservedDecimal(this.switchWidth - slideData.width - uni.upx2px(4));
						this.translateX = translateX + 'px';
					}).exec();
				}, 10)
			})
		},
		methods: {
			reservedDecimal(num, fixed = 2) {
				if (!num) return Number(0).toFixed(fixed);
				num = String(num);
				let splitNum = num.split('.')
				let firstNum = splitNum[0];
				let lastNum = splitNum[1] ? String(splitNum[1]) : (new Array(fixed + 1)).join('0');
				let toFixedNum = (lastNum && lastNum.length) || 0;
				toFixedNum = toFixedNum > fixed ? fixed : toFixedNum;
				//toFixed会进行四舍五入 所以我们用裁剪
				// return .toFixed(toFixedNum);
				return firstNum + (toFixedNum > 0 ? '.' : '') + lastNum.substr(0, toFixedNum)
			},
			switchChange() {
				if(this.disabled_){
					this.disabledText && uni.showToast({
						title: this.disabledText,
						icon: 'none'
					})
					return 
				}
				let res = this.switchSel_ ? this.offVal : this.onVal;
				if(typeof this.value === 'object'){
					let value = [...this.value];
					if(this.switchSel_){
						value.splice(value.findIndex(o => o === this.onVal),  1);
					}else{
						value.push(res);
					}
					res =  Array.from(new Set(value));
				}
				this.$emit('input', res);
				this.$emit('change', res);
			}
		}
	}
</script>

<style lang="scss">
	.ss-switch-box{
		display: inline-flexbox;
		vertical-align: text-bottom;
		z-index: 999;
	}
	.ss-switch{
		min-width: 86rpx;
		height: 50rpx;
		border-radius: 40rpx;
		display: inline-block;
		vertical-align: middle;
		background-color: #dadada;
		position: relative;
		// opacity: 0;
		transition: all .2s linear;
		.ss-switch__slide{
			width: 40rpx;
			height: 42rpx;
			background-color: #ffffff;
			border-radius: 100%;
			position: absolute;
			top: 5rpx;
			left: 2rpx;
			transform: translateX(0);
			transition: transform .2s linear;
		}
		.ss-switch__text{
			position: absolute;
			top: 10rpx;
			line-height: 40rpx;
			height: 40rpx;
			font-size: 26rpx;
			color: #ffffff;
			min-width: 30rpx;
			transition: opacity .2s cubic-bezier(0.4, 0, 0.2, 1);
			&.ss-switch__text_on{
				left: 20rpx;
				opacity: 0;
			}
			&.ss-switch__text_off{
				right: 20rpx;
				opacity: 1;
			}
		}
		&.ss-switch__active{
			.ss-switch__text_on{
				opacity: 1;
			}
			.ss-switch__text_off{				
				opacity: 0;
			}
		}
		&.ss-switch__disabled{
			cursor: no-drop;
			// opacity: .5!important;
		}
	}
</style>
