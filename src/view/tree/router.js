import Layout from "./../../layout";
export default [
  {
    path: "/tree",
    meta: {
      hidden: false,
      title: "树形组件使用",
      icon: "el-icon-s-promotion"
    },
    component: Layout,
    redirect: "/tree/index",
    children: [
      {
        path: "index",
        meta: {
          title: "树形控件",
          hidden: false,
          icon: ""
        },
        component: () => import("./index.vue")
      }
    ]
  }
];
