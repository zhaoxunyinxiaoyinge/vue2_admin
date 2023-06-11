import Cookies from "js-cookie";
import store from "@/store/index.js";

function getCurrentEquipment() {
  let info = window.navigator.userAgent;
  let reg = /(iPhone)|(Mobile)/g;
  if (reg.test(info)) {
    Cookies.set("device", "mobile");
    Cookies.set("openSidebar", true);
    store.commit("app/SET_DEVEICE", "mobile");
    store.commit("app/SET_SIDEBAR", true);
  } else {
    Cookies.set("device", "desktop");
    Cookies.set("openSidebar", false);
    store.commit("app/SET_DEVEICE", "desktop");
    store.commit("app/SET_SIDEBAR", false);
  }
}

function dynamicGetEquipment() {
  getCurrentEquipment();
}

export { dynamicGetEquipment };
