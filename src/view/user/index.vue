<template>
  <div class="tabel">
    <div class="export-button">
      <el-button type="primary" size="mini" @click="download(data,undefined,undefined,'xlsx')"
        >导出</el-button
      >
      <el-button type="primary" size="mini" @click="importData">导入</el-button>
    </div>

    <el-data-table
      v-bind="tabelConfig"
      :dataPath="'data'"
      :axiosConfig="{ timeout: 5000 }"
      :totalPath="'total'"
      :saveQuery="true"
      :pageKey="page"
      :pageSizeKey="size"
      :firstPage="1"
      :id="id"
      ref="elDataTabel"
    ></el-data-table>
    <Dialog ref="showModal" :templateData="templateData" />
  </div>
</template>
<script>
import { getDownload } from "./../../utils/export";
import { getList } from "./api";
import Dialog from "./components/tabel-import.vue";

export default {
  name: "tabel",
  components: {
    Dialog,
  },
  data() {
    return {
      data: [],

      templateData: [{ id: "", name: "", address: "", creadit: "" }],

      params: {},

      tabelConfig: {
        url: "/getPersonInfo",
        hasEdit: true,
        hasView: true,
        hasDelete: true,
        hasPagination: true,

        columns: [
          {
            type: "selection",
            width: 50,
          },
          {
            type: "index",
            label: "序号",
            width: 150,
          },

          {
            label: "id",
            prop: "id",
            width: 150,
          },
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "身份证",
            prop: "creadit",
          },
          {
            label: "家庭地址",
            prop: "adress",
          },
        ],
        searchForm: [
          {
            type: "input",
            id: "name",
            label: "用户名",
            el: {
              placeholder: "请输入",
            },
            rules: [{ required: true, message: "用户名不能为空" }],
          },
          {
            type: "select",
            id: "sex",
            label: "性别",
            el: {
              placeholder: "请输入性别",
            },
            options: [
              {
                label: "男",
                value: 0,
              },
              {
                label: "女",
                value: 1,
              },
            ],
          },
        ],
      },
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    download: getDownload,
    async getList() {
      let data = await getList();
      this.data = data.data.data;
    },
    importData() {
      this.$refs.showModal.show();
    },
  },
};
</script>

<style scoped lang="scss">
.tabel {
  padding: 20px 0;
}

.export-button {
  margin-bottom: 20px;
}
</style>
