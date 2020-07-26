
const login=()=>import(/* webpackChunkName : "login_home_welcome" */"./login/index.vue");
const Home=()=>import( /* webpackChunkName : "login_home_welcome" */"./Home/index.vue");
const User=()=>import(/* webpackChunkName : "user_role_roles" */ "./User/index.vue");
const Welcome =()=>import( /* webpackChunkName : "login_home_welcome" */"./welcome/index.vue");
const Role=()=>import(/* webpackChunkName : "user_role_roles"*/ "./userRole/index.vue");
const categories=()=>import(/* webpackChunkName : "goodsList_goodsAdd_Cparamas"*/"./goods_cates/index.vue");
const Roles=()=>import(/* webpackChunkName : "user_role_roles"*/ "./Roles/index.vue");
const Cparamas=()=>import(/* webpackChunkName : "user_role_roles"*/ "./goods_params/index.vue");
const GoodsAdd=()=>import( /* webpackChunkName : "goodsList_goodsAdd_Cparamas"*/"./goods_list/add.vue");
const GoodsList=()=>import(/* webpackChunkName : "goodsList_goodsAdd_Cparamas"*/"./goods_list/index.vue");
const goodsOrder=()=>import(/* webpackChunkName : "goodsOder_Report"*/"./goods_order/index.vue");
const Report=()=>import(/* webpackChunkName : "goodsOder_Report"*/ "./report/index.vue");
export {
    Home,
    login,
    User,
    Welcome,
    Roles,
    Role,
    categories,
    Cparamas,
    GoodsList,
    GoodsAdd,
    goodsOrder,
    Report
}