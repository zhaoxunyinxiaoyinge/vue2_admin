import Layout from "./../../layout";
export default [
  {
    path: "/report",
    component: Layout,
    redirect: "/report/index",
    order: 4,
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "常用图表",
          hidden: false,
          icon: "el-icon-document",
          noCancle: false
        },
        roles: ["edit", "view", "delete", "admin"],
        order: 1
      }
    ]
  }
];
