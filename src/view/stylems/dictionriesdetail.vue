<template>
  <div>
    <el-card>
      <Form></Form>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
        >新增</el-button
      >
    </el-card>
    <el-card>
      <el-table :data="tableData">
        <el-table-column
          :label="item.label"
          :key="item.prop"
          :width="item.labelWidth"
          v-for="item in tableConfig"
        >
          <template slot-scope="scope">
            <div v-if="item.label == '操作'">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </div>

            <div v-else-if="item.label == '状态'">
              <span>{{ scope.row[item.prop] == 1 ? "正常" : "停用" }}</span>
            </div>
            <div v-else-if="item.label == '创建时间'">
              <span>{{ scope.row[item.prop] | fitlerTime }}</span>
            </div>

            <div v-else-if="item.label == '更新时间'">
              <span>{{ scope.row[item.prop] | fitlerTime }}</span>
            </div>

            <div v-else>
              <span>{{ scope.row[item.prop] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Add
      @update:list="getList()"
      :dictDetailItem="dictDetailItem"
      :title="title"
      :type="type"
      :show="show"
      @close="show = false"
    ></Add>
    <Pagetion
      :total="total"
      :page="listQuery.page"
      :pageSize="listQuery.pageSize"
    ></Pagetion>
  </div>
</template>
<script>
import Form from "@/view/stylems/components/search/form.vue";
import Add from "./components/add/adddictiondetail.vue";
import Pagetion from "components/pagination/index";

import { getDictList, deleteDictList } from "./api/index";

import _ from "lodash";

export default {
  components: { Form, Pagetion, Add },
  created() {
    const { query } = this.$route;
    const { params } = this.$route;
    this.query = { ...query, ...params };
    this.getList();
  },

  data() {
    return {
      tableData: [],
      listQuery: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
      tableConfig: [
        {
          label: "字典编码",
          prop: "dict_code",
        },
        {
          label: "字典标签",
          prop: "dict_label",
        },
        {
          label: "字典英文标签",
          prop: "dict_label_en",
        },
        {
          label: "字典键值",
          prop: "dict_value",
        },
        {
          label: "字典排序",
          prop: "dict_order",
        },
        {
          label: "状态",
          prop: "dict_label_status",
        },
        {
          label: "备注",
          prop: "dict_label_comment",
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
          labelWidth:250
        },
      ],

      type: "add",
      title: "",
      dictDetailItem: {},
      show: false,
      query: {},
    };
  },

  methods: {
    getList() {
      getDictList({ parent_id: this.query.id, ...this.listQuery })
        .then((res) => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.rows;
            this.listQuery.page = res.page;
            this.listQuery.pageSize = res.pageSize;
            this.total = res.data.count;
          }
        })
        .catch((e) => {
          this.$Message.error("获取列表失败");
        });
    },

    handleAdd() {
      this.title = "新增字典详情";
      this.type = "add";
      this.dictDetailItem = {};
      this.dictDetailItem.dict_type = this.query.type;
      this.dictDetailItem.parent_id = this.query.id;
      this.show = true;
    },

    handleEdit(val) {
      this.title = "修改字典详情";
      this.type = "edit";
      this.dictDetailItem = _.cloneDeep(val);
      this.show = true;
    },

    handleDelete(id) {
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
          this.$Message.error("删除失败");
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
