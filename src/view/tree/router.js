import Layout from "./../../layout";
export default [
  {
    name: "tree",
    path: "/tree",
    component: Layout,
    redirect: "/tree/index",
    order: 6,

    meta: {
      title: "递归树形控件",
      hidden: false,
      icon: "el-icon-s-promotion",
      noCancle: false
    },
    children: [
      {
        name: "list",
        path: "list",
        meta: {
          title: "递归树形控件",
          hidden: false,
          icon: "el-icon-s-promotion",
          noCancle: false
        },
        order: 1,
        children: [
          {
            name: "sonTree",
            component: () => import("./index.vue"),
            path: "index",
            meta: {
              title: "递归树形控件子件",
              hidden: false,
              icon: "el-icon-s-promotion",
              noCancle: false
            },
            roles: ["admin", "edit", "view", "delete", "update"]
          },
          {
            name: "treeIndex",
            component: () => import("./index.vue"),
            path: "indexs",
            meta: {
              title: "递归树形控件子件4",
              hidden: false,
              icon: "el-icon-s-promotion",
              noCancle: false
            },
            roles: ["admin", "edit", "view", "delete", "update"]
          }
        ]
      }
    ]
  }
];
