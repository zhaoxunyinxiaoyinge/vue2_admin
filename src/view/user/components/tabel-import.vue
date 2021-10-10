<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-upload
        action="xlsx"
        :show-file-list="false"
        :on-change="getFiles"
        :file-list="fileList"
        :auto-upload="false"
      >
        <div class="check-file">
          <el-input class="input" type="text" disabled></el-input
          ><el-button type="primary">选择文件</el-button>
        </div>
        <div slot="tip" class="tips">
          默认只能上传1000行数据;<span class="download"
            >模板<a @click="downMoBan" href="javascript:void(0);">下载</a></span
          >
        </div>
      </el-upload>
      <el-button type="primary" style="margin-top:50px">点击上传</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getDownload } from "./../../../utils/export";
import { readBook, readData } from "./../../../utils/readData";
export default {
  props: {
    templateData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "imports",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    show() {
      this.dialogVisible = true;
    },
    downMoBan() {
      getDownload(this.templateData, undefined, "tabel模板");
    },
    getFiles(file, fileList) {
      console.log(6666);
      console.log(file, fileList, "555");
      if (file && (file.status == "ready" || file.status == "fail")) {
          console.log(readData(file.raw,readBook));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.check-file {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.input {
  width: 80%;
}

.tips {
  margin-top: 30px;
}
a {
  text-decoration: none;
}
</style>
