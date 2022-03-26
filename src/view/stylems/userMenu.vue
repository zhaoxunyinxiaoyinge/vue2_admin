<template>
  <div>
    <Form></Form>
    <el-table
      :data="list"
      style="width: 100%"
      :cell-class-name="getCellClass"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div v-if="item.label == '操作'">
            <el-button type="primary">新增</el-button>
            <el-button type="danger">删除</el-button>
          </div>
          <div v-if="item.label == '菜单名称'">
            <span>{{ scope.row[item.prop].title }}</span>
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Pagetion></Pagetion>
  </div>
</template>
<script>
import Form from "@/view/stylems/components/search/form.vue";
import Pagetion from "components/pagination/index";
import { mapState } from "vuex";

import {getMenuList} from "./api/index.js"
export default {
  name: "user_menu",
  components: { Form, Pagetion },
  created() {
    this.getList();
  },
  data() {
    return {
      list:[],
      columns: [
        {
          label: "id",
          prop: "id",
          width: "200",
        },
        {
          label: "菜单名称",
          prop: "meta",
          type: "template",
          template: "name",
        },

        {
          label: "组件路径",
          prop: "component",
        },

        {
          label: "权限认证",
          prop: "pression",
        },

        {
          label: "状态",
          prop: "status",
          type: "template",
          template: "status",
        },

        {
          label: "图标名称",
          prop: "icon",
        },
        {
          label: "创建时间",
          prop: "createTime",
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

  methods:{
   async getList(){
     try{
      let res=await getMenuList();
      this.list=res.data.data;
     }catch(e){
       this.$message.error(err);
     }
    },

    getCellClass({row, column, rowIndex, columnIndex}){
         if(columnIndex==0){
           return "cell-center"
         }
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/ .cell-center .cell {
    display: flex;
  }

</style>
