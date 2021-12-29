import store from "./store";
import { router } from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 白名单
const whiteList = ["/login", "/404"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // 本地不存在，那么我从全局转态里面获取
  let token = store.getters["app/getToken"];
  if (!token) {
    token = window.sessionStorage.getItem("token");
    let rightToken = await store.dispatch("app/getUserInfo", { token });

    if (!rightToken) {
      store.commit("app/CLEAR_TOKEN");
    }
  }

  if (token) {
    if (to.path === "/login") {
      next({
        path: "/"
      });
      NProgress.done();
    } else {
      let route = store.state.perssion.routes;
      if (route.length > 0) {
        next();
        NProgress.done();
      } else {
        try {
          await store.dispatch("perssion/getMenu");
          let roles = store.getters["perssion/routeRole"];

          router.addRoutes(roles);
          next({
            path: to.path,
            replace: true
          });
          NProgress.done();
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
