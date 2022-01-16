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
          title: "用户管理",
          hidden: false,
          icon: "el-icon-user-solid",
          noCancle: false
        },
        component: () => import("./index.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 1
      },
      {
        path: "user_roles",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "el-icon-s-custom",
          noCancle: false
        },
        component: () => import("./userRoles.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 2
      },
      {
        path: "user_menu",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "el-icon-menu",
          noCancle: false
        },
        component: () => import("./userMenu.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 2
      },
      {
        path: "dictionaries_setting",
        meta: {
          title: "用户字典配置",
          hidden: false,
          icon: "el-icon-s-release",
          noCancle: false
        },
        component: () => import("./dictionariesSetting.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 3
      }
    ]
  }
];
