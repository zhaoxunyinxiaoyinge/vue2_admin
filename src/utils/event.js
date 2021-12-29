/*
 * @Author: your name
 * @Date: 2021-12-05 17:19:10
 * @LastEditTime: 2021-12-05 18:25:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-管理系统\vue2_admin\src\utils\event.js
 */
// 事件防抖(只在规定地事件触发)
const throttle = function(func, time) {
  let timer = null;
  let self = this;
  return function() {
    let arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, arg);
    }, time);
  };
};

// 事件截流
const jlThroottle = function(func, time) {
  let nowTime = new Date();
  let timer = null;
  return function() {
    let context = this;
    let arg = arguments;
    let curTme = new Date();
    if (curTme - nowTime > time) {
      func.apply(context, arguments);
      nowTime = curTme;
    }
  };
};
