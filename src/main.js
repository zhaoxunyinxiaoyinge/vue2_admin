import Vue from 'vue'
import App from './App.vue'
import{Button,Form,FormItem,Input,Icon,Message,Header,Main,Container,Aside,Menu,Submenu,MenuItem,Breadcrumb, BreadcrumbItem, Card
,Col,Row, Table, TableColumn, Switch, Tooltip, Pagination, Dialog,MessageBox, Tag,Tree, Select, Option} from "element-ui"
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
Vue.prototype.$confirm=MessageBox.confirm;
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
