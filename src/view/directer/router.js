import Layout from "./../../layout";
export default [
  {
    path: "/directer",
    component: Layout,
    meta: {
      title: "指令使用",
      hidden: false,
      icon: "el-icon-document-add"
    },
    redirect: "/directer/index",
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "自定义指令",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
