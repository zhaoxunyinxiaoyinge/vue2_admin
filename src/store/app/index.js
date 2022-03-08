import { getUserInfo } from "./../api/index.js";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    token: "",
    username: "",
    routeTag: [],

    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    device: Cookies.get("device") ? Cookies.get("device") : "desktop", //默认是桌面端的
    openSidebar:
      Cookies.get("openSidebar") && JSON.parse(Cookies.get("openSidebar"))
        ? Cookies.get("openSidebar")
        : false, //默认是关闭的
    defaultOpen: ["/"],

    btncolor: "#1989fa"
  },

  mutations: {
    SET_DEVEICE(state, playLoad) {
      state.device = playLoad;
    },

    SET_SIDEBAR(state, playLoad) {
      state.openSidebar = playLoad;
    },

    SET_TOKEN(state, playLoad) {
      state.token = playLoad;
    },

    CLEAR_TOKEN(state) {
      state.token = "";
    },

    SET_DEFAULT_OPEN(state, playLoad) {
      state.defaultOpen = playLoad;
    },

    SET_USER_NAME(state, playLoad) {
      state.username = playLoad;
    },

    ADD_ROUTE_TAG(state, pathObject) {
      if (!pathObject) {
        return;
      }
      // if (state.routeTag.length > 6) {
      //   state.routeTag.pop();
      // }
      let index = state.routeTag.findIndex(
        item => item.path == pathObject.path
      );
      if (index == -1) {
        state.routeTag.push(pathObject);
      }
    },

    DELETE_ROUTE_TAG(state, path) {
      let index = state.routeTag.findIndex(item => item.path == path);
      state.routeTag.splice(index, 1);
    },

    SET_THEME_COLOR(state, playLoad) {
      state.btncolor = playLoad;
    }
  },

  getters: {
    getToken: state => state.token,
    getRouteTag: state => state.routeTag
  },

  actions: {
    async getUserInfo({ commit, dispatch }, parmas) {
      let data = await getUserInfo(parmas);
      if (data.data.status == 200) {
        commit("SET_TOKEN", data.data.data.token);
        commit("SET_USER_NAME", data.data.data.username);
        return Promise.resolve(true);
      } else {
        return Promise.reject(false);
      }
    }
  }
};
