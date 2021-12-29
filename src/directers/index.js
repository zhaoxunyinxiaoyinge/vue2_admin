/*
 * @Author: your name
 * @Date: 2021-12-05 10:13:52
 * @LastEditTime: 2021-12-05 20:12:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-管理系统\vue2_admin\src\directers\index.js
 */
import Vue from "vue";

Vue.directive("select-blur", {
  bind(el, bind, { context }) {
    let input = el.querySelector("input");
    input.addEventListener("blur", function(e) {
      context.$data.form.status = e.target.value;
    });
  },
  inserted(el) {},
  update() {}
});

Vue.directive("img-preview", {
  bind(el, bind, { context }) {
    let img = null;
    el.style.textAlign = "center";
    el.addEventListener("mouseenter", function() {
      img = new Image();
      img.style.width = "150px";
      img.src = bind.value;
      img.onload = function() {
        img.src = bind.value;
      };
      el.append(img);
    });

    el.addEventListener("mouseout", function() {
      el.removeChild(img);
    });
  }
});
