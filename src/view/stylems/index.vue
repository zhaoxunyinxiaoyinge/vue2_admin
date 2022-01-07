<template>
  <div>
    <el-form :v-model="queryParams" :inline="true" label-width="150px">
      <el-form-item>
        <span slot="label">用户角色</span>
        <el-input v-model="queryParams.roles"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="queryParams.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="table" :data="userList">
      <el-table-column
        draggable="true"
        label="用户名称"
        prop="roles"
        align="left"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="用户id"
        prop="id"
        align="center"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="用户昵称"
        prop="username"
        align="center"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="部门"
        prop="workName"
        align="center"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="手机号"
        prop="phone"
        align="center"
      ></el-table-column>

      <el-table-column
        draggable="true"
        label="创建时间"
        prop="createTime"
        align="center"
      ></el-table-column>

      <el-table-column draggable="true" label="操作">
        <template>
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pageion
      :page="queryParams.page"
      :pageSize="queryParams.pageSize"
      :total="total"
    ></Pageion>
  </div>
</template>
<script>
import Pageion from "@/components/pagination";
import { getUserList } from "./api/index";

export default {
  name: "user",

  components: { Pageion },

  data() {
    return {
      queryParams: {
        roles: "",
        username: "",
        page: 1,
        pageSize: 10,
      },
      total: 0,
      userList: [],
    };
  },
  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    getList() {
      getUserList()
        .then((res) => {
          if (res.status == 200) {
            this.userList = res.data.data.data;
            this.total = res.data.data.total;
            this.queryParams.page = res.data.data.page;
            this.queryParams.pageSize = res.data.data.pageSize;
            this.$nextTick(() => {
              let tr = document.querySelectorAll("table tr");
              let table=document.querySelector(table);
              tr.forEach((item,index)=>{
                item.setAttribute('draggable',true);
                item.setAttribute('id',this.userList[index].id);
                item.ondragstart=this.dropStart;
                item.ondrop=this.drop;
                item.ondragover=this.dropOver
              })  
     
            });
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    dropStart(event){
      event.dataTransfer.setData("text", event.target.id)
    },

    drop(event){
      event.preventDefault();
     let data= event.dataTransfer.getData("text");
      let table=document.querySelector("table");
      table.appendChild(document.getElementById(data));

    },
    dropOver(event){
      event.preventDefault()
    },


    handleQuery() {
      this.getList();
    },

  },
};
</script>
