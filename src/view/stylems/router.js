import Layout from "./../../layout";
export default [
  {
    name: "stylems",
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
        name: "user",
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
        name: "roles",
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
        name: "menu",
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
        name: "dictionaries",
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
      },
      {
        name: "dictionariesDetail",
        path: "dictionaries_setting/:id",
        meta: {
          title: "字典详情",
          hidden: true,
          icon: "el-icon-s-release",
          noCancle: false
        },
        component: () => import("./dictionriesdetail.vue"),
        roles: ["admin", "edit", "view", "delete", "update"],
        order: 3
      }
    ]
  }
];
