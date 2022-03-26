import Layout from "./../../layout";
export default [
  {
    name: "welcomes",
    path: "/welcome",
    component: Layout,
    redirect: "/welcome/index",
    order: 8,
    meta: {
      title: "系统"
    },
    children: [
      {
        name: "welcomeIndex",
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "个人中心",
          hidden: false,
          icon: "el-icon-setting",
          noCancle: false
        },
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      }
    ]
  }
];
