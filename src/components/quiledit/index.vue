<template>
  <div><quillEditor @change="change" :content="content" :options="defaultOptions" /></div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "quildEdit",
  components: {
    quillEditor,
  },
  props: {
    content: {
      type: String,
      default: "",
    },

    editorOption: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  mounted() {
  },

  computed: {
    getOptions(){
      return Object.assign({},this.defaultOptions,this.editorOption)
    }
  },
  data() {
    return {
      defaultOptions: {
        theme: "snow",
        boundary: document.body,
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
        placeholder: "Insert text here fdfsdfsdfsdfsddddd...",
        readOnly: false,
      },
    };
  },

  methods: {
    change(val){
      this.$emit("change",val);
    }
  },
};
</script>
