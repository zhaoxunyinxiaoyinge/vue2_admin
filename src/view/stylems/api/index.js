import { Fetch } from "@/api/http";

export const getUserList = (params) => {
  return Fetch({
    url: "/egg/api/user",
    method: "get",
    params,
  });
};

export const getMenuList = (params) => {
  return Fetch({
    url: "/egg/api/user_menu",
    method: "GET",
    params,
  });
};

export const deleteUserItem = (id) => {
  let url = "/egg/api/user/" + id;
  return Fetch({
    url: url,
    method: "DELETE",
    params: {},
  });
};

export const updateUserItem = (obj) => {
  let id = obj.id;
  let url = `/egg/api/user/${id}`;
  delete obj.id;
  return Fetch({
    url: url,
    method: "put",
    data: obj,
  });
};

export const createNewUser = function (data) {
  return Fetch({
    url: "/egg/api/user",
    method: "post",
    data,
  });
};

export const createNewDiction = function (data) {
  return Fetch({
    url: "/egg/api/dict_map",
    method: "post",
    data,
  });
};

export const getDictList = function (params) {
  return Fetch({
    url: "/egg/api/dict_map",
    method: "get",
    params,
  });
};

export const updateDictList = function (obj) {
  let id = obj.id;
  let url = `/egg/api/dict_map/${id}`;
  delete obj.id;
  return Fetch({
    url,
    method: "put",
    data: obj,
  });
};

export const deleteDictList = function (id) {
  let url = `/egg/api/dict_map/${id}`;
  return Fetch({
    url,
    method: "delete",
  });
};

export const getUserRoleList = function (params) {
  return Fetch({
    url: "/egg/api/user_role",
    method: "get",
    params,
  });
};

export const addUserRoleItem = function (data) {
  return Fetch({
    url: "/egg/api/user_role",
    method: "post",
    data,
  });
};

export const deleteUserRoleItem = function (id) {
  return Fetch({
    url: `/egg/api/user_role/${id}`,
    method: "delete",
  });
};

export const updateUserRoleItem = function (data) {
  let id = data.id;
  delete data.id;
  return Fetch({
    url: `/egg/api/user_role/${id}`,
    method: "put",
    data,
  });
};

export const addUserMenuItem = function (data) {
  return Fetch({
    url: "/egg/api/user_menu",
    method: "post",
    data,
  });
};

export const deleteMenuItem = function (id) {
  return Fetch({
    url: `/egg/api/user_menu/${id}`,
    method: "delete",
  });
};

export const getMenuByParentId = function (parentId) {
  return Fetch({
    url: "/egg/api/user_menu",
    method: "get",
    params: { parentId, parentIdByItem: true },
  });
};

export const getMenuDetailById = function (id) {
  return Fetch({
    url: "/egg/api/user_menu",
    method: "get",
    params: { id, detail: true },
  });
};

export const updateMenuDetail = function (data) {
  let id = data.id;
  delete data.id;
  return Fetch({
    url: `/egg/api/user_menu/${id}`,
    method: "put",
    data,
  });
};

/**
 * 根据角色id获取菜单menu_id
 * @param {*} roleId
 * @returns
 */

export const getMenuByRoleId = (roleId) => {
  return Fetch({
    url: "/egg/api/menu_role",
    method: "get",
    params: {
      role_id: roleId,
    },
  });
};
