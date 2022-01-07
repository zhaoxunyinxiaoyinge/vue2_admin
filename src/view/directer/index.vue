
<template>
  <div class="directer">
    <el-form :model="form" :inline="true" label-width="100px">
      <el-form-item label="用户姓名">
        <el-input v-model="form.username" placeholder="请输入用户姓名"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-select-blur:foo="form.status" allow-create v-model="form.status" filterable>
          <el-option v-for=" item  in options" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>

      <el-table-column prop="age" label="年龄" align="center"></el-table-column>

      <el-table-column prop="place" label="地区" align="center"></el-table-column>

      <el-table-column prop="avatar" label="头像" align="center">
          <template slot-scope="scope">
            <span v-img-preview:src="scope.row.avatar">{{scope.row.avatar}}</span>
          </template>
      </el-table-column>

      <el-table-column prop="xueji" label="学籍" align="center"></el-table-column>

      <el-table-column prop="idNum" label="身份证" align="center"></el-table-column>

      <el-table-column prop="xueli" label="学历" align="center"></el-table-column>

      <el-table-column  prop="shenfen" label="身份" align="center"></el-table-column>

      <el-table-column  prop="zhuji" label="住籍" align="center"></el-table-column>

      <el-table-column prop="shouru" label="收入(元)" align="center" >
          <template slot-scope="scope">
              {{scope.row.shouru.toFixed(2)}}
            </template>
      </el-table-column>

      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column  fixed="right" width='280'>
          <template>
              <el-button type="primary" size="small">新增</el-button>
              <el-button type="danger"  size="small">删除</el-button>
              <el-button type="warning"  size="small">修改</el-button>
              <el-button type="default"  size="small">查看</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getdirectdata} from "./api/index"

export default {
  name: "directer",
  data() {
    return {
      form: {
        username:"",
        password:"",
        status:null
      },
      tableData:[],
      options:[
        {
          label:"毕业",
          id:1
        },{
          label:"小学",
          id:2
        },
        {
          label:"高中",
          id:3
        }
      ]
    };
  },
  
  created(){
    this.getData();
  },

  methods:{
    getData(){
      getdirectdata().then(res=>{
        this.tableData=res.data.data.data;
      })
    }
  }
};
</script>
<style lang="scss" scoped>
$pt: 10px;
$plrb: 10px;
$bg: #fff;
.directer {
  padding: $pt $plrb $plrb $plrb;
  // position: absolute;
}
</style>
