import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Cookies from "js-cookie";
import { Message } from "element-ui";
import { router } from "./../routes/index";

// 设置拦截器里的token;
let Fetch = axios.create({
  baseURL: baseURL,
  timeout: 5000
});

const baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_BASE_API
    : process.env.VUE_APP_BASE_API;

Fetch.interceptors.request.use(
  function(config) {
    let token = Cookies.get("token") || "";
    config.headers.authorization = "Bearer " + token;
    NProgress.start();
    return config;
  },

  function(error) {
    return Promise.reject(error);
  }
);

Fetch.interceptors.response.use(
  function(resp) {
    NProgress.done();
    if (resp.data.code == -1) {
      Message.error("token失效");
      Cookies.set("token", null);
      store.commit("app/CLEAR_TOKEN");
      router.push({ path: "/login" });
    }
    return Promise.resolve(resp);
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { Fetch };
