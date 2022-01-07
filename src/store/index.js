import Vue from "vue";
import Vuex from "vuex";

import perssion from "./perssion";
import app from "./app";
import user from "./user";

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    perssion,
    app,
    user
  }
});

window.store = store;
export default store;
