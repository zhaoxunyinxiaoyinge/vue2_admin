{<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card片区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="2">
          <el-button
            type="primary"
            style="marginBottom:20px"
            @click="isFomvisable"
            >添加商品列表</el-button
          >
        </el-col>
        <!-- 表格占位 -->
        <zk-table
          :data="cartList"
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          :show-index="true"
          index-text="#"
        >
          <!-- 这里是使用的是插槽的功能 -->
          <template slot="isok" slot-scope="scope">
            <i
              class="el-icon-circle-check "
              v-if="scope.row.cat_deleted === false"
              style="color:green;font-size:16px"
            ></i>
            <i class="el-icon-circle-close" v-else style="color:yellow"></i>
          </template>
          <!-- 排序的魔板 -->
          <template slot="order" slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.cat_level == 0"
              >一级标签</el-tag
            >
            <el-tag type="info" size="mini" v-else-if="scope.row.cat_level == 1"
              >二级标签</el-tag
            >
            <el-tag type="primary" size="mini" v-else>三级标签</el-tag>
          </template>
          <!-- 操作按钮的的显示 -->
          <template slot="opt">
            <el-button size="mini" icon="el-icon-edit" type="primary"
              >编辑</el-button
            >
            <el-button size="mini" icon="el-icon-delete" type="danger"
              >删除</el-button
            >
          </template>
        </zk-table>
        <!-- 是否列所用的摸板 -->
        <!-- 这里显示的是页脚部分 -->
        <div class="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-row>
      <!--这里是显示的表单 -->
      <el-dialog
        title="添加分类"
        :visible.sync="dialogVisible"
        width="30%"
        @close="clear"
      >
        <!-- 验证表单的书写 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForms"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!--这里的prop定义一个验证规则里面的属性 -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="ruleForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <!-- 这里是级联选择器的使用 -->
            <!-- 在级联选择器中指定一个prop配置单对象 -->
            <el-cascader
              :props="cascader_set"
              v-model="selectkeys"
              :options="praentCarlist"
              @change="handleChange"
              expand-trigger="hover"
              expand-change
              style="width:100%;"
              change-on-select
              clearable
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getGoodcates, parentGoodCate,addGoodCate} from "./../../API/serve";
export default {
  data: function() {
    return {
      // 这里是指定表单的参数
      ruleForm: {
        // 选择的分类名称
        cat_name: "",
        // 选择的父级分类id
        cat_pid: 0,
        // 选择的当前分类的等级
        cat_level: 0,
      },
      // 这里是对表单的数据进行效验
      rules: {
        cat_name: [
          { required: true, message: "活动名称", trigger: "blur" },
          // {min:5,max:20,message:'请输入指定地字长度',trigger:"blur"}
        ],
      },
      // 这里指定地是查询参数
      queryInfo: {
        type: 3,
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      // prop这里是对分级选择器指定一个分类规则。
      cascader_set: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 商品分类的数据
      cartList: [],
      // 父级的分类数据列表
      praentCarlist: [],
      columns: [
        {
          label: "name",
          prop: "cat_name",
          width: "200px",
        },
        {
          label: "是否选中",
          width: "100px",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          width: "100px",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          width: "100px",
          type: "template",
          template: "opt",
        },
      ],
      // 控制对话框的显示和隐藏
      dialogVisible: false,
      // 选择的商品id的数组。
      selectkeys: [],
    };
  },
  created() {
    // 获取商品分类数据列表
    this.getCateslist();
  },
  methods: {
    async getCateslist() {
      let res = await getGoodcates(this.queryInfo);
      const { data: list } = res;
      if (list.meta.status != 200) {
        return this.$Message.error("请求错误!");
      }
      //  设置总条数
      this.total = list.data.total;
      this.cartList = list.data.result;
    },
    // 这里是监听所选择的数量的多少
    handleSizeChange(msg) {
      this.queryInfo.pagesize = msg;
      this.getCateslist();
    },
    // 这里是监听所选择的页面码数；
    handleCurrentChange(msg) {
      this.queryInfo.pagenum = msg;
      this.getCateslist();
    },
    // 级联选择项发生变化
    handleChange() {
      if(this.selectkeys.length>0){
        // @parmas 当前分类的父id;
          this.ruleForm.cat_pid=this.selectkeys[this.selectkeys.length-1];
        // 当前分类的等级
          this.ruleForm.cat_level=this.selectkeys.length;
      }else{
          //@parmas 当前父类的id;
          this.ruleForm.cat_pid=0;
          // 当前父类的等级
          this.ruleForm.cat_level=0;
      }
    },
    // 点击添加按钮让对话框显示
    isFomvisable() {
      this.getParentList();
      this.dialogVisible = true;
    },
    // 发送请求获取父级列表数据的请求
    async getParentList() {
      let { data: list } = await parentGoodCate({ type: 2 });
      if (list.meta.status !== 200) {
        return this.$Message.error("请求错误");
      }
      this.praentCarlist = list.data;
    },
    clear() {
      this.$refs.ruleForms.resetFields();
      this.ruleForm.cat_pid=0;
      this.ruleForm.cat_level=0;
      this.selectkeys = [];
    },
    handleSubmit(){
      this.$refs.ruleForms.validate( async(valid)=>{
        if(!valid){
          this.$Message({
            type:"warning",
            message:"未通过验证!"
          });
          return ;
        }
        let res=await addGoodCate(this.ruleForm);
        console.log(res.data);
        if(res.data.meta.status==201){
          this.$Message({
          type:"success",
          message:"成功修改"
        });
        this.getCateslist();//zhaoxunyin 
        }else{
          this.$Message({
            type:"warning",
            message:"添加失败!"
          });
        }
        this.dialogVisible=false;
      }) 
    }
  },
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
div.footer {
  margin: 20px 0;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.el-select-dropdown__list {
  display: flex;
  flex-direction: row;
  width: 50%;
}
div.el-popper {
  height: 150px;
  overflow: hidden;
}
</style>
