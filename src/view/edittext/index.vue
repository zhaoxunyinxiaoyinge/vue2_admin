<template>
  <div class="edit" id="edit"></div>
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
      editor.create();
      editor.config.zIndex = 500
    },
  },
   beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  }
};
</script>
