import Vue from 'vue'
import App from './App.vue'
//这里是将路由对象的转态放入到全局转态中去。
//  import {sync} from "vuex-router-sync"
import ZkTable from 'vue-table-with-tree-grid'
// import Store from "@/store/index.js"
Vue.component(ZkTable.name, ZkTable)
import{Button,Form,FormItem,Input,Icon,Message,Header,Main,Container,Aside,Menu,Submenu,MenuItem,Breadcrumb, BreadcrumbItem, Card
,Col,Row, Table, TableColumn, Switch, Tooltip, Pagination, Dialog,MessageBox, Tag,Tree, Select, Option,Cascader} from "element-ui"
import router from "./routes/index.js"
import "./assets/css/reset.css"
Vue.prototype.$Message=Message;
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Container);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(MessageBox);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.prototype.$confirm=MessageBox.confirm;
Vue.config.productionTip = false;
// 这里主要是用vue-router-sync插件对router对象进行测试；
//当我们需要在vuex的action中处理路由跳转的时候,没认识vuex-router-sync的时候,我一般都是直接拿到router对象,方便获取路由对象。
// sync(Store, router)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
