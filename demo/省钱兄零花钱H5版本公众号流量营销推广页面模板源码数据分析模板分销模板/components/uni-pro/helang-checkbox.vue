<template>
	<view class="container" :class="column">
		<view v-for="(v,i) in list" :key="i" >
			<view 
			class="item"
			:class="{ 'active':(type=='radio' && index == i) || (type=='checkbox' && v.checked) }"
			:data-i="i"
			@tap="change"
			>{{v.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				index:-1,
				type:'checkbox',
				column:''
			};
		},
		methods: {
			/* 切换 */
			change(e){
				let i = Number(e.currentTarget.dataset.i);
				/* 单选框 */
				if(this.type=='radio'){
					this.index = i;
					this.$nextTick(()=>{
						this.$emit("change",this.get());
					})
					return;
				}
				/* 复选框 */
				if(this.list[i].checked){
					this.$set(this.list[i],"checked",false);
				}else{
					if(this.maxSize){
						let pickerSize = 0;
						this.list.forEach((item,index)=>{
							if(item.checked){
								pickerSize++;
							}
						});
						// 当已选值数量 >= 允许的最大选择值时触发
						if(pickerSize >= this.maxSize){
							this.maxFn && this.maxFn();
							return;
						}
					}
					this.$set(this.list[i],"checked",true);
				}
				this.$nextTick(()=>{
					this.$emit("change",this.get());
				});
			},
			/* 设置值 */
			set(data) {
				let [type,index] = ['checkbox',-1];
				let column = ['','col_1','col_2','col_3'];
				if(data.type == 'radio'){
					type = 'radio';
					index = data.index >= 0 ? data.index : -1;
				}
				this.column = (data.column in column) ? column[data.column] : '';
				this.type = type;
				this.index = index;
				this.list = data.list;
				
				if(data.maxSize > 0 && data.maxFn){
					this.maxSize = data.maxSize;
					this.maxFn = data.maxFn;					
				}else{
					this.maxSize = undefined;
					this.maxFn = undefined;
				}
			},
			/* 获取值 */
			get(){
				/* 单选框 */
				if(this.type=='radio'){
					if(this.index >= 0){
						return this.list[this.index];
					}else{
						return null;
					}
				}
				
				let arr=[];
				this.list.forEach((item,index)=>{
					if(item.checked == true){
						arr.push(item);
					}
				});
				return arr.length > 0 ? arr : null;
			},
			/* 全部选中 */
			checkAll(){
				if(this.type=='radio'){
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",true);
				})
			},
			/* 取消全部选中 */
			cancelAll(){
				if(this.type=='radio'){
					this.index = -1;
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",false);
				})
			},
			/* 反选全部 */
			invertAll(){
				if(this.type=='radio'){
					this.index = -1;
					return null;
				}
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"checked",item.checked ? false : true);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.container{
	display: flex;
    flex-direction: row;
    flex-wrap: wrap;
		margin:20upx;
    justify-content: space-between;
    align-items: flex-start;
    align-content: space-between;
	font-size: 28rpx;
	text-align: center;
	
	&>view{
		margin-bottom: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	
	&.col_1{
		&>view{
			width: 100%;
		}
	}
	&.col_2{
		&>view{
			width: 50%;
		}
	}
	&.col_3{
		&>view{
			width: 30%;
		}
	}
	
	.item{
		line-height: 54rpx;
		margin-bottom: 6upx;
		padding: 8rpx 20rpx;
		box-sizing: border-box;
		background-color: #444750;
		color: #fff;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-radius: 25px;
		
		&.active{
			background-color: #4650e3;
			color: #FFFFFF;
			border-radius: 25px;
			
			&::before{
				// content: '';   //是否显示选中的对号
				display:block;
				width: 20px;
				height: 20px;
				background-color:#3F64FF;
				position: absolute;
				right: -1px;
				bottom: -1px;
				z-index: 1;
				clip-path: polygon(100% 0, 0% 100%, 100% 100%);
			}
			&::after{
				// content: '';  //是否显示选中的对号
				display:block;
				width: 4px;
				height: 8px;
				border-right: #fff solid 2px;
				border-bottom: #fff solid 2px;
				transform:rotate(25deg);
				position: absolute;
				right: 2px;
				bottom: 3px;
				z-index: 2;
			}
		}
	}
}
</style>
