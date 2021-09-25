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
    name: "xiwomeei"
  },

  mutations: {
    GET_FILTER_ROUTES(state, playLoad) {
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
    return true;
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = {
      ...route
    };

    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
