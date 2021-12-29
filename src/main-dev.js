import Vue from "vue";
import App from "./App.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VueQuillEditor from "vue-quill-editor";

import axios from "axios";

// 支持国际化
import VueI18n from "vue-i18n";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ElementLocale from "element-ui/lib/locale";

import store from "./store";

// 支持表格的渲染
import ElDataTable from "@femessage/el-data-table";
import ElFormRenderer from "@femessage/el-form-renderer";

//这里是将路由对象的转态放入到全局转态中去。
import { sync } from "vuex-router-sync";
import ZkTable from "vue-table-with-tree-grid";

require("./directers/index");

//自动注册运行mock
import { runMock } from "./mock";

runMock();

Vue.component("el-form-renderer", ElFormRenderer);
Vue.component("el-data-table", ElDataTable);

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

// 自定指令

import {
  Button,
  Form,
  FormItem,
  Input,
  Icon,
  Message,
  Header,
  Main,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Row,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  CheckboxGroup,
  Checkbox,
  Upload,
  TimelineItem,
  Timeline,
  ButtonGroup,
  Image,
  Carousel,
  CarouselItem,
  Scrollbar,
  Backtop,
  InfiniteScroll
} from "element-ui";
import { router } from "./routes/index.js";
import "./assets/css/reset.css";
import Axios from "axios";

require("./perssion");

Vue.prototype.$Message = Message;
Vue.use(VueQuillEditor);
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
Vue.use(Breadcrumb);
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
Vue.use(ButtonGroup);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Alert);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Steps);
Vue.use(Step);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Image);
Vue.use(CarouselItem);
Vue.use(Scrollbar);
Vue.use(Backtop);
Vue.use(InfiniteScroll);

Vue.use(VueI18n);
Vue.use(Carousel);

// 注册所有的语言配置文件
const messages = {
  en: {
    message: "hello",
    ...enLocale
  },
  zh: {
    message: "你好",
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: window.localStorage.getItem("lang") || "zh",
  messages // set locale messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

Vue.prototype.$confirm = MessageBox.confirm;

// 在vue原型上班顶axios方法
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
// 这里主要是用vue-router-sync插件对router对象进行测试；
//当我们需要在vuex的action中处理路由跳转的时候,没认识vuex-router-sync的时候,我一般都是直接拿到router对象,方便获取路由对象。
// sync(Store, router)
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
