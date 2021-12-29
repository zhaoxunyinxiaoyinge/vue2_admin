/*
 * @Author: your name
 * @Date: 2021-12-05 19:06:49
 * @LastEditTime: 2021-12-05 19:28:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-管理系统\vue2_admin\src\view\directer\api\index.js
 */
import { Fetch } from "@/API/http";

const getdirectdata = function(params) {
  return Fetch({
    url: "/getdirectdata",
    method: "get"
  });
};

export { getdirectdata };
