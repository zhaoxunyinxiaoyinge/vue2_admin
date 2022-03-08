import Layout from "./../../layout";
export default [
  {
    name: "webGl",
    path: "/webGl",
    component: Layout,
    redirect: "/webGl/index",
    order: 7,
    meta: {
      title: "webGl",
      hidden: false,
      icon: "el-icon-s-custom",
      noCancle: false
    },
    roles: ["admin", "edit", "view", "delete", "update"],
    children: [
      {
        name: "webGlIndex",
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "webGl组件",
          hidden: false,
          icon: "el-icon-data-line",
          noCancle: false
        },
        order: 1
      }
    ]
  }
];
