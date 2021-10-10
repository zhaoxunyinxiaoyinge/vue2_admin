import Layout from "./../../layout";
export default [
  {
    path: "/user",
    component: Layout,
    meta: {
      title: "常用组件",
      hidden: false,
      icon: "el-icon-document-add"
    },
    redirect: "/user/index",
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "tabel组件",
          hidden: false,
          icon: ""
        }
      },
      {
        path: "roles",
        component: () => import("./roles.vue"),
        meta: {
          title: "用户角色",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
