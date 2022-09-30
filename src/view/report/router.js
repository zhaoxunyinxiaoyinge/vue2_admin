import Layout from "./../../layout";
export default [
  {
    name: "report",
    path: "/report",
    component: Layout,
    redirect: "/report/index",
    order: 4,
    meta: {
      title: "图表"
    },
    children: [
      {
        name: "reportIndex",
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
