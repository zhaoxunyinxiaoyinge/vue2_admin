import Layout from "./../../layout";
export default [
  {
    path: "/welcome",
    component: Layout,
    meta: {
      title: "系统主页",
      hidden: false,
      icon: ""
    },
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "系统页面",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
