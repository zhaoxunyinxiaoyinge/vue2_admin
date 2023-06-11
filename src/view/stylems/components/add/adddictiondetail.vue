<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="60%"

    :before-close="handleClose"
  >
    <el-form :model="dictDetailItem" label-width="100px">
      <el-form-item label="字典类型">
        <el-input type="text" v-model="dictDetailItem.dict_type" disabled />
      </el-form-item>

      <el-form-item label="数据标签">
        <el-input type="text" v-model="dictDetailItem.dict_label" />
      </el-form-item>

      <el-form-item label="数据英文标签">
        <el-input type="text" v-model="dictDetailItem.dict_label_en" />
      </el-form-item>

      <el-form-item label="数据键值">
        <el-input type="text" v-model="dictDetailItem.dict_value" />
      </el-form-item>
      <!-- 
      <el-form-item label="显示排序">
        <el-input type="number"  v-model="dictDetailItem.dict_value"  />
      </el-form-item> -->

      <el-form-item label="状态">
        <el-radio :label="1" v-model="dictDetailItem.dict_label_status"
          >正常</el-radio
        >
        <el-radio :label="0" v-model="dictDetailItem.dict_label_status"
          >停用</el-radio
        >
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          type="textArea"
          v-model="dictDetailItem.dict_label_comment"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCommit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { createNewDiction, updateDictList } from "./../../api/index";
import Vue from "vue"

export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "add",
    },

    dictDetailItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  computed: {
    getDialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("close", val);
      },
    },
  },

  methods: {
    handleClose() {
      this.getDialogVisible = false;
    },

    handleAdd() {
      createNewDiction(this.dictDetailItem)
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.success("新增成功");
            this.$emit("update:list");
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        })
        .finally(() => {
          this.getDialogVisible = false;
        });
    },

    handleEdit() {
      Vue.delete(this.dictDetailItem,"createdAt");
      Vue.delete(this.dictDetailItem,"updatedAt");
      updateDictList(this.dictDetailItem)
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.success("更新成功");
            this.$emit("update:list");
          }
        })
        .catch((e) => {
          this.$Message.error(e);
        })
        .finally(() => {
          this.getDialogVisible = false;
        });
    },

    handleCommit() {
      this.type == "add" ? this.handleAdd() : this.handleEdit();
    },
  },
};
</script>

<style lang="sss" scoped></style>
