import Layout from "./../../layout";
export default [
  {
    name: "users",
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    order: 7,
    meta: {
      title: "表格组件",
      hidden: false,
      icon: "el-icon-s-custom",
      noCancle: false
    },
    roles: ["admin", "edit", "view", "delete", "update"],
    children: [
      {
        name: "tabel",
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "tabel组件",
          hidden: false,
          icon: "el-icon-data-line",
          noCancle: false
        },
        order: 1
      }
    ]
  }
];
