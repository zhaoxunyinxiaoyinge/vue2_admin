import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
let routes = [
  {
    path: "/login",
    component: () => import("./../components/login")
  },

  {
    path: "/404",
    component: () => import("./../components/notFound")
  }
];
const router = new Router({
  routes,
  mode: "history"
});
// 全局路由守
window.router = router;
export { router };
