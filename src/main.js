import Vue from 'vue'
import App from './App.vue'
import{Button,Form,FormItem,input,Icon,Message} from "element-ui"
import router from "./routes/index.js"
import "./assets/css/reset.css"
Vue.prototype.$Message=Message
Vue.use(Button);
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input);
Vue.use(Icon);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
