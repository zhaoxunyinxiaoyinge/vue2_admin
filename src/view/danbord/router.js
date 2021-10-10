import Layout from "./../../layout";

export default [
  {
    name: "danbord",
    path: "/",
    component: Layout,
    meta: {
      title: "首页",
      hidden: true,
      icon: "el-icon-monitor"
    },
    redirect: "/danbord",
    children: [
      {
        path: "/danbord",
        component: () => import("./index.vue"),
        meta: {
          title: "面板页面",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
