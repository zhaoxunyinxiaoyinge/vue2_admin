import Layout from "./../../layout";
export default [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    order: 7,
    meta: {
      title: "表格组件",
      hidden: false,
      icon: "el-icon-s-custom"
    },
    roles: ["admin", "edit", "view", "delete", "update"],
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "tabel组件",
          hidden: false,
          icon: "el-icon-data-line"
        },
        order: 1
      },
      {
        path: "roles",
        component: () => import("./roles.vue"),
        meta: {
          title: "用户角色",
          hidden: false,
          icon: "el-icon-s-custom"
        },
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 2
      }
    ]
  }
];
