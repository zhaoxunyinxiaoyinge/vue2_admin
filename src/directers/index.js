import Vue from "vue";
import store from "@/store";

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

Vue.directive("hasPromession", {
  bind(el, { value }, { context }) {
    let allPromisstion = "**:**:**";
    let promisseItem = value;
    let promission = store.state.user.promission;
    let hasPromise = promission.some(item => {
      return item === allPromisstion || item.includes(promisseItem);
    });
    if (!hasPromise) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});
