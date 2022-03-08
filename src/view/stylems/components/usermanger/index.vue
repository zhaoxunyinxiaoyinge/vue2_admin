<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="用户名称" label-width="120px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="120px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="添加角色" label-width="120px"> 
        <el-select v-model="roles_list" multiline>
          <el-options></el-options>
        </el-select>
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
  props: ["title", "dialogVisible", "userData"],

  data() {
    return {
      roles_list:[]
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
    handleClose(){
      this.getDialogVisible=false;
    }
  },
};
</script>
