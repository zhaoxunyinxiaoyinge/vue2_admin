<template>
  <div class="user">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="query"
              clearable
              @clear="getUserData"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserData"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="3">
          <el-button type="primary" @click="showModal">点击添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户表格 -->
      <el-table
        class="tables"
        :data="tableData"
        :border="true"
        :stripe="true"
        style="width: 100%"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="create_time" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色名" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="mobile" label="电话号码"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="changeState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
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
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
        </template>
        </el-table-column>
      </el-table>

      <!-- 分页条的修改 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 这里是弹出框 -->
    <el-dialog
      title="用户添加"
      :visible.sync="dialogVisible"
      width="60%"
      @close="changeClose"
    >
      <!-- 这里是一段表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="username">
          <el-input
            type="用户名"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 这里是修改里的弹出框 -->
    <el-dialog title="用户添加" :visible.sync="editVisible" width="60%">
      <!-- 这里是一段表单 -->
      <el-form
        :model="editForm"
        status-icon
        :rules="editrules"
        ref="editForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="id">
          <el-input v-model="editForm.userId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userList, userState, addUserState, updateUser,deleteUser} from "API/serve.js";
export default {
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      let res = await userList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
      console.log(res);
      let totals = res.data.data.total;
      this.total = totals;
      let datas = res.data.data.users;
      datas = datas.map(item => {
        item.create_time = new Date(item.create_time).toLocaleString();
        return item
      })

      this.tableData = datas;
    },
    handleSizeChange(res) {
      this.pagesize = res;
      this.getUserData();
    },
    handleCurrentChange(res) {
      console.log(res);
      this.pagenum = res;
      this.getUserData();
    },
    async changeState(state) {
      let { id, mg_state } = state;
      let res = await userState(id, mg_state);
      if (!res.data.meta.status == 200) {
        state.mg_state = !state.mg_state;
        return this.$Message({
          type: "warning",
          message: "修改失败"
        });
        // state.mg_state=!state.mg_state;
      }
      this.$Message({
        type: "success",
        message: "请求成工！"
      });
    },
    showModal() {
      this.dialogVisible = !this.dialogVisible;
    },
    changeClose() {
      this.$refs.ruleForm.resetFields();
    },
    sendData() {
      this.$refs.ruleForm.validate(async res => {
        if (res) {
          console.log(this.ruleForm);
          let datas = await addUserState(this.ruleForm);
          console.log(datas);
          if (datas.data.meta.status === 201) {
            this.$Message({
              type: "success",
              message: "成功创建!"
            });
            this.getUserData();
            this.dialogVisible = false;
          }
        }
      });
    },
    showEdit(res){
      console.log(res);
      let {id,mobile,email}=res;
      this.editVisible=true;
      this.editForm={userId:id,mobile,email}
    },
    editCommit(){
      this.$refs.editForm.validate(async(res)=>{
          if(res){
            let {userId:id,email,mobile}=this.editForm;
            let datas=await updateUser(id,email,mobile);
            if(datas.data.meta.status===200){
              this.$Message({
                type:"success",
                message:"修改成功!"
              })
              this.getUserData();
              this.editVisible=false;
            }else{
              this.$Message.Error("修改失败!");
                this.editVisible=false;
            }
          }
        }
      )
    },
   async editDelete(id){
   let res= await this.$confirm('此操作是不可逆的, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res=>res
        ).catch(err =>err);
        if(res==="confirm"){
        let datas=await deleteUser(id);
        console.log(datas)
        if(datas.data.meta.status==200){
          this.$Message({
            type:"success",
            message:"删除成功!"
          })
          this.getUserData();
        }
        }
        if(res==="cancel"){
          return this.$Message({
            type:"warning",
            message:"取消删除!"
          })
        }
    }
  },
  data() {
    //自定义效验规则:
    const checkEmail = (rule, value, cb) => {
      // 自定义正则规则
      let reg = /^[a-z_0-9]+@([a-z0-9]+)(\.[a-z]+)$/;
      if (!reg.test(value)) {
        cb(new Error("请输入争正确地邮箱"));
      } else {
        cb();
      }
    }
    const checkPhone = (rule, value, cb) => {
      //自定义正则规则
      let reg = /^1[3578]\d{9}$/;
      if (!reg.test(value)) {
        cb(new Error("请输入正确地电话号码!"));
      } else {
        cb();
      }
    };
    return {
      query: "",
      dialogVisible: false,
      pagenum: 1,
      pagesize: 2,
      flag: true,
      total: 0,
      editVisible: false,
      tableData: [],
      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "用户邮箱不能为空", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "用户电话不能为空", trigger: "blur" },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ]
      },
      editForm: {
        userId: "",
        email: "",
        mobile: 0
      },
      editrules: {
        email: [{required:true,message:"邮箱地址不能为空!",trigger:"blur"},{validate:checkEmail,trigger:"blur"}],
        mobile: [{required:true,message:"电话号码不能为空!",trigger:"blur"},{validate:checkPhone,trigger:"blur"}]
      }
    };
  }
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  .tables {
    margin-top: 30px;
  }
  .el-pagination {
    margin-top: 30px;
  }
}
.el-dialog__header {
  text-align: left;
}
</style>
