import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Layout from "./../layout";
let routes = [
  {
    path: "/login",
    component: () => import("./../components/login")
  },

  {
    path: "/",
    redirect: "/danbord",
    meta: {
      title: "主页",
      hidden: true
    },
    component: Layout,
    children: [
      {
        path: "danbord",
        meta: {
          title: "主页",
          hidden: false
        },
        component: () => import("./../view/danbord/index.vue")
      }
    ]
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
