import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'

import queue from './common/queue'
import loadMore from './components/uni-pro/load-more'
import orangeGoodsList from './components/uni-pro/orange-goods-list'
import orangeHandpick from './components/uni-pro/orange-handpick'
import orangeNews from './components/uni-pro/orange-news.vue'
import orangeGoodsCargHome from './components/uni-pro/orange-goods-card-home'
import wInput from '@/components/watch-login/watch-input.vue' //input
import wButton from '@/components/watch-login/watch-button.vue' //button
import minBadge from '@/components/min-badge/min-badge' //右上角角标
import pinglunList from '@/components/uni-pro/pinglun-list.vue' //右上角角标
import empty from './components/empty'
Vue.config.productionTip = false;
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
Vue.prototype.$Sysconf = HttpRequest.config;

// Vue.prototype.uma = uma || {};// 此处用来挂载入uma到组件实例上，方便组件内使用this.uma
import 'js_sdk/ican-H5Api/ican-H5Api'
import wx from 'js_sdk/weixin'
Vue.prototype.$wx = wx;
App.mpType = 'app';
Vue.component('load-more', loadMore);
Vue.component('empty', empty);
Vue.component('orange-goods-card-home', orangeGoodsCargHome);
Vue.component('min-badge', minBadge);
Vue.component('pinglun-list', pinglunList);
Vue.component('wInput', wInput);
Vue.component('wButton', wButton);
Vue.component('orange-handpick', orangeHandpick);
Vue.component('orange-news', orangeNews);
Vue.component('orange-goods-list', orangeGoodsList);



const app = new Vue({
	...App
});
app.$mount();
