import Layout from "./../../layout";

export default [
  {
    name: "welcome",
    path: "/",
    component: Layout,
    order: 1,
    redirect: "/danbord",
    meta: {
      title: "主页"
    },
    children: [
      {
        path: "/danbord",
        component: () => import("./index.vue"),
        meta: {
          title: "仪表盘",
          hidden: false,
          icon: "el-icon-s-platform",
          noCancle: false
        },
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      }
    ]
  }
];
