import Layout from "./../../layout";
export default [
  {
    path: "/report",
    component: Layout,
    meta: {
      title: "图表echarts",
      hidden: false,
      icon: "el-icon-printer"
    },
    redirect: "/report/index",
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "常用图表",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
