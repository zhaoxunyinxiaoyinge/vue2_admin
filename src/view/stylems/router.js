import Layout from "./../../layout";
export default [
  {
    path: "/stylems",
    component: Layout,
    order: 9,
    meta: {
      title: "系统设置",
      hidden: false,
      icon: "el-icon-s-promotion"
    },
    redirect: "/stylems/index",
    children: [
      {
        path: "index",
        meta: {
          title: "用户权限管理",
          hidden: false,
          icon: "el-icon-s-promotion"
        },
        component: () => import("./index.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      },
      {
        path: "user_roles",
        meta: {
          title: "用户权限分配",
          hidden: false,
          icon: "el-icon-s-promotion"
        },
        component: () => import("./userRoles.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 2
      },
      {
        path: "dictionaries_setting",
        meta: {
          title: "用户字典配置",
          hidden: false,
          icon: "el-icon-s-promotion"
        },
        component: () => import("./dictionariesSetting.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 3
      }
    ]
  }
];
