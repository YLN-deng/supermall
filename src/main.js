import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 解决移动端300延迟
import FlasClick from "fastclick";
FlasClick.attach(document.body);

// 图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1,
//   error: errorimage,
  loading: require('./assets/img/common/loading.gif'),
  attempt: 1,
});

// 吐司安装
import toast from "./components/common/toast/index";
Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
