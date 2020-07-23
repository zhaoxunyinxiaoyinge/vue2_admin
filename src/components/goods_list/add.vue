<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 警告提示栏目 -->
      <el-alert
        title="添加商品信息"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <!-- 步骤条的组件使用 -->
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息" name="first"></el-step>
        <el-step title="商品参数" name="second"></el-step>
        <el-step title="商品属性" name="three"></el-step>
        <el-step title="商品照片" name="three"></el-step>
        <el-step title="商品类容" name="three"></el-step>
        <el-step title="商品完成" name="three"></el-step>
      </el-steps>

      <!-- 使用表单将tab栏进行包裹 -->
      <el-form ref="form" :model="tabData" :rules="tabelRule">
        <!-- tab 栏目-->
        <el-tabs
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="用户管理">
            <el-form-item
              label="商品名称"
              label-position="top"
              prop="goods_name"
            >
              <el-input v-model="tabData.goods_name" />
            </el-form-item>
            <el-form-item
              label="商品价格"
              label-position="top"
              prop="goods_price"
            >
              <el-input v-model="tabData.goods_price" />
            </el-form-item>
            <el-form-item
              label="商品重量"
              label-position="top"
              prop="goods_weight"
            >
              <el-input v-model="tabData.goods_weight" />
            </el-form-item>
            <el-form-item
              label="商品数量"
              label-position="top"
              prop="goods_number"
            >
              <el-input v-model="tabData.goods_number" />
            </el-form-item>
            <!-- 级联选择框 -->
            <el-form-item
              label="商品数量"
              label-position="top"
              prop="goods_cat"
            >
              <el-cascader
                @change="handleChange"
                :options="goodsData"
                v-model="tabData.goods_cat"
                :props="{
                  checkStrictly: true,
                  expandTrigger: 'hover',
                  value: 'cat_id',
                  label: 'cat_name',
                  children: 'children',
                }"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="动态属性管理">
            <el-form-item
              :label="item.attr_name"
              :key="item.attr_id"
              v-for="item in manyTabData"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="stem"
                  :key="index"
                  v-for="(stem, index) in item.attr_vals"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="静态属性管理">
            <el-form-item
              :key="item.attr_id"
              :label="item.attr_name"
              v-for="item in onlyTabData"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="图片管理">
            <el-upload
              class="upload-demo"
              :action="upAction"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="header"
              :on-success="successEvent"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-dialog
              title="图片预览"
              :visible.sync="preveintVisible"
              width="30%"
            >
                <img :src=" tabData.imgUrl" alt=""/>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品内容"> 
           <quill-editor v-model=" tabData.goods_introduce"> </quill-editor>   
           <el-button type="primary" @click="handleAdd">添加按钮</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { parentGoodCate, getGoodsListTabarg,postGoodsForm } from "@/API/serve.js";
import _ from "lodash";
export default {
  data() {
    return {
      active: 0,
      preveintVisible:false,
      tabData: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],  
        goods_introduce:"",
       
      // 图片保存数组
        pics: [],
        imgUrl:"",
        attrs:[],
      },
      upAction: "http://localhost:8083/api/private/v1/upload",
      header: { Authorization: window.sessionStorage.getItem("token") },
      manyTabData: [],
      onlyTabData: [],
      tabelRule: {
        goods_name: [
          {
            required: true,
            message: "不能为空!",
            trigger: "blur",
          },
        ],
        goods_price: [
          {
            required: true,
            message: "不能为空!",
            trigger: "blur",
          },
        ],
        goods_weight: [
          {
            required: true,
            message: "不能为空!",
            trigger: "blur",
          },
        ],
        goods_number: [
          {
            required: true,
            message: "不能为空!",
            trigger: "blur",
          },
        ],
        goods_cat: [
          {
            required: true,
            message: "请选择商品分类!",
            trigger: "change",
          },
        ],
      },
      goodsData: [],
    };
  },
  methods: {
    // 当页面加载的时候获取当前级联框中要使用的数据。
    async getGoodsData() {
      let res = await parentGoodCate();
      if (res.data.meta.status === 200) {
        this.goodsData = res.data.data;
      }
    },
    // 单当前的级联选择框的选泽地不是第三个选择框，那么不起作用
    handleChange() {
      if (this.tabData.goods_cat.length !== 3) {
        this.tabData.goods_cat = [];
      }
    },
    // 添加商品，阻止页面切换
    beforeTabLeave(news, old) {
      if (old == 0 && this.tabData.goods_cat.length != 3) {
        this.$Message.info("请选择商品分类!");
        return false;
      }
    },
    // 给tab面板绑定点击事件，
    async tabClick(item) {
      this.active = parseInt(item.index);
      // 配置参数管理页面请求数据
      if (this.active === 1) {
        // 网络请求。
        let { data: res } = await getGoodsListTabarg(this.getattrId, {
          sel: "many",
        });
        if (res.meta.status !== 200) {
          return this.$Message.error("获取数据失败!");
        }
        res.data.forEach((element) => {
          element.attr_vals =
            element.attr_vals.length == 0 ? [] : element.attr_vals.split(",");
        });
        this.manyTabData = res.data;
      } else if (this.active == 2) {
        let { data: res } = await getGoodsListTabarg(this.getattrId, {
          sel: "only",
        });
        if (res.meta.status !== 200) {
          return this.$Message.error("获取数据失败!");
        }
        this.onlyTabData = res.data;
      }
    },
    // 当点击图片预览时地操作情况
    handlePreview(file) {
      //  找到图片的真实地址
      this.tabData.imgUrl=file.response.data.url;
      // 在这个事件中，将图片的弹出框进行显示
      this.preveintVisible=true;  
    },
    handleRemove(file) {
      // 找到要移除地图片路径
      let path = file.response.data.tmp_path;
      // 找到要移除地图片所在的索引
      let index = this.tabData.pics.findIndex((i) => {
        i.tmp_path == path;
      });
      // 删除指定位置的图片
      this.tabData.pics.splice(index, 1);
      console.log(this. tabData.pics, "pics");
    },
    successEvent(response) {
      let info = { pic: response.data.tmp_path };
      this. tabData.pics.push(info);
    },
    handleAdd(){
      this.$refs.form.validate(async(item)=>{
        if(!item){
          return  this.$Message.error("请填写必要的表单项!");
        }
        // 对原数据进行深拷贝，
          let form =_.cloneDeep(this.tabData);
          form.goods_cat=form.goods_cat.join(",");
          // 处理tabData中的attr问题
          this.manyTabData.forEach(item=>{
            let info={};
            info.attr_id=item.attr_id;
            info.attr_vals=item.attr_vals.join(",");
            this.tabData.attrs.push(info);
          })
          console.log(this.onlyTabData,'onlyTabData');
          this.onlyTabData.forEach(item=>{
            let info={};
            info.attr_id=item.attr_id;
            info.attr_vals=item.attr_vals;
            this.tabData.attrs.push(info);
          })
         form.attrs=this.tabData.attrs;
         console.log(form,"form")
         let res=await postGoodsForm(form);
         console.log(res);
         if(res.data.meta.status!=201){
          return  this.$Message.error("添加商品失败!")
         }
         this.$router.push("/goods");
      })
    }
  },
  computed: {
    // 获取当前选择商品下面的最后一个商品id;
    getattrId() {
      if (this.tabData.goods_cat.length === 3) {
        return this.tabData.goods_cat[2];
      }
      return null;
    },
  },
  created() {
    this.getGoodsData();
  },
};
</script>
<style scoped>
.el-alert {
  margin: 20px 0;
}
.el-steps {
  margin: 30px 0;
}
.el-tab-pane {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.el-checkbox-group {
  display: flex;
  justify-content: flex-start;
}
.el-checkbox {
  margin-right: 0;
}
.el-dialog img {
    width: 100%;
}
.el-tab-pane  .el-button {
    margin-top:20px;
}


</style>
