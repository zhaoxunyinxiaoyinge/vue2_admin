<template>
  <div>
    <el-card>
      <Form :formField="formField" :inline="true" labelWidth="100px" @query="hanldeQuery"></Form>
      <div class="add">
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list">
        <template v-for="item in tableConfig">
          <el-table-column v-if="item.label == '启用'" :key="item.id" :label="item.label" :prop="item.prop"
            :align="item.align">
            <template slot-scope="{ row }">
              <span>{{ row.role_status == 1 ? "启用" : "失效" }}</span>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.label == '操作'" :key="item.id" :label="item.label" :prop="item.prop"
            :align="item.align" :fixed="'right'" width="200">
            <template slot-scope="scope">
              <div style="display:flex;justifly-content:center">
                <el-button icon="el-icon-edit" type="primary" :disabled="userInfo.role_name=='admin'"  v-isAdmin="userInfo.role_name
"   @click="handleEdit(scope.row)">编辑</el-button>
                <el-button icon="el-icon-delete" type="danger" :disabled="userInfo.role_name=='admin'"  v-isAdmin="userInfo.role_name"   @click="handleDelete(scope.row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>

          <el-table-column v-else :key="item.id" :label="item.label" :prop="item.prop" :align="item.align"
            :formatter="formatter">
          </el-table-column>
        </template>
      </el-table>

      <Pagetion :page="listQuery.page" :pageSize="listQuery.pageSize" :total="total"></Pagetion>
    </el-card>
    <Add :title="title" :type="type" @update:list="getList()" :dialogVisible="dialogVisible" :menuData="treeMenu"
      :outData="outData" @close="handClose"></Add>
  </div>
</template>

<script>
import Form from "@/components/formFeild/index.vue";

import Add from "./components/add/index.vue";
import Pagetion from "components/pagination/index";
import {
  getMenuList,
  getUserRoleList,
  deleteUserRoleItem,
  getMenuByRoleId
} from "./api/index.js";
import { jsonToTree } from "./../../utils/comon.js";
import { mapState } from "vuex";
import moment from "moment";

import _ from "lodash";

export default {
  components: { Form, Add, Pagetion },
  created() {
    this.getList();
    this.getMenuList();
    this.getMenus();
  },
  data() {
    return {
      dialogVisible: false,
      title: "新增角色",
      type: "add",
      outData: {
        menu_id:[]
      },
      listQuery: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
      list: [],

      menu: [],

      treeMenu: [],

      tableConfig: [
        {
          label: "角色id",
          prop: "id",
          align: "left",
        },
        {
          label: "用户角色名",
          prop: "role_name",
          align: "left",
        },

        {
          label: "启用",
          prop: "role_status",
        },

        {
          label: "创建时间",
          prop: "createdAt",
          align: "left",
        },
        {
          label: "更新时间",
          prop: "updatedAt",
          align: "left",
        },
        {
          label: "操作",
          align: "center",
        },
      ],

      formField: [
        {
          type: "input",
          label: "用户角色名称",
          field: "role_name",
        },
        {
          type: "select",
          label: "是否启用",
          field: "role_status",
          options: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 0,
            },
          ],
          option_label: 'label',
          option_value: "value"
        },

        {
          type: "btn",
          label: "",
        }
      ],
    };
  },

  computed: {
    ...mapState("perssion", ["routes"]),
    ...mapState("user", ["userInfo"]),
  },

  methods: {
    async getList() {
      getUserRoleList({ all: "all", ...this.listQuery })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.rows;
            this.total = res.data.data.count;
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        });
    },

    async getMenuList() {
      try {
        let res = await getMenuList({ all: "all", page: 1, pageSize: 100000 });
        this.menu = this.createMenu(res.data.data.rows);
      } catch (e) {
        this.$Message.error(e);
      }
    },

    async getMenuByRoleIds(role_id){
      let res=  await getMenuByRoleId(role_id);
      return res.data;
    },

    async getMenus() {
      try {
        let res = await getMenuList({ isMenu: 1, page: 1, pageSize: 100000 });
        this.treeMenu = this.createMenu(res.data.data);
      } catch (err) {
        this.$Message.error(err);
      }
    },

    createMenu(list) {
      return jsonToTree(list);
    },

    handleAdd() {
      this.title = "新增角色";
      this.type = "add";
      this.dialogVisible = true;
      this.outData = {};
      this.outData.menu_id = [];
    },

   async handleEdit(val) {
     let menus= await  this.getMenuByRoleIds(val.id);
      this.title = "编辑用户角色";
      this.type = "edit";
      this.dialogVisible = true;
      this.outData = _.cloneDeep(val);
      this.outData.menu_id = [];
      menus.forEach(menuRole => {
      this.outData.menu_id.push(menuRole.menu_id);
     });

    },

    handClose() {
      this.dialogVisible = false;
    },

    formatter(row, column) {
      if (column.label == "创建时间" || column.label == "更新时间") {
        return (
          moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") ||
          moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss")
        );
      } else {
        return row[column.property];
      }
    },

    handleDelete(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteUserRoleItem(id);
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

    hanldeQuery(val) {
      console.log(val, "val")
      this.listQuery.page = 1;
      getUserRoleList({ all: "all", ...this.listQuery, ...val })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.rows;
            this.listQuery.page = res.page;
            this.listQuery.pageSize = res.pageSize;
            this.total = res.data.data.count;
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        });
    },
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
