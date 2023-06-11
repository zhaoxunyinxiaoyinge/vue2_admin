<template>
  <el-card>
    <FormFields :formField="formFields" @query="handleQuery" :labelWidth="'80px'"></FormFields>
    <div class="opration">
      <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" :loading="printing" @click="createdPdf" icon="el-icon-printer">生成PDF</el-button>
    </div>
    <el-table :data="list" id="tabel" ref="tabel" stripe v-loading="loading">
      <template v-for="(item, index) in tabelConfig">
        <el-table-column :label="item.label" :width="item.width" :align="item.align" :prop="item.prop" :key="index"
          v-if="item.template">
          <template slot-scope="scope">
            <el-image style="width:50px;height:50px" :fit="'contain'" :src="scope.row.pic"></el-image>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.label == '操作'" :label="item.label" :width="item.width" :align="item.align"
          :prop="item.prop" :key="index">
          <template slot-scope="scope">
            <div class="tabel-opration">
              <el-button @click="handleEdit(scope.row)" icon="el-icon-edit" type="primary">编辑</el-button>
              <el-button @click="handleDelete(scope.row.id)" icon="el-icon-delete" type="danger">删除</el-button>

              <el-popover placement="right" width="100" height="100" trigger="click">
                <div>
                    <div :id="'qrcode' + scope.$index" :ref="'qrcode' + scope.$index"></div>   
                </div>
                <el-button slot="reference" @click="handleErcode('qrcode' + scope.$index)" type="primary">二维码</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.label == '状态'" :label="item.label" :formatter="item.formatter"
          :width="item.width" :align="item.align" :prop="item.prop" :key="index">
        </el-table-column>

        <el-table-column v-else :label="item.label" :width="item.width" :align="item.align" :prop="item.prop"
          :key="index">
        </el-table-column>
      </template>
    </el-table>

    <pageTion @update="handleChange" :page="listQuery.page" :pageSize="listQuery.limit" :total="total"></pageTion>

    <Dialog :visible="show" @update:visible="show = false" :formData="item" @commit="handleCommit"
      :formField="formField" :inline="inline">
      <template v-slot:form="config">
        <FormFields ref="form" :formData="item" :formField="config.formField" :labelWidth="'120px'"
          :inline="config.inline" :show="config.show"></FormFields>
      </template>
    </Dialog>
  </el-card>
</template>
<script>
import {
  getBananer,
  createBananer,
  updateBananer,
  deleteBananer,
} from "./api/index";
import Sortable from "sortablejs";
import FormFields from "components/formFeild/index.vue";
import Dialog from "components/Dialog/index.vue";
import pageTion from "components/pagination/index.vue";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from 'qrcodejs2';

export default {
  name: "tests",
  components: {
    FormFields,
    Dialog,
    pageTion,
  },

  created() {
    this.getBananer();
  },

  data() {
    return {
      tabelConfig: [
        {
          width: "200",
          label: "名称",
          aligin: "left",
          formatter: () => { },
          prop: "name",
        },
        {
          width: "250",
          label: "图片",
          align: "left",
          formatter: () => { },
          template:
            '<template slot-scope="scope"><el-image :src="scope.row.pic"></tempalate>',
          prop: "pic",
        },
        {
          width: "100",
          label: "状态",
          align: "left",
          formatter: (row) => {
            return row.status == 1 ? "开启" : "关闭";
          },
          prop: "status",
        },
        {
          width: "auto",
          label: "说明",
          align: "left",
          formatter: () => { },
          prop: "text",
        },
        {
          width: "350px",
          align: "left",
          label: "操作",
        },
      ],

      formFields: [
        {
          type: "input",
          field: "name",
          label: "名称",
        },
        {
          type: "select",
          field: "status",
          label: "状态",
          options: [
            {
              value: 0,
              label: "否",
            },
            {
              value: 1,
              label: "是",
            },
          ],
          option_label:'label',
          option_value:'value'
        },
        {
          type: "btn",
          label: "",
        },
      ],

      formField: [
        {
          type: "input",
          field: "name",
          label: "名称",
        },
        {
          type: "select",
          field: "status",
          label: "状态",
          options: [
            {
              value: 0,
              label: "否",
            },
            {
              value: 1,
              label: "是",
            },
          ],
              option_label:'label',
          option_value:'value'
        },
        {
          type: "image",
          field: "pic",
          label: "bananer图像",
        },

        {
          type: "textArea",
          field: "text",
          label: "说明",
        },
      ],
      show: false,
      item: {},
      inline: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      total: 0,
      list: [],
      sortable: null,
      loading: false,
      printing: false
    };
  },

  methods: {
    dragTable() {
      let el = document.querySelector(".el-table tbody");
      this.sortable = Sortable.create(el, {});
    },

    getBananer() {
      this.sortable = null;
      this.loading = true;
      getBananer({ ...this.listQuery })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.rows;
            this.total = res.data.data.count;
            this.dragTable();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleAdd() {
      this.show = true;
      this.item = {};
    },

    async handleEdit(row) {
      this.item = {};
      getBananer({ id: row.id }).then((res) => {
        if (res.data.code == 0) {
          this.item = res.data.data.rows[0];
          this.show = true;
        }
      });
    },

    handleCommit(val) {
      if (val?.id) {
        updateBananer({ ...this.$refs.form.form }).then((res) => {
          if (res.data.code == 0) {
            this.show = false;
            this.$Message.success("更新成功");
            this.listQuery.page = 1;
            this.getBananer();
          }
        });
      } else {
        createBananer({ ...this.$refs.form.form }).then((res) => {
          if (res.data.code == 0) {
            this.show = false;
            this.$Message.success("创建成功");
            this.listQuery.page = 1;
            this.getBananer();
          }
        });
      }
    },
    async handleDelete(id) {
      let confirm = await this.$confirm(
        "此操作将删除该条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      );

      if (confirm) {
        deleteBananer({ id }).then((res) => {
          this.$Message.success("删除成功");
          this.getBananer();
        });
      }
    },

    handleChange(val) {
      this.listQuery = { ...val, ...this.listQuery };
      this.getBananer();
    },

    handleQuery(val) {
      this.listQuery.page = 1;
      this.loading = true;
      getBananer({ ...val, ...this.listQuery })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.rows;
            this.total = res.data.data.count;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    createdPdf() {
      this.printing = true;
      let element = document.querySelector('.el-table');
      html2canvas(element).then((canvas) => {
        var pdf = new jsPDF("p", "mm", "a4");
        var ctx = canvas.getContext("2d");
        let a4w = 190,
          a4h = 274, //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
          imgHeight = Math.floor((a4h * canvas.width) / a4w); //按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0;
        while (renderedHeight < imgHeight) {
          let canv = document.createElement('canvas');
          let ctxTwo = canv.getContext('2d');
          canv.width = canvas.width;
          canv.height = Math.min(imgHeight, canvas.height - renderedHeight);
          let imgData = ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight));
          ctxTwo.putImageData(imgData, 0, 0);

          pdf.addImage(
            canv.toDataURL("image/jpeg"),
            "jpeg",
            10,
            10,
            a4w,
            Math.min(a4h, (a4w * canv.height) / canv.width)
          );
          renderedHeight += imgHeight;
          if (renderedHeight < canvas.height) {
            pdf.addPage();
          }
        }

        pdf.save('content.pdf');
        setTimeout(() => {
          this.printing = false;
        }, 1000)

      });
    },

    handleErcode(dom) {
      let currentDom=document.querySelector('#'+dom);
      currentDom.innerHTML=null;
      let text = '二维码内容';
      let qrcode = new QRCode(currentDom, {
        text: text, //二维码内容字符串
        width: 100, //图像宽度
        height: 100, //图像高度
        colorDark: '#000000', //二维码前景色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.H, //容错级别
      })

      console.log(qrcode,"qrcode")
    }
  },
};
</script>
