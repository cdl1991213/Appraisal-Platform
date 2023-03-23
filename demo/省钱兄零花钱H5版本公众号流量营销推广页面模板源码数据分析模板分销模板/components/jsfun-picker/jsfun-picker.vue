<template>
	<!-- 底部抽屉 -->
	<view  class="jsfun-picker" @click="showPicker(1)">
	 <slot></slot>
	 <!-- 遮罩层 -->
	 <view class="mask" @tap.stop="closePicker" catchtouchmove="true" v-if="isShow"></view>
	 <!-- 多选控件 -->
	 <view class="picker" :class="{'pickerShow':isShow}" catchtouchmove="true">
		 <!-- 标题 -->
		 <view class="title">
			<!-- <text class="ok" @tap.stop="okClick">确定</text>
		 		 <text class="cancel" @tap.stop="closePicker">取消</text> -->
				 <text class="ok" >分享</text>
				 		 		 <text class="cancel" @tap.stop="closePicker">取消</text>
		 </view>
		 <!-- 数据列表 -->
		
		 <view class="list" v-if="listArr.length>0">
		 	 <view 
			 v-for="(item,index) in listArrNew" 
			 :key="index" 
			 @tap="itemClick(item)"
			 class="item"
			 :class="{'active':item.select}"
			 >
			 <image :src="item.imgurl" style="width: 43upx;height: 50upx;vertical-align: middle;float: left;margin-right: 10upx;"></image>
			 <button class="btnfen" :open-type="shares"
			 >
			 {{item.name}}
			 </button>
			 </view>
		 </view > 
		 <view class="list" v-else>
		 	 未接收到数据
		 </view>
		 <!-- 底部说明 -->
		 <view class="mess" v-if="mess">
		 	{{mess}}
		 </view>
	 </view>
	 
	 
	</view>
</template>

<script>
	
	export default {
		name: 'jsfun-picker',
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: "原价" + this.goods.itemprice + "券后价" + this.goods.itemendprice + this.goods.goodsName,
				imageUrl: this.goods.goodsImageUrl,
				path: '/pages/categray/category?itemid=' + this.itemid + '&relation_id=' + this.relation_id
			}
		},
		props: {
			mess: String, //备注说明
			listArr:{ //数据
			  type: Array,
			  default() { return []; }
			},	
			defaultArr: { //默认选中的内容
				type: String,
				default: '' 
			},
			type: { //多选 单选  multiple single 
				type: String,
				default: 'single' 
			},
					
			// disabled: { //是否为禁用状态
			// 	type: [String, Boolean],
			// 	defalut: false
			// },
		},		
		data() {
			return {
				listArrNew:{},//记录选中的内容
				isShow:false,
				shares:'share',
				goods:'',
				url:1,
			}
		},
		watch: {
			//这里需要监听默认值的改变，重新初始化
		    defaultArr(val) {
				this.initValue();
		    }
		},
		methods: {
			showPicker(url){
				if(this.url==1){
					setTimeout(() => {
					  this.isShow = true;
							this.initValue();
							console.log('showPicker', this.isShow)
					}, 100);			
				}else{
					this.isShow = false;
				}
			},
			//关闭
			closePicker(){				
				this.isShow = false;
				//点遮罩 点取消关闭说明用户不想修改，所以这里对数据进行初始化
				this.initValue(); 
			},
			//组件数据初始化  进入时、关闭时调用初始化,第一次数据出不来
			initValue(){
				let that=this;
				//默认值
				let defaultArr = that.defaultArr.split(",");
				
				//将传进来的数组转成对象使用	
				var temp = {}
				for(let item in that.listArr){
					let defalutSelect = false;
					if(defaultArr.length>0 && defaultArr.indexOf(that.listArr[item])!=-1) defalutSelect = true;
					temp[item] = {index:item,name:that.listArr[item].dictLabel,select:defalutSelect,dictValue:that.listArr[item].dictValue,imgurl:that.listArr[item].imgurl}
				}
				that.listArrNew = temp;
			},
			//选中元素
			itemClick(item) {
				this.$emit('click',item)
				this.isShow = false;
				this.url=2;
				this.showPicker(2)
				if(item.index==1){
					this.shares='';
					
				}
				if(item.select){
					item.select = false
				}else{
					item.select = true
				}
				//如果是单选需要清除其选中的项
				if(this.type=="single"){
					for (let item1 in this.listArrNew) {
						var obj = this.listArrNew[item1];
						if( obj.name != item.name) obj.select = false;
					}
				}
			},
			//点击确定
			okClick(){
				var data = {},list = {},textStr = "",indexStr = "",dictValue='';
				for (let item in this.listArrNew) {
					var obj = this.listArrNew[item];
					if( obj.select){
						list[obj.index] = obj.name
						indexStr += (indexStr==""?"":",") + obj.index
						textStr += (textStr==""?"":",") + obj.name
						dictValue += (dictValue==""?"":",") + obj.dictValue
					}
				}
				data['list'] = list
				data['indexStr'] = indexStr
				data['textStr'] = textStr
				data['dictValue'] = dictValue
				this.$emit('click',data)
				//确定后更新默认初始值,这样再次进入默认初值就是最后选择的
				this.defaultArr = textStr;
				//关闭
				this.closePicker();
			}
		}
	}
</script>

<style lang="scss">
	uni-button:after {
		border: 1upx solid #f2f2f2;
	}
	.btnfen{
		width: 80%;font-size: 24upx; display: inline-block;padding: 0;float: right;text-align: left;margin-top: -10upx;line-height: 40upx;
	}
	.jsfun-picker {

       .mask {
		  position: fixed;
		  z-index: 1000;
		  top: 0;
		  right: 0;
		  left: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.6);
		}
        .picker{
			transition: all .3s ease;
			transform: translateY(100%);
			&.pickerShow{
			   transform:translateY(0);
			}
			
			position: fixed;
			z-index: 1000;
			right: 0;
			left: 0;
			bottom: 0;
			height: 280upx;
			background: #FFFFFF;	//整体背景
			color:#333;
					
			.title{
				display: flex;
				justify-content: space-between;
				border-bottom: solid 1px #efefef;
				padding:0upx 40upx;
				line-height: 70upx;
				font-size: 32upx;
				font-weight: bold;
				//确定按钮颜色
				.ok{
					color: #333333;
				}
				.cancel{
					color: #333333;
				}
				.leix{
					text-align: center;	
					color: #333333;
				}
			}
			
			.list{
				margin: 0 0upx 164upx;
				width: 100%;
				display: flex;
				flex-flow: wrap;
				justify-content: space-around;
				//列表元素样式
				view{
					background: pink;
					width: 14%;
				  margin:30upx 16upx 0;
					padding:30upx 20upx;
					border-radius:10upx; 
					color:red;
					font-size: 24upx;
				}
				.item{
						width: 41%;
					background-color: #f2f2f2;
					color: #999999;
					position: relative;
				
					
					&.active{
						// background-color: red;
						width: 41%;
						color: #333333;
						
						border:#999999 solid 1px;
						
						&::before{
							display:inline-block;
							width: 20px;
							height: 20px;
							border-radius: 50%;
							background-color:#2d85ff;
							position: absolute;
							right: -6px;
							float: right;
							bottom: 18px;
							z-index: 1;
						}
						&::after{
							display:block;
							width: 4px;
							height: 8px;
							border-right: #fff solid 2px;
							border-bottom: #fff solid 2px;
							transform:rotate(25deg);
							position: absolute;
							right: 1px;
							bottom: 24px;
							z-index: 2;
						}
					}
				}
				}
			.mess{
				padding:0upx 20upx;
				margin-bottom: 20upx;
				text-align:left;
			}
		} 

	}
</style>