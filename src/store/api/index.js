import { Fetch } from "@/API/http";

export const getMenus = params => {
  return Fetch({
    url: "/menus",
    methods: "get",
    params
  });
};
