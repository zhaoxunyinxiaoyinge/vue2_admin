<template>
    <div>
       <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>商品管理列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card片区域 -->
        <el-card  class="box-card">
            <el-row>
                <el-col :span="2">
                    <el-button type="primary">添加商品列表</el-button>
                </el-col>
                <!-- <zk-table 
                    :data="cartList"
                    :columns="columns"
                >

                </zk-table> -->
            </el-row>
        </el-card>
    </div>
</template>
<script>
import {getGoodcates} from "./../../API/serve"
export default {
    data:function(){
        return {
            queryInfo:{
                pagesize:5,
                pagenum:1
            },
            total:0,
            cartList:[],
            columns:[
                {
                label:'品牌名',
                prop: 'cat_name',
                width: '400px',
                }
            ]
        }
    },
    created(){
        // 获取商品分类数据
        this.getCateslist();
    },
    methods:{
       async getCateslist(){
          let res=await getGoodcates(this.queryInfo);
          const {data:list}=res;
          if(list.meta.status!=200){return  this.$Message.error("请求错误!")}
            this.total=list.data.total; 
            this.cartList=list.result;
        }
    }
}
</script>
<style lang="less" scoped>
    .box-card {
        margin-top: 20px;
    }
</style>