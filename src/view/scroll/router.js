import Layout from "./../../layout";
export default [
  {
    path: "/scroll",
    component: Layout,
    redirect: "/scroll/index",
    order: 5,
    children: [
      {
        path: "index",
        meta: {
          title: "无限滚动加载",
          hidden: false,
          icon: "el-icon-aim",
          noCancle: false
        },
        component: () => import("./index.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 6
      }
    ]
  }
];
