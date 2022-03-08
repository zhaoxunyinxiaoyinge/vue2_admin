<template>
  <div>
    <Form></Form>
    <div class="add">
      <el-button type="primary" >新增</el-button>
    </div>
    <el-table :data="list"  @cell-click="handleCell">
      <el-table-column
        :label="item.label"
        :key="item.id"
        v-for="item in tableConfig"
        :prop="item.prop"
      >
        <template slot-scope="scope">
          <div v-if="item.label === '操作'">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger">删除</el-button>
          </div>
          <div v-else>
            <el-link v-if="item.prop=='dictionType'" type="primary">{{ scope.row[item.prop] }}</el-link>
            <span  v-else>{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <Adddition
      @close="dialogVisible = false"
      :type="type"
      :title="title"
      :dialogVisible="dialogVisible"
      :dictionData="dictionData"
    ></Adddition>
  </div>
</template>
<script>
import Adddition from "./components/add/adddictionaries.vue";
import Form from "./components/search/form.vue";

export default {
  components: { Adddition, Form },
  data() {
    return {
      title: "新增字典",
      dictionData: {},
      dialogVisible: false,
      type: "新增",

      list: [
        {
          num: 123,
          dictionName: "自动测试",
          dictionType: "auto_test",
          status: 1,
          remark: "这是一个测试",
          createTime: new Date().toLocaleDateString(),
        },
      ],
      tableConfig: [
        {
          label: "字典编号",
          prop: "num",
        },
        { label: "字典名称", prop: "dictionName" },
        { label: "字典类型", prop: "dictionType",},
        {
          label: "状态",
          prop: "status",
        },
        { label: "备注", prop: "remark" },
        { label: "创建时间", prop: "createTime" },
        {
          label: "操作",
        },
      ],
    };
  },

  methods: {
    handleEdit(val) {
      this.title = "编辑字典";
      this.dialogVisible = true;
      this.dictionData = val;
      this.type = "edit";
    },
    handleAdd() {
      this.title = "新增字典";
      this.dialogVisible = true;
      this.dictionData = {};
      this.type = "add";
    },

    handleCell(row, column){
      if(column.property=='dictionType'){
      let str="/stylems/dictionaries_setting/"+row.num;
      this.$router.push(str);
      }

    }
  },
};
</script>

<style lang="scss" scoped>
.add {
  margin-left: 20px;
}
</style>
