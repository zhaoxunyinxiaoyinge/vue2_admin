import Layout from "./../../layout";
export default [
  {
    name: "editext",
    path: "/editext",
    component: Layout,
    meta: {
      title: "文本编辑器",
      hidden: false,
      icon: "el-icon-edit-outline"
    },
    redirect: "/editext/index",
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "编辑器",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
