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
export {
  getLogin,
  getMenus,
  userList,
  userState,
  addUserState,
  updateUser,
  deleteUser
}