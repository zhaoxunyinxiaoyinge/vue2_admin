<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- el-card面板的使用 -->
    <el-card>
    <!-- 搜索框和添加按钮 -->
    <el-row>
      <el-col :span="6">
        <el-input v-model="querys.query" >
            <el-button slot="append" icon="el-icon-search"  @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="handleGoodsAdd">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格的数据展示包括编辑和删除 -->
    <el-table :data="goodsData" border>
      <el-table-column align="center" type="index" label="#" width="180"> </el-table-column>
      <el-table-column align="center" prop="goods_name" label="商品名称" >
      </el-table-column>
      <el-table-column align="center" prop="goods_price" label="商品价格(元)" width="180">
      </el-table-column>
      <el-table-column align="center" prop="goods_weight" label="商品重量" width="180">
      </el-table-column>
      <el-table-column align="center" prop="upd_time" label="创建时间" width="180">
            <template slot-scope="scope">
                <span>{{scope.row.upd_time | fitlerTime}}</span>
            </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope" width='180'>
              <el-button icon="el-icon-edit" type="primary"  @click="handleEit(scope.row)"></el-button>  
              <el-button icon='el-icon-delete' type="danger"  @click="handleDel(scope.row)"></el-button>
        </template> 
    </el-table-column>
    </el-table>
    <!-- 表格的分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querys.pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="querys.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { goodsList,  goodsEdit,goodsDel, goodsAdd } from "@/API/serve.js";
export default {
  data() {
    return {
      // 表格数据展示数据源
      goodsData: [],
      // 查询对象
      querys: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total:0
    };
  },
  created() {
    // 调用页面请求数据的方法
    this.getGoodsList(this.querys);
    // 将请求的数据赋值给data 属性中的数据源属性中去
  },
  methods: {
    // 获取数据列表，渲染表格
    async getGoodsList(obj) {
      let res = await goodsList(obj);
      if (res.data.meta.status === 200) {
        this.$Message({
          type: "success",
          message: "请求成功!",
        });
        this.goodsData = res.data.data.goods;
        this.total=res.data.data.total;
      } else {
        this.$Message({
          type: "error",
          message: "请求失败!",
        });
      }
    },
    // 对商品列表进行编辑
    async handleEditAction(val){
        console.log(val,goodsEdit);
        // let res= await goodsEdit();
    } , 
    // 对商品列表进行删除操作
    async handleDelAction(val){
        let res=await goodsDel(val.goods_id);
        if(res.data.meta.status===200){
            this.$Message({
                type:"success",
                message:"删除成功!"
            })
            // 刷新表格数据
            this.getGoodsList(this.querys);
        }else{
            this.$Message.error("删除失败!");
        }
    },
    async handleAddAction(val){
        console.log(val,goodsAdd);
    },
    // 表格编辑和删除
   async handleDel(row){
       let info=await  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
        console.log("info",info)
        if(info=="confirm"){
        // 这里发送网络请求
        this.handleDelAction(row);
        }else{
       // 告诉用户没取消
         this.$Message({
             type:"warning",
             message:"用户取消了操作"
         })     
        }
    },
    handleEdit(row){
        console.log(row)
    },
    // 添加商品信息
    handleGoodsAdd(){
    // 跳转页面，到编辑页面的路由
    this.$router.push("./goods/add");
    },
    // 分页
    handleSizeChange(sizes){
        this.querys.pagesize=sizes;
        this.getGoodsList(this.querys);
    },
    handleCurrentChange(current){
        this.querys.pagenum=current;
        this.getGoodsList(this.querys);
    },
    // 商品搜索
    handleSearch(){
        this.getGoodsList(this.querys);
    }
  },
};
</script>
<style scoped>
.el-card {
    margin-top: 20px;
}
.el-table {
    margin: 20px 0;
}

</style>
