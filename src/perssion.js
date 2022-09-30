import store from "./store";
import { router } from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Cookies from "js-cookie";
import { jsonToTree } from "./utils/comon";

// 白名单
const whiteList = ["/login", "/404"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 本地不存在，那么我从全局转态里面获取
  let token = store.getters["app/getToken"];
  if (token) {
    if (to.path === "/login") {
      next({
        path: "/welcome"
      });
      NProgress.done();
    } else {
      if (store.state.user.roles.length > 0) {
        next();
        NProgress.done();
      } else {
        try {
          store
            .dispatch("user/getUserRoles", token)
            .then(res => {
              if (res.data.code == 0 && res.data.data.rows.length > 0) {
                store.commit("user/GET_USER_INFO", res.data.data.rows[0]);
                return store.dispatch(
                  "perssion/getDyicnRoute",
                  res.data.data.rows[0]
                );
              } else {
                return res;
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                let data = res.data.data;
                let treeData = jsonToTree(data);
                store.commit("perssion/GET_FILTER_ROUTES", treeData);
                let routes = store.getters["perssion/routeRole"];
                router.addRoutes(routes);
                next({
                  path: to.path,
                  replace: true
                });
                NProgress.done();
              } else {
                Cookies.set("token", null);
                store.commit("app/CLEAR_TOKEN");
                next();
              }
            });
        } catch (err) {}
      }
    }
  } else {
    let isWhilte = whiteList.includes(to.path);
    if (isWhilte) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.path
        }
      });
      next();
    }
    NProgress.done();
  }
});
