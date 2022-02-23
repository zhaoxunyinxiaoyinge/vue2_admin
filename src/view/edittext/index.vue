<template>
  <div class="edit-container">
    <div class="edit" id="edit"></div>
    <div class="opertion">
      <el-button type="primary">提交</el-button
      ><el-button type="default">取消</el-button>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const editor = new E("#edit");
  
      editor.txt.html("<p>用 JS 设置的内容</p>"); // 重新设置编辑器内容
      editor.config.zIndex = 10;

      editor.highlight = hljs;

      editor.config.uploadImgServer = '/api/upload'
      editor.config.uploadFileName = 'editImage'
      editor.create();

      editor.config.customAlert = (t, s) => {
        switch (t) {
          case "success":
            this.$message.success(s);
            break;
          case "info":
            this.$message.info(s);
            break;
          default:
        }
      };
    },
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style lang="scss" scoped>
  .opertion {
    margin:20px 0 0 20px;
  }
</style>
