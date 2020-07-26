import axios from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
axios.interceptors.request.use(function (config) {
  NProgress.start();
    let token=window.sessionStorage.getItem("token")||null;
    // 设置拦截器里的token;
    config.headers.Authorization=token;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
  export default axios;
