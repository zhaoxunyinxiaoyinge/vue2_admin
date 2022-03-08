<template>
  <div>
    <tree-table ref="table" :data="routes" :columns="columns" :children-prop="'children'">
      <template  slot="name" slot-scope="scope">
          <span>{{scope.row.meta&&scope.row.meta.title}}</span>
      </template>

      <template slot="status" slot-scope="scope">
          <el-tag type="success">是</el-tag>
      </template>

      <template slot="opt" slot-scope="scope">
        <el-button size="mini" type="primary">新增</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </tree-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "user_menu",

  created() {
  },
  data() {
    return {
      columns: [
        {
          label: "id",
          prop: "id",
          width: "100px",
        },
        {
          label: "菜单名称",
          prop: "meta",
          type:"template",
          template:"name"
        },

        {
          label: "路由地址",
          prop: "path",
        },

       {
          label: "状态",
          prop: "status",
          type:'template',
          template:'status'
        },
        {
          label: "操作",
          prop: "opter",
          width: "250px",
          type: "template",
          template: "opt",
        },
      ],
    };
  },
  computed: {
    ...mapState("perssion", ["routes"]),
  },
};
</script>
