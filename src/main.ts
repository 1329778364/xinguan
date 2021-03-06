import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

//  导入组件库
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 导入全局样式
import "./assets/css/base.css";
import "./assets/css/common.css";

// 导入ali icon字体
import "./assets/icon/iconfont.css";

// 引入全局config文件
import $conf from "./common/config/config";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$conf = $conf;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
