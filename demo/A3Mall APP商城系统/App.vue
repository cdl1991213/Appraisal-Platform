<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			
		},
		onShow: function() {
			let users = this.$storage.getJson("users");
			if(users){
				uni.setTabBarBadge({ index: 2, text: users.shop_count.toString() });
			}else{
				uni.removeTabBarBadge({ index: 2 })
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '~@/style.css';
	body { background-color: #f8f8f8; }
	.clear:after { content:" "; font-size:0; display:block; height:0; clear:both; visibility:hidden; }
</style>
