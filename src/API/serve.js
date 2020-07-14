import  axios from "./http.js"
// 登陆和注册验证接口
const Baseurl="http://localhost:8083/api/private/v1/";
//登陆接口
  let getLogin= async(data)=>{
    let res=await axios.post( Baseurl+"login",data);
    return res;
  }
  let getMenus=async()=>{
    return await axios.get(Baseurl+"menus");
  }
  // 获取用户列表
  let userList=async (obj)=>{
    let url="http://localhost:8083/api/private/v1/users";
    return await axios.get(url,{ params:obj});
  }
  // 修改用户的转态值
  let userState=async(id,state)=>{
    return await axios.put(`http://localhost:8083/api/private/v1/users/${id}/state/${state}`);
  }
  // 添加用户的逻辑
  let addUserState=async (obj)=>{
    let url='http://localhost:8083/api/private/v1/users';
    return await axios.post(url,{username:obj.username,password:obj.password,mobile:obj.phone,email:obj.email})
  }
  // 修改用户的数据
  let updateUser=async (id,email,mobile)=>{
      let url=`http://localhost:8083/api/private/v1/users/${id}`;
      return await axios.put(url,{email,mobile});
  }
  // 删除用户的接口
  let deleteUser=async(id)=>{
    let url=`http://localhost:8083/api/private/v1/users/${id}`;
    return await axios.delete(url);
  }
  // 获取去昂详列表
  let getRoles=async ()=>{
    let url="http://localhost:8083/api/private/v1/rights/list";
    return await  axios.get(url)
  }
  // 获取权限列表
  let getRole=async ()=>{
    let url="http://localhost:8083/api/private/v1/roles";
    return await axios.get(url);
  }
  // 这里是修改权限
  let deleteRole=async(id,rightId)=>{
    let url=`http://localhost:8083/api/private/v1/roles/${rightId}/rights/${id}`;
    return await axios.delete(url);
  }
  //这里是获取权限列表树
let getRolesTree=async ()=>{
  let url="http://localhost:8083/api/private/v1/rights/tree";
  return await  axios.get(url)
}
// 这里是更新对应id下的权限；
let updateRoles=async(roleId,rids)=>{
  let url=Baseurl+`roles/${roleId}/rights`;
  return await axios.post(url,{rids})
}
// 获取角色列表
let getRoleList=async()=>{
  let url=Baseurl+"roles";
  return axios.get(url);
}
// 对下拉框中的列表进行保存
let saveRole=async(id,rid)=>{
  let url=Baseurl+`users/${id}/role`;
  return await axios.put(url,{rid:rid});

}
//获取商品列表数
let getGoodcates=async(obj)=>{
  let url=Baseurl+`categories`;
  return await axios.get(url,{params:obj});
}
// 获取父级列表的数据，发送网络请求
let parentGoodCate=async (obj)=>{
  let url=Baseurl+"categories";
  return await axios.get(url,{params:obj})
}
// 级联选择框下的选择添加商品
let addGoodCate=async (obj)=>{
  let url=Baseurl+"categories";
  return await axios.post(url,obj);
}

export {
  getLogin,
  getMenus,
  userList,
  userState,
  addUserState,
  updateUser,
  deleteUser,
  getRoles,
  getRole,
  deleteRole,
  getRolesTree,
  updateRoles,
  getRoleList,
  saveRole,
  getGoodcates,
  parentGoodCate,
  addGoodCate
}