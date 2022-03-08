<template>
  <el-dialog
    title="提示"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
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
  props: ["title", "dialogVisible"],
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

  handleClose() {
    this.getDialogVisible = false;
  },
};
</script>

<style lang="sss" scoped></style>
