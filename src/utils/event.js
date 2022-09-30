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
