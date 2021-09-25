export default {
  namespaced: true,
  state: {
    token: "",
    username: ""
  },

  mountions: {
    SET_TOKEN(state, playLoad) {
      state.token = playLoad;
    }
  },

  getters: {
    getToken: state => state
  },

  actions: {}
};
