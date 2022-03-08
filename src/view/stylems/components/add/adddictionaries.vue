<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form label-width="100px">
      <el-form-item label="字典名称">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="字典类型">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getDialogVisible = false"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["dialogVisible", "title", "dictionData"],
  data() {
    return {};
  },
  computed: {
    getDialogVisible: {
      get() {
        return this.dialogVisible;
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
  },
};
</script>

<style lang="scss" scoped></style>
