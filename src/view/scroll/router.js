import Layout from "./../../layout";
export default [
  {
    name: "scroll",
    path: "/scroll",
    component: Layout,
    redirect: "/scroll/index",
    order: 5,
    meta: {
      title: "滚动"
    },
    children: [
      {
        name: "scrollIndex",
        path: "index",
        meta: {
          title: "无限滚动加载",
          hidden: false,
          icon: "el-icon-aim",
          noCancle: false
        },
        component: () => import("./index.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 6
      }
    ]
  }
];
