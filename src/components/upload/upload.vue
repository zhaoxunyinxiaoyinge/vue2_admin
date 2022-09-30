<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :name="'file'"
      :before-upload="beforeUpload"
      :multiple="multiple"
      :limit="3"
       list-type="picture"
      :auto-upload="autoUpload"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button v-if="autoUpload" size="small" type="primary"
        >点击上传</el-button
      >
      <el-button v-else size="small" type="primary" @click="sumbmit"
        >点击上传</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>

import {uploadImage} from "./../api/index";
export default {
    props:{
        action:{
            type:String,
            default:"https://localhost:80/egg/uploadImage",
        },
        limit:{
            type:Number,
            default:1
        },

        autoUpload:{
            type:Boolean,
            default:false
        },

        multiple:{
            type:Boolean,
            default:false
        },
        fileList:{
            type:Array,
            default(){
                return []
            }
        }

    },
    name:"upload",
    data(){
        return {
            currentFile:null,
        }
    },

    mounted() {
        if(this.action=="#"){

        }
    },

    methods: {
        handlePreview(){

        },

        handleRemove(){

        },

        beforeRemove(){

        },

        handleExceed(val){
            this.$Message.error(val);
        },

        handleSuccess(res){
            if(res.statusCode==200){
             this.$emit("success","https://"+res.Location);  
            }
        },

        beforeUpload(file){
            console.log(file,555);
        },

        sumbmit(){
            return 
            if(this.action==="#"||this.action==""){
                uploadImage({file:this.currentFile}).then(res=>{
                })
            }else{
                this.$refs.upload.submit();
            }
        }
    },
};
</script>
