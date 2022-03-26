<template>
  <div>
    <Form></Form>
    <el-table :data="tableData">
      <el-table-column
        :label="item.label"
        :key="item.prop"
        v-for="item in tableConfig"
      >
        <template slot-scope="scope">
          <div v-if="item.label == '操作'">
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
          <div v-else>
            <span>{{ scope.row[item.prop]}}</span>
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

export default {
  components:{Form,Pagetion},

  data() {
    return {
      tableData: [
        {
          code: 123,
          label: "是",
          labelEn: "yes",
          dictValue: 1,
          dictOrder: 1,
          status: 1,
          remark: "测试备注",
          createTime: new Date().toString(),
        },
      ],
      tableConfig: [
        {
          label: "字典编码",
          prop: "code",
        },
        {
          label: "字典标签",
          prop: "label",
        },
        {
          label: "字典英文标签",
          prop: "labelEn",
        },
        {
          label: "字典键值",
          prop: "dictValue",
        },
        {
          label: "字典排序",
          prop: "dictOrder",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
        {
          label: "操作",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
