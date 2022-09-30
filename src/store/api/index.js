import { Fetch } from "@/api/http";

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

// 根据token获取用户信息
export const getUserInfos = params => {
  return Fetch({
    url: "/egg/api/user",
    method: "get",
    params
  });
};

// 根据用户的token获取当前用户的权限列表并同时获取当前的用户的所有的菜单。
export const getRoleRoute = function(params) {
  return Fetch({
    url: "/egg/api/user_role",
    method: "get",
    params
  });
};
