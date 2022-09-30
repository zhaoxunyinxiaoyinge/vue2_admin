<template>
  <div>
    <el-dialog :title="title" width="70%" :visible.sync="visible" :before-close="handleClose">
      <slot name="form" :formField="formField" :inline="false" :show="visible" :formData="getFormData"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    formData: {
      type: Object,
      default() {
        return {}
      }
    },

    formField: {
      type: Array,
      default() {
        return []
      }
    },

    title: {
      type: String,
      default: '新增'
    }
  },

  computed: {
    dialogVisible: {
      set(val) {
        this.$emit("update:visible", val);
      },
      get() {
        return this.visible;
      },
    },

    getFormData: {
      set(keys) {
        this.formData = { ...this.formData, ...keys }
      },
      get() {
        return this.formData
      }
    },

  },

  methods: {
    handleClose() {
      this.dialogVisible = false;
    },

    handleCommit(){
      this.$emit("commit",this.getFormData);
    }
  }

};
</script>

<style lang="less" scoped>
</style>
