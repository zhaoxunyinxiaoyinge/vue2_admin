import Vue from "vue";
import App from "./app.vue";
import axios from "axios";

import moment from "moment";

// 支持国际化
import VueI18n from "vue-i18n";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ElementLocale from "element-ui/lib/locale";

import { dynamicGetEquipment } from "@/utils/equipmentType";
dynamicGetEquipment();

import store from "./store";

// 支持svg
const requireAll = requireContext => {
  let arr = requireContext.keys().map(item => {
    let reg = /\.\/([\w-]+)\.svg/gi;
    return reg.exec(item)[1];
  });

  store.state.app.iconList = arr;

  return requireContext.keys().map(requireContext);
};

const req = require.context("./assets/svgIcon", true, /\.svg$/); //自动引入
requireAll(req);

// 自动引入注册svg目录下的其他svgIcon;
import SvgIcon from "./components/svg/svg.vue";

Vue.component("svg-icon", SvgIcon);

// 支持表格的渲染
import ElDataTable from "@femessage/el-data-table";
import ElFormRenderer from "@femessage/el-form-renderer";

//这里是将路由对象的转态放入到全局转态中去。
import { sync } from "vuex-router-sync";

import ZkTable from "vue-table-with-tree-grid";

require("./directers/index");

//自动注册运行mock
import { runMock } from "./mock";
if (process.env.NODE_ENV === "development") {
  runMock();
}
Vue.component("el-form-renderer", ElFormRenderer);
Vue.component("el-data-table", ElDataTable);

// import Store from "@/store/index.js"
Vue.component("tree-table", ZkTable);

// 设置全局键盘码的事件

Vue.config.keyCodes = {
  f2: 113
};

// 在全局下注册一个时间过域器处理
Vue.filter("fitlerTime", function(val) {
  if (!val) return "暂无";
  let date = moment(val).format("YYYY-MM-DD HH:mm:ss");
  return date;
});

// 自定指令

import {
  popover,
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
  InfiniteScroll,
  ColorPicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Radio,
  Link,
  DatePicker
} from "element-ui";
import { router } from "./routes/index.js";
import "./assets/css/reset.css";
// import "./assets/element-ui-css/index.css"
// import "./../theme/index.css"
import "@/assets/scss/index.scss";
import Cookies from "js-cookie";

require("./perssion");

import { Loading } from "element-ui";
Vue.use(Loading.directive);

Vue.prototype.$Message = Message;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.use(VueQuillEditor);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(popover);
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
Vue.use(ColorPicker);
Vue.use(Radio);
Vue.use(Link);

Vue.use(VueI18n);
Vue.use(Carousel);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

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
Vue.prototype.$ELEMENT = { size: store.state.app.size }; //统一设置组件的尺寸大小

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
