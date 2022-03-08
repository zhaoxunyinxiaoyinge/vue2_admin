import Layout from "./../../layout";
export default [
  {
    name: "json",
    path: "/jsonEdit",
    component: Layout,
    redirect: "/jsonEdit/index",
    order: 4,
    meta: {
      title: "json"
    },
    children: [
      {
        name: "jsonIndex",
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "JSON格式化",
          hidden: false,
          icon: "el-icon-document",
          noCancle: false
        },
        roles: ["edit", "view", "delete", "admin"],
        order: 1
      }
    ]
  }
];
