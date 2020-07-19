<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-alert
            :closable="false"
            title="请选择你要的商品名称"
            type="warning"
            show-icon
          >
          </el-alert>
        </el-col>
      </el-row>
      <!-- 级联选择框 -->
      <el-row :gutter="0" class="rows">
        <el-col :span="6">
          <span>请选择你要分类的商品&nbsp;:&nbsp;&nbsp;&nbsp;</span>
          <el-cascader
            v-model="categroys"
            :options="category_options"
            :props="category_cat"
            expand-trigger="trigger"
            clearable
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- tab栏目 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-row class="tab-button"
          ><el-col :span="1"
            ><el-button type="primary" @click="addAttrs"
              >添加参数</el-button
            ></el-col
          ></el-row
        >
        <el-tab-pane label="动态参数" name="many">
          <el-table border :data="manyData">
            <el-table-column type="expand" width="150" label="查看更多">
              <template
                slot-scope="scope"
                v-if="scope.row.attr_vals.length > 0"
              >
                <el-tag
                  :key="tag"
                  v-for="(tag, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleTagClose(index, scope.row)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else size="small" @click="showInputTag(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" width="120px" label="序列">
            </el-table-column>
            <el-table-column prop="attr_name" label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeAttribute(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-table border :data="onlyData">
            <el-table-column
              type="expand"
              width="150"
              label="查看更多"
              prop="attr_vals"
            >
              <!--tag标签可以变换出来  -->
              <template slot-scope="scope">
                <!-- <el-tag :key="i" v-for='(item,i) in scope.row.attr_vals'  closable>{{item}}</el-tag> -->
                <el-tag
                  :key="tag"
                  v-for="tag in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleTagClose(index, scope.row)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else size="small" @click="showInputTag(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" width="120px" label="序列">
            </el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeAttribute(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加弹出框动态添加一个动态属性和静态属性 -->
      <el-dialog
        :title="titleText"
        :visible.sync="attrVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="参数名称:" prop="attr_name">
            <el-input
              type="text"
              autocomplete="off"
              v-model="ruleForm.attr_name"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCommit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 点击Edit 按钮，弹出对话框 -->
      <el-dialog
        :title="editText"
        :visible.sync="editVisible"
        width="30%"
        :before-close="editHandleClose"
      >
        <el-form
          :model="editForm"
          status-icon
          :rules="editRules"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="参数名称:" prop="attr_name">
            <el-input
              type="text"
              autocomplete="off"
              v-model="editForm.attr_name"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editHandleClose">取 消</el-button>
          <el-button type="primary" @click="editHandleCommit(editForm)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- expand下的tag标签的编辑和完成发送网络请求 -->
    </el-card>
  </div>
</template>
<script>
import {
  parentGoodCate,
  getAttrsData,
  postAddAttribute,
  updateAttribute,
  deleteAttribute,
  postTagAttribute
} from "@/API/serve.js";
export default {
  name: "goods_parmas",
  data() {
    return {
      // 这是第一个被激活地名称
      activeName: "many",
      categroys: [],
      category_options: [],
      attr_id: "",
      category_cat: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      manyData: [],
      onlyData: [],
      attrVisible: false,
      editVisible: false,
      ruleForm: {
        attr_name: "",
      },
      rules: {
        attr_name: [
          {
            required: true,
            message: "参数不能为空!",
            trigger: "blur",
          },
        ],
      },
      //修改表单的操作
      editForm: {
        attr_name: "",
        attr_id: "",
        cat_id: "",
      },
      editRules: {
        attr_name: [
          {
            required: true,
            message: "参数不能为空!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 给级联选择框获取数据
    this.getCartlist();
  },
  computed: {
    titleText() {
      if (this.activeName == "many") {
        return "动态添加参数";
      } else {
        return "添加静态属性";
      }
    },
    editText() {
      if (this.activeName == "many") {
        return "动态修改参数";
      } else {
        return "修改静态属性";
      }
    },
  },
  methods: {
    async getCartlist() {
      let res = await parentGoodCate({});
      if (res.data.meta.status !== 200) {
        return this.$Message.error("获取数据错误!");
      }
      this.category_options = res.data.data;
    },
    async getAttributeArg(id, arg) {
      let res = await getAttrsData(id, arg);
      if (res.data.meta.status != 200) {
        return this.$Message.error("请求的数据错误!");
      }
      res = this.handleWith(res);
      console.log(res, "res修改后的数剧");
      if (this.activeName == "many") {
        this.manyData = res;
      } else {
        this.onlyData = res;
      }
    },
    async postAttributeArg(id, attr_name, attr_sel) {
      let res = await postAddAttribute(id, attr_name, attr_sel);
      if (res.data.meta.status !== 200) {
        return new Error("错误!");
      }
    },
    // 改变获取数据中的attr_vals中的字符串为数组
    handleWith(val) {
      return val.data.data.map((item) => {
        if (!item.attr_vals) {
          item.attr_vals = [];
        } else {
          item.attr_vals = item.attr_vals.trim().split(",");
        }
        // 给tag标签添加一个关联属性
        item.inputVisible=false;
        item.inputValue="";
        return item;
      });
    },
    handleClick() {},
    // 当分级联框发生改变的时候
    handleChange() {
      if (this.categroys.length < 3) {
        this.categroys = [];
        this.manyData=[];
        this.onlyData=[];
        return;
      }
      let attr_id = this.categroys[this.categroys.length - 1];
      this.attr_id = attr_id;
      // 调用网络请求获取当id发生改变的时候获取地数据
      this.getAttributeArg(attr_id, this.activeName);
    },
    // 添加商品参数
    addAttrs() {
      this.attrVisible = true;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.attrVisible = false;
    },
    handleCommit() {
      this.$refs.ruleForm.validate(async (validate) => {
        if (validate) {
          // 发起网络请求
          try {
            this.postAttributeArg(
              this.attr_id,
              this.ruleForm.attr_name,
              this.activeName
            );
            this.$Message({
              type: "success",
              message: "添加成功!",
            });
            this.getAttributeArg(this.attr_id, this.activeName);
            this.$refs.ruleForm.resetFields();
            this.attrVisible = false;
          } catch (e) {
            return this.$Message.error("添加失败!");
          }
        } else {
          this.$refs.ruleForm.resetFields();
        }
      });
    },
    handleEdit(val) {
      console.log(val, "info");
      this.editVisible = true;
      this.editForm.attr_name = val.attr_name;
      this.editForm.attr_id = val.attr_id;
      this.editForm.cat_id = val.cat_id;
    },
    editHandleClose() {
      this.editVisible = false;
      this.editForm.attr_name = "";
    },
    editHandleCommit(val) {
      this.$refs.editForm.validate(async (validate) => {
        if (!validate) return;
        let res = await updateAttribute(
          val.cat_id,
          val.attr_id,
          val.attr_name,
          this.activeName
        );
        if (res.data.meta.status === 200) {
          this.$Message({
            type: "success",
            message: "添加成功!",
          });
        }
        // 更新指定地商品属性
        this.getAttributeArg(val.cat_id, this.activeName);
        console.log("这里我更新了数据");
        this.editVisible = false;
        this.editForm = {
          attr_name: "",
          attr_id: "",
          cat_id: "",
        };
      });
    },
    async removeAttribute(val) {
      console.log(val);
      //弹出删除框提示!
      let res;
      try {
        res = await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } catch (err) {
        this.$Message({
          type: "cancle",
          message: "已经取消删除操作!",
        });
        res = "cancle";
      }
      // 这里是执行删除地操作。
      if (res == "confirm") {
        let msg = await deleteAttribute(val.cat_id, val.attr_id);
        // 判断删除地操作是否成功！
        if (msg.data.meta.status === 200) {
          // 给予用户反馈提示，操作是否成功。
          this.$Message({
            type: "success",
            message: "删除成功!",
          });

          // 刷新属性列表数据，展示在当前的页面
          this.getAttributeArg(val.cat_id, this.activeName);
        } else {
          // 当删除不成功不给予用户提示
          this.$Message({
            type: "error",
            message: "删除失败!",
          });
        }
      }
    },
    // tag标签的关闭事件
    handleTagClose(index,arr){
         arr.attr_vals.splice(index,1);
        this.saveAttributeTag(arr);
    },
    showInputTag(bol){
       bol.inputVisible = true;
        this.$nextTick(()=> {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
   async handleInputConfirm(arr){
       let inputValue = arr.inputValue;
        if (inputValue.trim().length===0) {
          arr.inputVisible = false;
          arr.inputValue = '';
          return
        }
        // 如果这里的类容做后续处理。
        arr.attr_vals.push(inputValue);
        this.saveAttributeTag(arr);
    },
   async saveAttributeTag(arr){
        let res= await postTagAttribute(arr.cat_id,arr.attr_id,{attr_name:arr.attr_name,attr_sel:this.activeName,
        attr_vals:arr.attr_vals.join(",")});
        if(res.data.meta.status===200){
          this.$Message({
            type:"success",
            message:"修改成功!"
          })
        }else{
          this.$Message({
            type:"error",
            message:"修改失败!"
          })
        }
        arr.inputVisible = false;
    }
  }
};
</script>
<style scoped>
.rows {
  margin: 20px 0 20px 0;
}
.tab-button {
  margin: 15px 0;
}
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 150px;
}
</style>
