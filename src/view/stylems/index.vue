<template>
  <div>
    <el-card>
        <div>
          <Form :formField="formFiles" :inline="true" labelWidth="80px" @query="hanldeQuery"></Form>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button> 
    </el-card>
    <el-card>
    <el-table ref="table"  :data="userList" v-loading="loading" stripe>
      <el-table-column
        draggable="true"
        label="用户名称"
        prop="user_name"
        align="left"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="角色名称"
        prop="role_name"
        align="left"
        :formatter="formatter"
      ></el-table-column>

      <el-table-column draggable="true" label="性别" prop="sex" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex == 0 ? "男" : "女" }}
        </template>
      </el-table-column>

      <el-table-column
        draggable="true"
        label="创建时间"
        prop="createdAt"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.createdAt | fitlerTime }}
        </template>
      </el-table-column>

      <el-table-column
        draggable="true"
        label="更新时间"
        prop="updatedAt"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.updatedAt | fitlerTime }}
        </template>
      </el-table-column>

      <el-table-column
        draggable="true"
        label="操作"
        fixed="right"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button icon="el-icon-refresh-right" type="warning" @click="resetpassword(scope.row.id)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Add
      :title="title"
      @close="dialogVisible = false"
      :type="type"
      :roleList="roles_list"
      :dialogVisible="dialogVisible"
      @update:list="getList"
      :userData="userData"
    ></Add>

    <Pageion
      :page="queryParams.page"
      :pageSize="queryParams.limit"
      :total="total"
    ></Pageion>   
     </el-card>
  </div>
</template>
<script>
import Pageion from "@/components/pagination";
import Form from "@/components/formFeild/index.vue";

import {
  getUserList,
  deleteUserItem,
  updateUserItem,
  getUserRoleList,
} from "./api/index";

import Add from "./components/usermanger/index.vue";
import _ from "lodash";

export default {
  name: "user",
  components: { Pageion, Add, Form },
  data() {
    return {
      queryParams: {
        page: 1,
        limit: 10,
      },
      roles_list: [],
      loading: false,
      total: 0,
      userList: [],
      dialogVisible: false,
      title: "新增用户管理",
      type: "add",
      userData: {},

      formFiles:[
        {
          type: "input",
          field: "user_name",
          label: "名称",
        },
        {
          type:'select',
          field:'role_name',
          label:'角色名称',
          options:[],
          option_label:'role_name',
          option_value:'id'
        },
        {
          type:'daterange',
          field:'limitTime',
          label:'日期'
        },
        {
          type:"btn",
          label:''
        }
      ]
    };
  },
  created() {
    this.getList();
    this.getRoleList();
  },

  mounted() {},

  methods: {
    formatter(row,column){
       let arr=row.role_name.split(",");
       let str=[];
       arr.forEach(item=>{
       let name= this.roles_list.find(istem=>istem.id==item)?.role_name;
         str.push(name)
       })
       return str.join(",");
    },

    getRoleList() {
      getUserRoleList({ all: "all", page: 1, pageSize: 1000 }).then((res) => {
        if (res.data.code == 0) {
          this.roles_list = res.data.data.rows;
          this.formFiles.forEach(item=>{
            if(item.field=='role_name'){
              item.options=this.roles_list;
            }
          })
        }
      });
    },

    getList() {
      this.loading = true;
      getUserList({
        checked: "all",
        limit: this.queryParams.pageSize,
        page: this.queryParams.page,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.userList = res.data.data.rows;
            this.total = Number(res.data.data.count);
            this.queryParams.page = Number(res.data.offset);
            this.queryParams.pageSize = Number(res.data.limit);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    hanldeQuery(val) {
      this.queryParams.page=1;
      let data={...this.queryParams,...val};
      this.loading=true;
      getUserList(data).then(res=>{
          if(res.data.code==0){
            this.userList = res.data.data.rows;
            this.total = Number(res.data.data.count);
            this.queryParams.page = Number(res.data.offset);
            this.queryParams.pageSize = Number(res.data.limit);
          }
      }).finally(()=>{
        this.loading=false
      })
    },

    handleEdit(val) {
      this.title = "修改用户";
      this.dialogVisible = true;
      this.type = "edit";
      this.userData = _.cloneDeep(val);
      let newval = this.userData.role_name;
      this.userData.role_name =
        newval == "" ? [] : this.userData.role_name.split(",");
    },

    handleAdd() {
      this.title = "新增用户";
      this.dialogVisible = true;
      this.type = "add";
      this.userData = {role_name:[]};
    },

    handleDelete(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteUserItem(id);
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.getList();
            this.$Message.success("删除成功");
          }
        })
        .catch((e) => {
          this.$Message.error("删除失败");
        });
    },

    resetpassword(id) {
      let _this = this;
      this.$prompt("请输入修改的手机号码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true,
        inputType: "string",
        inputValidator: function(value) {
          let reg = /^\d{11}$/;
          if (reg.test(value)) {
            return true;
          } else {
            return false;
          }
        },
        inputErrorMessage: "手机号格式不正确",
      })
        .then(({ value }) => {
          return updateUserItem({ id, tel_phone: value });
        })
        .then((res) => {
          if (res.data.code == 1) {
            _this.$Message.success("修改成功");
          } else {
            _this.$Message.error("修改失败");
          }
        })
        .catch((e) => {
          if (e === "cancel") {
            return;
          }
          _this.$Message({
            type: "error",
            message: e,
          });
        });
    },
  },
};
</script>
