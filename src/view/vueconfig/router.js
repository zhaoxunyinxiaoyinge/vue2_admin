import Layout from "./../../layout";
export default [
  {
    name: "vuecofig",
    path: "/vue",
    component: Layout,
    order: 7,
    meta: {
      title: "vue"
    },
    children: [
      {
        name: "config",
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
