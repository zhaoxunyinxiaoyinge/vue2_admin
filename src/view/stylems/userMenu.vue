<template>
  <div>
    <Form @search="handleQuery" :config="configs"></Form>
    <div class="ml-20"><el-button type="primary" icon="el-icon-plus" @click="handleAddMenu">新增菜单</el-button></div>
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
        :fixed="item.label === '操作' ? 'right' : ''"
      >
        <template slot-scope="scope">
          <div v-if="item.label == '操作'">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd(scope.row)"
              >新增</el-button
            >
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-edit" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </div>
          <div v-else-if="item.label == '菜单名称'">
            <span>{{ scope.row[item.prop].title }}</span>
          </div>
          <div v-else-if="item.label == '状态'">
            <span>{{ scope.row[item.prop] === 1 ? "是" : "否" }}</span>
          </div>
          <div v-else-if="item.label == '创建时间'">
            <span>{{ scope.row[item.prop] | fitlerTime }}</span>
          </div>
          <div v-else-if="item.label == '更新时间'">
            <span>{{ scope.row[item.prop] | fitlerTime }}</span>
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Menu
      :tree="list"
      @update:menu="getList()"
      :dialogVisible="dilogVisble"
      :menuItem="menuItem"
      :type="type"
      @close="dilogVisble = false"
      :onlyMu="onlyMu"
    ></Menu>
  </div>
</template>
<script>
import Form from "@/view/stylems/components/search/form.vue";
import Menu from "./components/add/addMenu.vue";
import Vue from "vue";

import { mapState } from "vuex";

import { jsonToTree } from "./../../utils/comon.js";
import {
  getMenuList,
  deleteMenuItem,
  getMenuByParentId,
  getMenuDetailById,
} from "./api/index.js";
export default {
  name: "user_menu",
  components: { Form, Menu },
  created() {
    this.getList();
  },
  data() {
    return {
      list: [],

      menuItem: {},
      onlyMu:false,
      loading: true,
      dilogVisble: false,
      type: "add",
      title: "新增选项",
      total: 0,
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
          prop: "createdAt",
        },
        {
          label: "更新时间",
          prop: "updatedAt",
        },
        {
          label: "操作",
          prop: "opter",
          width: "300px",
          type: "template",
          template: "opt",
        },
      ],

      configs: [
        {
          name: "菜单名称",
          prop: "title",
        },
        {
          name: "状态",
          prop: "status",
        },
      ],
    };
  },
  computed: {
    ...mapState("perssion", ["routes"]),
  },

  methods: {
    async getList() {
      this.loading = true;
      try {
        let res = await getMenuList({ all: "all" });
        this.list = this.createMenu(res.data.data.rows);
      } catch (e) {
        this.$message.error(err);
      } finally {
        this.loading = false;
      }
    },

    getCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return "cell-center";
      }
    },

    createMenu(list) {
      return jsonToTree(list);
    },

    async handleQuery(data) {
      let params = {};
      this.loading = true;
      if (!data.title && !data.status && data.status !== 0) {
        params = { all: "all" };
      }
      let res = await getMenuList({ ...params, ...data });
      this.list = this.createMenu(res.data.data.rows);
      this.loading = false;
    },

    handleAdd(item) {
      this.type = "add";
      this.title = "新增选项";
      this.dilogVisble = true;
      this.menuItem = {};
      this.menuItem.id = item.id;
      this.menuItem.parentName = item.title;
      Vue.set(this.menuItem, "isMenu", 1);
      Vue.set(this.menuItem, "status", 1);
      Vue.set(this.menuItem, "hidden", 1);
      Vue.set(this.menuItem, "isOutLink", 0);
    },

    handleDelete(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteMenuItem(id);
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

    async handleEdit(data) {
      this.type = "edit";
      this.title = "编辑选项";
      let res = await getMenuDetailById(data.id);
      if (res.data.code == 0) {
        this.dilogVisble = true;
        this.menuItem = {};
        this.menuItem.id = res.data.data[0].id;

        if (res.data.data[0].parentId == 0) {
          this.menuItem.parentName = "layout";
        } else {

          let rsp = await getMenuByParentId(res.data.data[0].parentId);
          if (rsp.data.code == 0) {
            this.menuItem.parentName = rsp.data.data[0].title;
          }
        }
        this.menuItem={...res.data.data[0],parentName:this.menuItem.parentName}
        // Vue.set(this.menuItem, "isMenu", res.data.data[0].isMenu); //这时候编辑的是目录
        // Vue.set(this.menuItem, "status", res.data.data[0].status);
        // Vue.set(this.menuItem, "hidden", res.data.data[0].hidden);
        // Vue.set(this.menuItem, "isOutLink", res.data.data[0].isOutLink);
      }
    },

    handleAddMenu(){
      this.type = "add";
      this.title = "新增选项";
      this.dilogVisble = true;
      this.onlyMu=true;
      Vue.set(this.menuItem, "parentName", "layout");
      Vue.set(this.menuItem, "isMenu", 0);
      Vue.set(this.menuItem, "status", 1);
      Vue.set(this.menuItem, "hidden", 1);
      Vue.set(this.menuItem, "isOutLink", 0);
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .cell-center .cell {
  display: flex;
}
</style>
