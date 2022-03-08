<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="角色名称" label-width="120px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="是否启用" label-width="120px">
        <el-switch></el-switch>
      </el-form-item>
      <el-form-item label="添加角色" label-width="120px">
        <el-tree
          :data="menuData"
          show-checkbox
          node-key="name"
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>
    </el-form>
     <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["title", "dialogVisible", "menuData", "outData"],

  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
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
<style scoped></style>
