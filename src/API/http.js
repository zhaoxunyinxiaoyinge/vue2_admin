import axios from "axios"
axios.interceptors.request.use(function (config) {
  console.log(56666)
  console.log(config);
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
