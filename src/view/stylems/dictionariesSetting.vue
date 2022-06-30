<template>
  <div>
    <el-card>
    <div class="add">
      <el-button type="primary"  @click="handleAdd" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="list" @cell-click="handleCell">
      <el-table-column
        :label="item.label"
        :key="item.id"
        v-for="item in tableConfig"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <div v-if="item.label === '操作'">
            <el-button icon="el-icon-edit"  type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete"  @click="handleDelete(scope.row.id)">删除</el-button>
          </div>

          <div v-else-if="item.label === '创建时间'">
              {{scope.row[item.prop]|fitlerTime}}
          </div>

          <div v-else-if="item.label === '更新时间'">
                {{scope.row[item.prop]|fitlerTime}}
          </div>


          <div v-else>
            <el-link  v-if="item.prop == 'dict_type'" type="primary">{{
              scope.row[item.prop]
            }}</el-link>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <Adddition
      @close="dialogVisible = false"
      :type="type"
      :title="title"
      :dialogVisible="dialogVisible"
      @update:list="getList()"
      :dictionData="dictionData"
    ></Adddition>
    <Pagetion
      :page="listQuery.page"
      :pageSize="listQuery.pageSize"
      :total="total"
    ></Pagetion>
    </el-card>
  </div>
</template>
<script>
import Adddition from "./components/add/adddictionaries.vue";
import Pagetion from "components/pagination/index";
import { getDictList,deleteDictList } from "./api/index";

import _ from "lodash"

export default {
  components: { Adddition, Pagetion },
  mounted() {
    this.getList();
  },
  data() {
    return {
      title: "新增字典",
      dictionData: {},
      dialogVisible: false,
      type: "新增",

      listQuery: {
        page: 1,
        pageSize: 10,
      },
      total: 0,

      list: [],
      tableConfig: [
        {
          label: "字典编号",
          prop: "dict_code",
        },
        { label: "字典名称", prop: "dict_name" },
        { label: "字典类型", prop: "dict_type" },
        {
          label: "状态",
          prop: "dict_status",
        },
        { label: "备注", prop: "coment" },
        { label: "创建时间", prop: "createdAt" },
        {label:"更新时间",prop:"updatedAt"},
        {
          label: "操作",
          width:250,
          fixed:"right"
        },
      ],
    };
  },

  methods: {
    async getList() {
      getDictList({ ...this.listQuery }).then((res) => {
        if (res.data.code == 0) {
          this.list = res.data.data.rows;
          this.listQuery.page = Number(res.data.page);
          this.listQuery.pageSize = Number(res.data.pageSize);
          this.total = Number(res.data.data.count);
        }
      });
    },
    handleEdit(val) {
      this.title = "编辑字典";
      this.dialogVisible = true;
      this.dictionData = _.cloneDeep(val);
      this.type = "edit";
    },

    handleAdd() {
      this.title = "新增字典";
      this.dialogVisible = true;
      this.dictionData = {};
      this.type = "add";
    },

    handleCell(row, column) {
      if (column.property == "dict_type") {
        let str = `/stylems/dictionaries_setting/${row.id}?type=${row.dict_type}`;
        this.$router.push(str);
      }
    },

    handleDelete(id){
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteDictList(id);
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.getList();
            this.$Message.success("删除成功");
          }
        })
        .catch((e) => {
          if(e=='cancel'){return }
          this.$Message.error("删除失败");
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.add {
  margin-left: 20px;
}
</style>
