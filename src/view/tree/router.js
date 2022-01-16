import Layout from "./../../layout";
export default [
  {
    path: "/tree",
    component: Layout,
    redirect: "/tree/index",
    order: 6,
    children: [
      {
        path: "index",
        meta: {
          title: "递归树形控件",
          hidden: false,
          icon: "el-icon-s-promotion",
          noCancle: false
        },
        component: () => import("./index.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      }
    ]
  }
];
