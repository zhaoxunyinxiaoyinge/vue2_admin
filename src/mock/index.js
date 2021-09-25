const Mock = require("mockjs");
Mock.setup({
  timeout: 400
});

//用户登录接口
const login = () => {
  return Mock.mock(/\/login\?.*/, "get", function(options) {
    let username = getSearchParams(options.url).get("username");
    let passworld = getSearchParams(options.url).get("password");
    return {
      message: "ok",
      status: 200,
      data: {
        token: "zxy123456.com",
        username,
        passworld
      }
    };
  });
};

//  获取菜单权限
const getMenus = () => {
  return Mock.mock(/\/menus\/?.*/, "get", function(options) {
    return {
      message: "ok",
      status: 200,
      data: [
        {
          id: "1-1",
          path: "welcome",
          roles: ["admin"]
        },
        {
          id: "1-2",
          path: "user",
          roles: ["admin"]
        },

        {
          id: "1-3",
          path: "/reports",
          component: ["admin"]
        }
      ]
    };
  });
};

export const runMock = function() {
  login();
  getMenus();
};

function getSearchParams(val) {
  let index = val.indexOf("?");
  let params = val.slice(index + 1);
  return new URLSearchParams(params);
}
