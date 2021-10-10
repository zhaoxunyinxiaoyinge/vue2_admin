import Vue from "vue";
import Vuex from "vuex";

import perssion from "./perssion";
import app from "./app";
Vue.use(Vuex);
let store = new Vuex.Store({
  modules: {
    perssion,
    app
  }
});
window.store = store;
export default store;
