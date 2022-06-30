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
  // if (token) {
  //       await store.dispatch("app/getUserInfo", { token });
  // } else {
  //   store.commit("app/CLEAR_TOKEN");
  // }

  if (token) {
    if (to.path === "/login") {
      next({
        path: "/"
      });
      NProgress.done();
    } else {
      // let route = store.state.perssion.routes; 本地的
      if (store.state.user.roles.length > 0) {
        next();
        NProgress.done();
      } else {
        try {
          // 根据token 获取用户个人角色列表。
          store
            .dispatch("user/getUserRoles", token)
            .then(res => {
              console.log(res, "res");
              if (res.data.code == 0) {
                console.log(res, "res[0]");
                store.commit("user/GET_USER_INFO", res.data.data.rows[0]);
                return store.dispatch(
                  "perssion/getDyicnRoute",
                  res.data.data.rows[0]
                );
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                let data = res.data.data;
                console.log(res, "length");
                let treeData = jsonToTree(data);
                store.commit("perssion/GET_FILTER_ROUTES", treeData);
                let routes = store.getters["perssion/routeRole"];
                router.addRoutes(routes);
                next({
                  path: to.path,
                  replace: true
                });
                NProgress.done();
              }
            });

          // 根据角色再获取当前用户对应的路由

          // await store.dispatch("perssion/getMenu");
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
