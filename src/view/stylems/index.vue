<template>
  <div>
    <Form></Form>
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
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Add
      :title="title"
      @close="dialogVisible = false"
      :dialogVisible="dialogVisible"
      :userData="userData"
    ></Add>

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

import Add from "./components/usermanger/index.vue";
import Form from "./components/search/form.vue";

export default {
  name: "user",

  components: { Pageion, Add, Form },

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
      dialogVisible: false,
      title: "新增用户管理",
      userData: {},
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
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },

    handleQuery() {
      this.getList();
    },

    handleEdit(val) {
      this.title = "新增用户";
      this.dialogVisible = true;
      this.userData = val;
    },
  },
};
</script>
