import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Layout from "@/layout/index.vue";

let routes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/view/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("./../components/login")
  },
  {
    path: "/404",
    component: () => import("./../components/notfound")
  },
  {
    path: "*",
    component: () => import("./../components/notfound")
  },

  {
    name: "welcomes",
    path: "/welcome",
    component: Layout,
    redirect: "/welcome/index",
    order: 8,
    meta: {
      title: "用户中心"
    },
    children: [
      {
        name: "welcomeIndex",
        path: "index",
        component: () => import("@/view/welcome/index.vue"),
        meta: {
          title: "个人中心",
          hidden: false,
          icon: "el-icon-setting",
          noCancle: false
        },
        order: 1
      }
    ]
  }
];

const createRouter = () => {
  return new Router({
    routes,
    mode: "history",
    scrollBehavior
  });
};

let router = createRouter();

// 重置路由（解决重置路由时候的问题）
const resetRouter = () => {
  let newRouter = createRouter();
  router.matcher = newRouter.matcher;
};

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (from.meta.keepAlive) {
      from.meta.savedPosition = document.body.scrollTop;
    }
    return { x: 0, y: to.meta.savedPosition || 0 };
  }
}

// 全局路由守
window.router = router;
export { router, resetRouter };
