<script>
	export default {
		onLaunch: function() {
			let that = this;
			//#ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') !== -1) {
				let openid = this.$queue.getData('openid');
				if (!openid) {
					if (window.location.href.indexOf('?code=') !== -1 || window.location.href.indexOf('&code=') !== -1) {
						let code;
						if (window.location.href.indexOf('?code=') !== -1) {
							code = window.location.href.split('?code=')[1].split('&')[0];
						} else {
							code = window.location.href.split('&code=')[1].split('&')[0];
						}
						that.$Request.getT('/wx/openId/' + code).then(res => {
							if (res.code === 0) {
								that.$queue.setData("userId", res.data.user.userId);
								that.$queue.setData("token", res.data.token);
								that.$queue.setData('openid', res.data.openId);
								that.$queue.setData("nickName", res.data.user.nickName);
								that.$queue.setData("image_url", res.data.user.imgUrl);
								that.$queue.setData("invitationCode", res.data.user.invitationCode);
								that.$queue.setData("inviterCode", res.data.user.inviterCode);
								that.$queue.setData("zhifubao", res.data.user.zhifubao);
								that.$queue.setData("zhifubaoName", res.data.user.zhifubaoName);

							}
						});
					} else {
						window.location.href =
							'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
							that.$queue.getWxAppid() +
							'&redirect_uri=' +
							window.location.href.split('#')[0] +
							'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
					}
				}else{
					that.$Request.getT('/wx/openIdLogin/' + openid).then(res => {
						if (res.code === 0) {
							that.$queue.setData("userId", res.data.user.userId);
							that.$queue.setData("token", res.data.token);
							that.$queue.setData('openid', res.data.openId);
							that.$queue.setData("nickName", res.data.user.nickName);
							that.$queue.setData("image_url", res.data.user.imgUrl);
							that.$queue.setData("invitationCode", res.data.user.invitationCode);
							that.$queue.setData("inviterCode", res.data.user.inviterCode);
							that.$queue.setData("zhifubao", res.data.user.zhifubao);
							that.$queue.setData("zhifubaoName", res.data.user.zhifubaoName);
					
						}
					});
				}
			}
			//#endif
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'colorui/main.css';
</style>
