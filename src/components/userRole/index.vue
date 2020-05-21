<template>
    <div>
      
        <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户角色管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理列表</el-breadcrumb-item>
        </el-breadcrumb>    
        <el-card class="card">
              <el-button type="primary">点击添加用户管理</el-button>
              <el-table 
              border
            :data="rolesList"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                   <el-row :class="['borders',index==0?'borderTop':'']" :key="item.id" v-for="(item,index) in scope.row.children">  
                    <el-col :span=5>
                        <el-row class="first" >
                           <el-col><el-tag closable  @close="close(item.id,scope.row)">{{item.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>        
                        </el-row>
                    </el-col>
                    <el-col :span=19>
                    <el-row :class="['borderTop',index==0?'borderN':'']"  :key="items.id" v-for="(items,index) in item.children">  
                           <el-col :span=5><el-tag closable type="success"  @close="close(items.id,scope.row)">{{items.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col> 
                           <el-col :span=19 >
                                <el-tag closable type="warning"  @close="close(itemss.id,scope.row)" :key="itemss.id" v-for="itemss in items.children">{{itemss.authName}}</el-tag>             
                           </el-col>
                    </el-row>
                     </el-col>
                   </el-row>      
                </template>
            </el-table-column>       
            <el-table-column
                type="index"
                lable="#"
                width="180">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="roleDesc"
                label="角色描述"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作">
             <template  slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEdit(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="editDelete(scope.row.id)"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="操作角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" @click="showRoles(scope.row)">分配权限</el-button>
            </el-tooltip>         
            </template>
            </el-table-column>
    </el-table>
        <el-dialog
        title="用户权限列表树"
        :visible.sync="dialogVisible"
        width="30%"
        >
       <el-tree :data="rolesTree" ref='roleTree' show-checkbox :props="defaultProps" :default-checked-keys="defaultArray"  node-key="id"  default-expand-all ></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"   @click="updateRole" >确 定</el-button>
        </span>
        </el-dialog>
        </el-card>
    </div>
</template>
<script>
import { getRole,deleteRole,getRolesTree,updateRoles} from "API/serve.js"
export default {
    data(){
        return {
         rolesList:[],
         dialogVisible:false ,
         rolesTree:[],
         roleId:"",
         defaultProps:{
             children:"children",
             label:"authName"
         },
         defaultArray:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
       async getList(){
            let res= await getRole();
            console.log(res)
            if(res.data.meta.status==200){
                this.rolesList=res.data.data;
            }
        },
        async close(id,rightId){
        //这里是弹出一个box消息框
            let res= await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err);
            console.log(res)
            if(res==="confirm"){
            // 这里主要是做用户请求的操作
            let datas=await deleteRole(id,rightId.id);
            console.log(rightId)
            console.log(datas)
            if(datas.data.meta.status==200){
                this.$Message({
                    type:"success",
                    message:"删除成功!"
                })
                rightId.children=datas.data.data;
            }else{
                this.$Message({
                    type:"warning",
                    message:"删除失败!"
                })
            }
        }else{
            this.$Message({
                type:"info",
                message:"用户取消了操作" 
            })
         }
        },
    async showRoles(showRole){
        this.roleId=showRole.id;
       let res= await getRolesTree();
       this.defaultArray=[];
         this.rolesTree=res.data.data;
        // 这里是在显示前，tree的节点要被选中的。
        this.defaultArrayChecked(showRole,this.defaultArray);
        this.dialogVisible=true;
        },
        //这里是对循环的属性进行遍历。
        defaultArrayChecked(node,arr){
         if(!node.children) {arr.push(node.id)}else{
         node.children.forEach(item => {
             this.defaultArrayChecked(item,arr);
         });  
         }
    
        },
        // 这里是修改在树形的权限列表的修改
        async updateRole(){
            // 这里调用树形控件的api,获取当前被选择中的权限和没选中的权限
            let rolesList=[];
            rolesList=[
                ...this.$refs.roleTree.getCheckedKeys(),
                ...this.$refs.roleTree.getHalfCheckedKeys()
            ]
            let rids=rolesList.join(",");
           let res=await updateRoles(this.roleId,rids);
           if(res.data.meta.status==200){
            this.$Message({
                type:"success",
                message:"权限修改成功!"
            })
            this.getList();
           }else{
               this.$$Message({
                   type:"info",
                   message:"权限修改失败!"
               })
           }
        
        this.dialogVisible=false;
        }
    }
}
</script>
<style  scoped lang="less">
        .card{
            margin-top: 20px;
            text-align:left;
            .el-button {
                margin: 10px 10px;
            }
            .el-tag {
                margin:5px 5px;
            }
            .borders {
                border:1px solid #eee;
                border-left:0;
                border-right:0;
                border-top:0;
                display: flex;
                align-items: center;
            }
            .borderTop {
                border-top:1px solid #eee;
            }
            .borderN {
                border-top:0;
            }
            .first {
                text-align: center
            }
        }

</style>