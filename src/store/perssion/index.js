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
      // 这里默认的时所有权限，超级管理员。
      let res = filterAsyncRoutes(asyncRoute, ["admin"]);
      state.routes = res;
    }
  },

  getters: {
    routeRole: state => state.routes
  },

  actions: {
    async getMenu({ commit, dispatch }) {
      // let { data } = await getMenus();权限路由和本地路由其实是一回事。
      commit("GET_FILTER_ROUTES", orderRoute(asyncRoute));
    }
  }
};

function hasPermission(roles, route) {
  if (route.roles && route.roles) {
    return roles.some(role => route.roles.includes(role));
  } else {
    // 如果没有角色,默认是全部通过，也让它通过。
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

function orderRoute(data) {
  let res = data.sort((cur, next) => cur.order - next.order);
  console.log(res, "order");
  return res;
}
