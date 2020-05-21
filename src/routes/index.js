import Vue from "vue";
import Router from "vue-router"
import {login,Home,User,Welcome,Roles,Role} from "components/index.js"
Vue.use(Router);
let routes=[
    {
     path:"/login" ,
     component:login
    },
    {
    path:"/home",
    component:Home,
    redirect:"/welcome",
    children:[
        {
         path:"/welcome",
         component: Welcome,
        },
        {
        path:"/users",
        component:User
        },
        {
          path:"/rights",
          component:Roles
        },{
           path:"/roles",
           component:Role
        }
     ]
    }
]
const router=new Router({
    routes,
    mode:"history"
})
// 全局路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==="/login") return next();
    let tokens=window.sessionStorage.getItem("token");
    if(!tokens){return next("/login")}
    next();
})
export default router
