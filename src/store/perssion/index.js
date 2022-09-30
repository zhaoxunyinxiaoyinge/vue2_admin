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
    ]
  },

  mutations: {
    ["GET_FILTER_ROUTES"](state, playLoad) {
      // state.menus = playLoad;
      state.menus.unshift(...playLoad);
      // 这里默认的时所有权限，超级管理员。
      let res = filterAsyncRoutes(playLoad, ["admin"]);
      state.routes = res;
    }
  },

  getters: {
    routeRole: state => state.routes
  },

  actions: {
    // 从服务器获取路由菜单到本地
    async getDyicnRoute({ commit, dispatch }, playLoad) {
      return getRoleRoute({ ids: playLoad.role_name });
    }
    // 本地对路由的权限过誉
    // async getMenu({ commit, dispatch }) {
    //   // let { data } = await getMenus();权限路由和本地路由其实是一回事。
    //   commit("GET_FILTER_ROUTES", orderRoute(asyncRoute));
    // },
  }
};

// function hasPermission(roles, route) {
//   if (route.roles && route.roles) {
//     return roles.some((role) => route.roles.includes(role));
//   } else {
//     // 如果没有角色,默认是全部通过，也让它通过。
//     return true;
//   }
// }

function filterAsyncRoutes(routes) {
  let res = [];
  routes.forEach(route => {
    const tmp = {
      ...route
    };
    if (tmp.parentId == 0) {
      tmp.component = Layout;
    }
    if (tmp.component && tmp.parentId != 0) {
      tmp.component = loadView(_.cloneDeep(tmp.component));
    }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(_.cloneDeep(tmp.children));
    }
    res.push(tmp);
  });
  return res;
}

function loadView(viewPath) {
  return resolve => require([`@/${viewPath}`], resolve);
}
