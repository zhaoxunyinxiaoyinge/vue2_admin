<template>
  <div class="json-edit">
    <h3>
      在线代码编辑器:<span style="font-size:12px"
        >(支持常用格式的代码编辑)</span
      >
    </h3>
    <textarea :rows="15" type="textarea" ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
// require('script-loader!jsonlint')
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

export default {
  props:['value'],
  data() {
    return {
      jsonEditor: false,
    };
  },

  watch:{
  value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: "application/json",
      gutters: ["CodeMirror-lint-markers"],
      theme: "rubyblue",
      lint: true,
    });

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on("change", (cm) => {
      this.$emit("changed", cm.getValue());
      this.$emit("input", cm.getValue());
    });
  },
  methods: {
      getValue() {
      return this.jsonEditor.getValue()
    }
  },
};
</script>

<style lang="scss">
.json-edit {
  margin: 20px;
}
</style>
