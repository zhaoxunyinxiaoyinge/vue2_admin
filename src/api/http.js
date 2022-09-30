import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_BASE_API
    : process.env.VUE_APP_BASE_API;
console.log(baseURL);

axios.interceptors.request.use(
  function(config) {
    NProgress.start();
    let token = window.sessionStorage.getItem("token") || null;
    // 设置拦截器里的token;
    config.headers.Authorization = token;
    return config;
  },

  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(resp) {
    NProgress.done();
    console.log(resp, "respone");
    return Promise.resolve(resp.data);
  },
  function(error) {
    return Promise.reject(error);
  }
);

let Fetch = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

export { Fetch };
