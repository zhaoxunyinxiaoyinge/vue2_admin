import axios from "axios"
axios.interceptors.request.use(function (config) {
    let token=window.sessionStorage.getItem("token")||null;
    // 设置拦截器里的token;
    config.headers.Authorization=token;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
  export default axios;
