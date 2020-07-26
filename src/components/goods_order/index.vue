<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 带查询地搜索框 -->
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input v-model="orderSearch">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- tabel表格的数据渲染,带操作和删除功能 -->
      <el-table :data="orderData" border style="width: 100%">
        <el-table-column type="index" label="#" width="200" align="center">
        </el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_price }}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_pay"
          label="是否付款"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="danger">{{
              scope.row.order_pay > 0 ? "已付款" : "未付款"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="trade_no"
          label="是否发货"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.trade_no ? "已发货" : "未发货" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="下单时间"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.update_time).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-location-outline"
              @click="getwuliuInfo"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页显示 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
      >
      </el-pagination>
      <!-- 在操作编辑栏，可以显示弹出框 -->
      <el-dialog
        title="修改地址"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="orderForm" :rules="orderRules">
          <el-form-item prop="addressOne" label="省市/区县">
            <el-cascader
              v-model="orderForm.selectCity"
              :options="orderForm.cityData"
              :props="{
                expandTrigger: 'hover',
                label: 'label',
                children: 'children',
                multiple: true,
              }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item prop="addressTwo" label="收货地址:">
            <el-input v-model="orderForm.addressTwo" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancle">取 消</el-button>
          <el-button type="primary" @click="handleCommit = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 弹出框显示级联框和表单验证 -->
      <!-- 物流快递对话框显示 -->
      <el-dialog
        class="el-timeline"
        title="物流信息提示"
        :visible.sync="infodialogVisible"
        width="30%"
      >
        <!-- 使用timeline时间线展示数据 -->
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in wuliuData"
            :key="index"
            :timestamp="activity.ftime"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
      <!-- 物流进度查询 -->
    </el-card>
  </div>
</template>
<script>
import { orderlist, wuliuInfo } from "@/API/serve.js";
export default {
  data() {
    return {
      orderSearch: "",
      dialogVisible: false,
      wuliudialogVisible: false,
      wuliuData: [],
      infodialogVisible: false,
      reverse: true,
      orderData: [],
      orderForm: {
        addressOne: "",
        addressTwo: "",
        cityData: [
          {
            label: "湖北",
            value: "湖北",
            children: [
              {
                label: "荆州",
                value: "荆州",
              },
            ],
          },
          {
            label: "湖南",
            value: "湖南",
            children: [
              {
                label: "长沙",
                value: "长沙",
              },
            ],
          },
        ],
        selectCity: [],
      },
      query: {
        currentPage: 1,
        pagesize: 10,
        total: 1,
      },
      orderRules: {
        addressOne: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        addressTwo: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getOderList();
  },
  methods: {
    async getOderList() {
      let res = await orderlist({
        pagenum: this.query.currentPage,
        pagesize: this.query.pagesize,
      });
      console.log(res);
      if (res.data.meta.status !== 200) {
        return this.$Message.error("数据列表请求错误!");
      }
      this.query.total = res.data.data.total;
      this.query.currentPage = res.data.pagenum;
      this.orderData = res.data.data.goods;
    },
    async getwuliuInfo() {
      this.infodialogVisible = true;
      let res = await wuliuInfo();
      console.log(res.data.data, "wuliuxinxi");
      if (res.data.meta.status != 200) {
        return this.$Message.error("信息查询失败!");
      }
      this.wuliuData = res.data.data;
    },
    handleCurrentChange(num) {
      this.query.currentPage = num;
      this.getOderList();
    },
    handleSizeChange(size) {
      this.query.pagesize = size;
      this.getOderList();
    },
    handleSearch() {},
    handleEdit() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleCancle() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleCommit() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleChange() {},
  },
};
</script>
<style scoped>
.el-card {
  margin: 20px 0px;
}
.el-row {
  margin: 20px 0;
}
.el-pagination {
  padding: 20px 0;
}
.el-cascader {
  width: 100%;
}
.el-timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
</style>
