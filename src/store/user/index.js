import { getUserInfos } from "./../api";

let state = {
  userInfo: {},
  roles: [],
  persssion: []
};

let mutations = {
  GET_USER_INFO(state, playLoad) {
    state.userInfo = playLoad;
    state.roles.push(playLoad);
  }
};

let getters = {};

let actions = {
  // 根据用户的id获取role列表
  async getUserRoles({ commit, dispatch }, token) {
    return getUserInfos({
      token
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
