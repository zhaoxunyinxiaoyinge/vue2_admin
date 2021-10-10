import Layout from "./../../layout";
export default [
  {
    path: "/scroll",
    meta: {
      hidden: false,
      title: "滚动组件使用",
      icon: "el-icon-s-promotion"
    },
    component: Layout,
    redirect: "/scroll/index",
    children: [
      {
        path: "index",
        meta: {
          title: "滚动",
          hidden: false,
          icon: ""
        },
        component: () => import("./index.vue")
      }
    ]
  }
];
