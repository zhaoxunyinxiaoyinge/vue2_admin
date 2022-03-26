import { Fetch } from "@/api/http";

export const getUserList = params => {
  return Fetch({
    url: "/getUserList",
    methods: "get",
    params
  });
};

export const getMenuList = () => {
  return Fetch({
    url: "/menus",
    methods: "get"
  });
};
