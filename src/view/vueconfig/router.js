import Layout from "./../../layout";
export default [
  {
    path: "/vue",
    component: Layout,
    order: 7,
    children: [
      {
        path: "/vue/index",
        component: () => import("./index.vue"),
        meta: {
          title: "vue配置学习",
          hidden: false,
          icon: "el-icon-s-custom",
          noCancle: false
        },
        roles: ["admin", "edit", "view", "delete", "update"]
      }
    ]
  }
];
