let state = {
  userInfo: {}
};

let mutations = {
  GET_USER_INFO(state, playLoad) {
    state.userInfo = playLoad;
  }
};

let getters = {};

let actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
