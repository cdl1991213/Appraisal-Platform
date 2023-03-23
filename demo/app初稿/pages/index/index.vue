 <template>
	<view class="content">
		
		<!-- 首页 -->
		<view :style="{'display':show_index == 0 ?'block':'none'}">
			<tab-game 
			:swiperList="swiperList" 
			:categoryList="categoryList"
			:productList="productList"></tab-game>
		</view>
		<!-- 分类 -->
		<view :style="{'display':show_index == 1 ?'flex':'none'}">
			<tab-discovery 
			:categoryList2="categoryList2"></tab-discovery>
		</view>
		<!-- 鉴定 -->
		<view :style="{'display':show_index == 2? 'block':'none'}">
			<tab-data
			:show_index="show_index"
			@show_index="getShow_index"></tab-data>
		</view>
		<!-- 讨论区 -->
		<view :style="{'display':show_index == 3 ?'block':'none'}">
			<tab-information
			:newsList="newsList"
			></tab-information>
		</view>
		<!-- 我 -->
		<view :style="{'display':show_index == 4 ? 'flex':'none'}">
			<tab-mycenter v-if="isLogin == false"
			:mycenter="mycenter"
			@isLogin="getIsLogin"
			@loginId="getLoginId"></tab-mycenter>
			<tab-myself v-if="isLogin == true"
			:mycenter="mycenter"
			@isLogin="getIsLogin"
			:loginId="loginId"></tab-myself>
		</view>
		
		
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
		<!-- 底部导航栏 -->
		<view class="tabBar" >
			<!-- 导航的中间圆圈 --> 
			<view class="border_box" >
				<view class="tabBar_miden_border"></view>
			</view>
			
			<!-- 遍历出导航栏的四个标签 -->
			<view class="tabBar_list" >
				<!-- 遍历 -->
				<view v-for="(item) in tab_nav_list" :key="item.id" 
					:class="{'tabBar_item':item.id!=2,'tabBar_item2':item.id==2}" 
					@click="cut_showindex(item.id)">
					<!-- 切换导航栏标签亮灭 -->
					<image v-if="show_index == item.id"  :src="`../../static/tabBar/${item.id+1}${item.id+1}.png`"></image>
					<image v-else :src="`../../static/tabBar/${item.id+1}.png`"></image>
					<!-- 导航栏标签底部文字 -->
					<view :class="{'tabBar_name':true,'nav_active':show_index == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import tabGame from '@/components/tabBar/home.vue'
	import tabDiscovery from '@/components/tabBar/category.vue'
	import tabInformation from '@/components/tabBar/cart.vue'
	import tabData from '@/components/tabBar/authentic.vue'
	import tabMycenter from '@/components/tabBar/mycenter.vue'
	import tabMyself from '@/components/tabBar/usermyself.vue'
	export default {
		components: {
			tabGame,//首页    0
			tabDiscovery,//分类    1
			tabInformation,//购物车   2
			tabData,//鉴定   3
			tabMycenter,//我  4
			tabMyself//登录后的我 5
		},
		data() {
			return {
				show_index:0,//控制显示那个组件
				tab_nav_list :[{'id':0,'name':'首页'},{'id':1,'name':'分类'},{'id':2,'name':'鉴定'},{'id':3,'name':'讨论区'},{'id':4,'name':'我'}],//菜单列表
				// 轮播图片
				swiperList: [],
				categoryList:[],
				categoryList2:[],
				productList:[],
				mycenter:[],
				isLogin:false,
				loginId:0,
				newsList:[]
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:"home-swiper",
				success: (e) => {
					this.swiperList = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"home-categoryList",
				success: (e) => {
					this.categoryList = e.result.data
					console.log(e)
				}
			}),
			uniCloud.callFunction({
				name:"home-productList",
				success: (e) => {
					this.productList = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"category-categoryList",
				success: (e) => {
					this.categoryList2 = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"mycenter",
				success: (e) => {
					this.mycenter = e.result.data
				}
			}),
			uniCloud.callFunction({
				name:"newsList",
				success: (e) => {
					this.newsList = e.result.data
				}
			})
		},
		methods: {
			getIsLogin(e){
				this.isLogin = e;
			},
			getLoginId(e){
				this.loginId = e;
				console.log(this.loginId)
			},
			getShow_index(e){
				this.show_index = e;
			},
			// 切换组件
			cut_showindex(type){
				this.show_index = type
			},
			//刷新方法发
			onPullDownRefresh(){
				uni.showLoading({
					title:'刷新页面'
				})
				setTimeout(function(){
					uni.stopPullDownRefresh()
					uni.hideLoading()
				},2000)
			}
			
		}
	}
</script>

<style lang="scss">
	.tabBar{ width:100%;height: 98rpx;background: #fff;border-top:1px solid #E5E5E5;position: fixed;bottom:0px;left:0px;right:0px;display: flex;align-items: center;justify-content: center;
		.tabBar_list{ width:86%;display: flex;justify-content: space-between;
			image{ width:48rpx;height: 48rpx;margin-bottom:2rpx}
			.tabBar_item{ width:68rpx;display: flex;justify-content: center;align-items: center;flex-direction: column;font-size: 20rpx;color: #969BA3;}
			.tabBar_item2{
				width:68rpx;height:100%;display: flex;justify-content: center;align-items: center;flex-direction: column;font-size: 20rpx;color: #969BA3;margin-top:-20rpx;position: relative;z-index: 101;
				image{ width:68rpx;height: 68rpx;}
			}
		 } 
	}
	
	.border_box{
		// pointer-events: none; 事件穿透解决z-index层级问题
		width:100%;height: 100rpx;display: flex;justify-content: center;align-items: center;position: fixed;left:0px;bottom:50rpx;z-index: 100;pointer-events: none;
		.tabBar_miden_border{   width:100rpx;height:50rpx;border-top:2rpx solid #E5E5E5;border-radius:50rpx 50rpx 0 0; /* 左上、右上、右下、左下 */background: #fff;}
	}
	
	.nav_active{color: #007AFF;}
</style>
