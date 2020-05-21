<template>
    <div >
        <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理列表</el-breadcrumb-item>
        </el-breadcrumb> 
        <!-- 卡片 -->
        <el-card class="card">
              <el-table 
              border
            :data="rolesList"
            style="width: 100%">
            <el-table-column
                type="index"
                lable="#"
                width="180">
            </el-table-column>

            <el-table-column
                prop="authName"
                label="权限名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="180">
            </el-table-column>
            <el-table-column
                prop="level"
                label="权限登级">
             <template  slot-scope="scope">
                  <el-tag v-if="scope.row.level==0">等级一</el-tag>  
                  <el-tag v-if="scope.row.level==1" type="success">等级二</el-tag>  
                  <el-tag v-if="scope.row.level==2" type="primary">等级三</el-tag>  
            </template>
            </el-table-column>
    </el-table>


        </el-card>
    </div>
</template>
<script>
import {getRoles} from "API/serve.js"
export default {
    created(){
        this.getList();
    },
    data(){
        return {
            rolesList:[]
        }
    }
    ,
    methods:{
        async getList(){
            let res=await getRoles();
            console.log(res.data.data)
            if(res.data.meta.status===200){
               this.rolesList=res.data.data;
            }
        }
    }
}
</script>
<style scoped>
    .card {
        margin-top: 30px;
        overflow: auto;
        height:790px;

    }
</style>