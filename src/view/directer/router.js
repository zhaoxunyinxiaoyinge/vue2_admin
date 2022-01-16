import Layout from "./../../layout";
export default [
  {
    path: "/directer",
    component: Layout,
    redirect: "/directer/index",
    order: 2,
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "自定义指令",
          hidden: false,
          icon: "el-icon-menu",
          noCancle: true
        },
        roles: ["admin", "edit"],
        order: 1
      }
    ]
  }
];
