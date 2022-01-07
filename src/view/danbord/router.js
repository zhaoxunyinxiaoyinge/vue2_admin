import Layout from "./../../layout";

export default [
  {
    name: "danbord",
    path: "/",
    component: Layout,
    order: 1,
    redirect: "/danbord",
    children: [
      {
        path: "/danbord",
        component: () => import("./index.vue"),
        meta: {
          title: "仪表盘",
          hidden: false,
          icon: "el-icon-s-platform"
        },
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      }
    ]
  }
];
