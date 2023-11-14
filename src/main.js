import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
import "./assets/less/style.less";

// 引入element-ui相关组件
import './config/comsConfig/ele-ui/ele-ui.js';

// 引入jquery
import $ from 'jquery';

// 引入awesome 图标
import './config/comsConfig/awesome';

// 实现美化滚动条
import './config/comsConfig/vuescroll';
// 引入jsonp请求方式
import VueJsonp from 'vue-jsonp';

Vue.use(VueJsonp);

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted:function () {
  }
})
