import { getUserInfo } from "./../api/index.js";

export default {
  namespaced: true,
  state: {
    token: "",
    username: "",
    routeTag: []
  },

  mutations: {
    SET_TOKEN(state, playLoad) {
      state.token = playLoad;
    },

    CLEAR_TOKEN(state) {
      state.token = "";
    },

    SET_USER_NAME(state, playLoad) {
      state.username = playLoad;
    },

    ADD_ROUTE_TAG(state, pathObject) {
      if (!pathObject) {
        return;
      }
      if (state.routeTag.length > 6) {
        state.routeTag.pop();
      }
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
