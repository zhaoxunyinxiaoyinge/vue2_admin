import { template } from "lodash";
import { getMenus } from "./../api";

let module = require.context("./../../view", true, /router.js/);
let asyncRoute = [];

//暂时这样处理
module.keys().forEach(item => {
  asyncRoute.push(...module(item).default);
});

export default {
  namespaced: true,
  state: {
    routes: [],
    menus: []
  },

  mutations: {
    ["GET_FILTER_ROUTES"](state, playLoad) {
      state.menus = playLoad;
      let res = filterAsyncRoutes(asyncRoute, playLoad);
      state.routes = res;
    }
  },

  getters: {
    routeRole: state => state.routes
  },

  actions: {
    async getMenu({ commit, dispatch }) {
      let { data } = await getMenus();
      commit("GET_FILTER_ROUTES", data.data);
    }
  }
};

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    // 如果没有角色，也让它通过。
    return true;
  }
}

function filterAsyncRoutes(routes, roles) {
  let res = [];
  routes.forEach(route => {
    const tmp = {
      ...route
    };
    if (hasPermission(roles, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}
