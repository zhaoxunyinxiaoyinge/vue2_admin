import { getMenus, getRoleRoute } from "./../api";
import Layout from "@/layout/index.vue";
import _ from "lodash";
export default {
  namespaced: true,
  state: {
    routes: [],
    menus: [
      {
        name: "welcomes",
        path: "/welcome",
        component: Layout,
        redirect: "/welcome/index",
        order: 8,
        meta: {
          title: "用户中心",
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
              noCancle: false,
            },
            order: 1,
          },
        ],
      },
    ],
  },

  mutations: {
    ["GET_FILTER_MENUS"](state, playLoad) {
      let res = filterAsyncMenus(playLoad);
      state.menus.unshift(...res);
    },

    ["GET_FILTER_ROUTES"](state, playLoad) {
      let res = filterRoutes(playLoad);
      state.routes.push(...res);
    },
  },

  getters: {
    routeRole: (state) => state.routes,
  },

  actions: {
    //从服务器获取路由菜单到本地
    async getDyicnRoute({ commit, dispatch }, playLoad) {
      return getRoleRoute({ ids: playLoad.id });
    },
  },
};

function filterAsyncMenus(menus) {
  let res = [];
  menus.forEach((menu) => {
    const tmp = {
      ...menu,
    };
    if (tmp.parentId == 0) {
      tmp.component = Layout;
    }
    if (tmp.component && tmp.parentId != 0) {
      tmp.component = loadView(_.cloneDeep(tmp.component));
    }
    if (tmp.children) {
      tmp.children = filterAsyncMenus(_.cloneDeep(tmp.children));
    }
    res.push(tmp);
  });
  return res;
}

function filterRoutes(routes) {
  let res = [];
  routes.forEach((route) => {
    const tmp = {
      name: route.name,
      meta: {
        title: route.title,
        icon: route.icon,
        hidden: route.hidden,
        operationPerssion: route.operationPerssion,
      },
      children: route.children,
      component: route.component,
      path: route.path,
    };
    if (tmp.parentId == 0) {
      tmp.component = Layout;
    }
    if (tmp.component && tmp.parentId != 0) {
      tmp.component = loadView(_.cloneDeep(tmp.component));
    }
    if (tmp.children) {
      tmp.children = filterAsyncMenus(_.cloneDeep(tmp.children));
    }
    res.push(tmp);
  });
  return res;
}

function loadView(viewPath) {
  return (resolve) => require([`@/${viewPath}`], resolve);
}
