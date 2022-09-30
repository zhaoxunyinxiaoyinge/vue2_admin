<template>
  <el-dialog
    :title="title"
    :visible.sync="getDialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="userData" ref="form" :rules="rules">
      <el-form-item prop="user_name" label="用户名称" label-width="120px">
        <el-input v-model="userData.user_name"></el-input>
      </el-form-item>

      <el-form-item prop="tel_phone" label="手机号" label-width="120px">
        <el-input v-model="userData.tel_phone"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码" label-width="120px" v-if="type=='add'">
        <el-input type="password" v-model="userData.password"></el-input>
      </el-form-item>

      <el-form-item prop="sex" label="性别" label-width="120px">
        <el-radio v-model="userData.sex" :label="1">女</el-radio>
        <el-radio v-model="userData.sex" :label="0">男</el-radio>
      </el-form-item>

      <el-form-item label="用户头像" label-width="120px">
          <Upload :autoUpload="true" @success="handleSuccess" :fileList="fileList"></Upload>
      </el-form-item>

       <el-form-item prop="role_name" label="添加角色" label-width="120px">
        <el-select v-model="userData.role_name" multiple >
          <el-option
            v-for="(item,index) in roleList"
            :key="index"
            :label="item.role_name"
            :value="item.id+''"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCommit"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import {updateUserItem,createNewUser,getUserRoleList} from "./../../api/index";
import Upload from "components/upload/upload"

export default {
  name:"userAddEdit",
  components:{
    Upload
  },
  props:{
      title:{
        type:String,
        default:""
      },
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      userData:{
        type:Object,
        default(){
          return {}
        }
      },
      type:{
        type:String,
        default:"add"
      },
      roleList:{
        type:Array,
        default(){
          return []
        }
      }
  },
  data() {
    return {
      roles_list: [],
      rules: {
        user_name: [],
        tel_phone: [],
        sex: [],
        role_name: [],
      },
      fileList:[]
    };
  },

  computed: {
    getDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("close", val);
        this.fileList=[];
      },
    },
  },

  methods: {
    handleClose() {      
      this.$refs.form.resetFields();
      this.getDialogVisible = false;
    },

    handleCommit(){
      if(this.type=="add"){
        this.handleAdd();
      }else{
        this.handlUpdate();
      }
    },

    handlUpdate(){
      const {tel_phone,sex,user_name,id,role_name,avatar}=this.userData;
        updateUserItem({tel_phone,avatar,sex,user_name,role_name,id,role_name:role_name.join(',')}).then(res=>{
          if(res.data.code==1){
            this.$Message.success("更新成功");
            this.$emit('update:list')
          }
        }).catch(e=>{
          this.$Message.error(e);
        }).finally(()=>{
          this.getDialogVisible=false;
        })
    },

    handleAdd(){
       const {tel_phone,sex,user_name,role_name,password}=this.userData;
      createNewUser({tel_phone,sex,user_name,role_name,password,role_name:role_name.join(',')}).then(res=>{
        if(res.data.code==0){
          this.$Message.success("添加成功");
          this.getDialogVisible=false;
          this.$emit('update:list')
        }
      }).catch(e=>{
        this.$Message.error(e);
      })
    },

    handleSuccess(res){
      console.log(res);
      this.userData.avatar=res;
    }
  },

  watch: {
      userData:{
        deep:true,
        immediate:true,
        handler(news,olds){
            this.fileList=[];
          if(this.userData.avatar){
            this.fileList.push({url:this.userData.avatar});
          }
        }
      }
  },

};
</script>
