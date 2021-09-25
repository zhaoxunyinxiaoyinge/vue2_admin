import Layout from "./../../layout";
export default [
  {
    path: "/report",
    component: Layout,
    meta: {
      title: "报表",
      hidden: false,
      icon: ""
    },
    children: [
      {
        path: "index",
        component: () => import("./index.vue"),
        meta: {
          title: "报表页",
          hidden: false,
          icon: ""
        }
      }
    ]
  }
];
