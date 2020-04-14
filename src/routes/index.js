import Vue from "vue";
import Router from "vue-router"
import {login,Home} from "components/index.js"
Vue.use(Router);
let routes=[
    {
     path:"/login" ,
     component:login
    },{
    path:"/home",
    component:Home
    }
]
const router=new Router({
    routes,
    mode:"history"
})
// 全局路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==="/login")return next();
    let tokens=window.sessionStorage("token");
    if(!tokens){return next("/login")};
    next();
})

export default router
