import Vue from "vue";
import Vuex from "vuex";

import perssion from "./perssion";
Vue.use(Vuex);
let store = new Vuex.Store({
  modules: {
    perssion
  }
});
window.store = store;
export default store;
