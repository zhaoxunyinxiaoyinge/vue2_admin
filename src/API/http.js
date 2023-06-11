import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Cookies from "js-cookie";

const baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_BASE_API
    : process.env.VUE_APP_BASE_API;

let Fetch = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
Fetch.interceptors.request.use(
  function (config) {
    NProgress.start();
    let token = Cookies.get("token") || null;
    // 设置拦截器里的token;
    config.headers.Authorization = token;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

Fetch.interceptors.response.use(
  function (resp) {
    NProgress.done();
    console.log(resp, "respone");
    return Promise.resolve(resp);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { Fetch };
