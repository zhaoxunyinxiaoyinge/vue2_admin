import Layout from "./../../layout";
export default [
  {
    path: "/user",
    component: Layout,
    meta: {
      title: "用户主页",
      hidden: false,
      icon: ""
    },
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "用户主页",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
