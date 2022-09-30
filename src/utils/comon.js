// 处理常用递归函数(递归数据结构转换为一维数据);
function getOneLevel(oldData) {
  let arr = [];
  oldData.forEach(item => {
    if (item.children) {
      arr.push({ id: item.id, name: item.name });
      arr.push(...getOneLevel(item.children));
    } else {
      arr.push(item);
    }
  });
  return arr;
}

// 将一维数据，转换成数结构
function jsonToTree(lists) {
  let idList = {},
    treeList = [];
  for (var i = 0, len = lists.length; i < len; i++) {
    idList[lists[i]["id"]] = lists[i];
  }
  for (let j = 0, len1 = lists.length; j < len1; j++) {
    var aVal = lists[j];
    aVal.meta = {
      title: aVal.title,
      hidden: aVal.hidden == 1 ? true : false,
      icon: aVal.icon,
      noCancle: aVal.noCancle == 1 ? true : false
    };
    var aValParent = idList[aVal["parentId"] == 0 ? -1 : aVal["parentId"]];
    if (aValParent) {
      if ("children" in aValParent) {
        aValParent["children"].push(aVal);
      } else {
        aValParent["children"] = [];
        aValParent["children"].push(aVal);
      }
    } else {
      treeList.push(aVal);
    }
  }
  return sortOrder(treeList);
}

// 深拷贝函数
function DeepObj(obj) {
  let newObj;
  if (typeof obj == "object") {
    newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof key == "object") {
          DeepObj(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  } else {
    newObj = obj;
  }
  return newObj;
}

function getBase64(url, callback) {
  let img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.onload = function() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let base64 = canvas.toDataURL("image/jpeg");
    callback ? callback(base64) : null;
  };
  img.src = url;
}

export { jsonToTree, getBase64 };

function sortOrder(data) {
  let res = data.sort((cur, next) => cur.order - next.order);
  return res;
}
