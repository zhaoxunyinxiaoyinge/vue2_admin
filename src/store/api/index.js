import { Fetch } from "@/API/http";

export const getMenus = params => {
  return Fetch({
    url: "/menus",
    methods: "get",
    params
  });
};

export const getUserInfo = params => {
  return Fetch({
    url: "/userinfo",
    methods: "get",
    params
  });
};
