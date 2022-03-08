import Layout from "./../../layout";
export default [
  {
    name: "editext",
    path: "/editext",
    component: Layout,
    redirect: "/editext/index",
    meta: {
      title: "富文本"
    },
    order: 3,
    children: [
      {
        name: "edit",
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "富文本编辑器",
          hidden: false,
          icon: "el-icon-edit",
          noCancle: false
        },
        order: 1
      }
    ]
  }
];
