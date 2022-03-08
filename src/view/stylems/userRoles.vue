<template>
  <div>
    <Form></Form>
    <div class="add"><el-button type="primary">新增</el-button></div>
    <el-table :data="list" border>
      <template v-for="item in tableConfig">
        <el-table-column
          v-if="item.label == '启用'"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.flag"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.label == '操作'"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
        >
        </el-table-column>
      </template>
    </el-table>
    <Add
      :title="title"
      :dialogVisible="dialogVisible"
      :menuData="routes"
      :outData="outData"
      @close="handClose"
    ></Add>
  </div>
</template>

<script>
import Form from "./components/search/form.vue";
import Add from "./components/add/index.vue";

import { mapState } from "vuex";

export default {
  components: { Form, Add },
  data() {
    return {
      dialogVisible: false,
      title: "新增角色",
      outData:{},
      list: [
        {
          id: 1,
          roles_username: "总裁",
          password: "zxy123456.com",
          createdTime: new Date().toString(),
          flag: true,
        },
      ],
      tableConfig: [
        {
          label: "角色id",
          prop: "id",
          align: "left",
        },
        {
          label: "用户角色名",
          prop: "roles_username",
          align: "left",
        },

        {
          label: "启用",
          prop: "flag",
        },

        {
          label: "创建时间",
          prop: "createdTime",
          align: "left",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
    };
  },

  computed: {
    ...mapState("perssion", ["routes"]),
  },

  methods: {
    handleEdit(val) {
      this.title="编辑用户角色";
      this.dialogVisible=true;
      this.outData=val;
    },

    handClose(){
      this.dialogVisible=false;
    }
  },
};
</script>

<style lang="scss" scoped>
$add: 20px;
.add {
  margin-left: $add;
  margin-bottom: $add;
}
</style>
