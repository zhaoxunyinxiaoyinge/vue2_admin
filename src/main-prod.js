import Vue from "vue";
import App from "./App.vue";

import { router } from "./routes";

import VueQuillEditor from "vue-quill-editor";
//这里是将路由对象的转态放入到全局转态中去。
//  import {sync} from "vuex-router-sync"
import ZkTable from "vue-table-with-tree-grid";
// import Store from "@/store/index.js"
Vue.component(ZkTable.name, ZkTable);
// 在全局下注册一个时间过域器处理
Vue.filter("fitlerTime", function(val) {
  let date = new Date(parseInt(val));
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const hh = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const mm = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const ss = date
    .getSeconds()
    .toString()
    .padStart(2, "0");
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
});

Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false;
// 这里主要是用vue-router-sync插件对router对象进行测试；
//当我们需要在vuex的action中处理路由跳转的时候,没认识vuex-router-sync的时候,我一般都是直接拿到router对象,方便获取路由对象。
// sync(Store, router)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
