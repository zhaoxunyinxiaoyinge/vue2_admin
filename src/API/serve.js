import  axios from "./http.js"
// 登陆和注册验证接口
const Baseurl="http://localhost:8083/api/private/v1/login";
//登陆接口
  let getLogin= async(data)=>{
    let res=await axios.post( Baseurl,data);
    return res;
  }
export {
  getLogin
}