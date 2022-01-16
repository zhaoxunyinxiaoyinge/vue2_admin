import Layout from "./../../layout";
export default [
  {
    path: "/welcome",
    component: Layout,
    redirect: "/welcome/index",
    order: 8,
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "系统页面",
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
