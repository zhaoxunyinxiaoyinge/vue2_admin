import store from "@/store";
import Cookies from "js-cookie";

const { body } = document;

const width = 992;

export default {
  watch: {
    $route: {
      handler(route) {
        if (this.deveice == "mobile" && this.openSidebar) {
          store.commit("app/SET_SIDEBAR", true);
          Cookies.set("openSidebar", true);
        }
      },
      deep: true
    }
  },

  beforeMount() {
    window.addEventListener("resize", this._resizeHandle);
  },

  beforeDestory() {
    window.removeEventListener("resize", this._resizeHandle);
  },

  mounted() {
    const isMobile = this.isMoible();
    if (isMobile) {
      store.commit("app/SET_SIDEBAR", true);
      store.commit("app/SET_DEVEICE", "mobile");
      Cookies.set("device", "mobile");
      Cookies.set("openSidebar", true);
    }
  },

  methods: {
    isMoible() {
      return body.getBoundingClientRect().width - 1 < width;
    },

    _resizeHandle() {
      let mobile = this.isMoible();
      if (mobile) {
        store.commit("app/SET_DEVEICE", "mobile");
        store.commit("app/SET_SIDEBAR", true);
        Cookies.set("device", "mobile");
        Cookies.set("openSidebar", true);
      } else {
        store.commit("app/SET_DEVEICE", "desktop");
        store.commit("app/SET_SIDEBAR", false);
        Cookies.set("device", "desktop");
        Cookies.set("openSidebar", false);
      }
    }
  }
};
