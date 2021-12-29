<template>
    <el-dialog
         :visible.sync="dialogVisible"
          width="50%"
          title="用户头像更改"
          :before-close="handleClose"
    >
     <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="imgSrc"
            preview=".preview"
          />
        </div>

            <el-button size="small" type="default">+</el-button>
            <el-button size="small" type="default">-</el-button>

        </section>
        <div class="crop-preview">    
            <div class="preview"></div>

        </div>
    </div> 

   <el-button type="primary" @click="cropImage" style="margin-top:20px" > 裁剪</el-button>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleOk">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name:"avatar",
    data(){
        return {
            dialogVisible:false,
            imgSrc:require("./../../assets/1.jpg"),
            cropImg:""
        }
    },

    components: { VueCropper},

    methods:{
        handleShow(data){
            this.dialogVisible=true;

        },

        handleClose(){
            this.dialogVisible=false;
        },

        handleOk(){
            this.dialogVisible=false;
        },

        cropImage(){
              this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        }
    }
}
</script>

<style lang="scss">
        .content {
            display: flex;
            justify-content: space-evenly;
            .img-cropper {
                margin-bottom: 20px;
            }
        }

        .cropper-area {
            width:300px;
        }
        
        .preview {
            width: 115px;
            height: 62px;
        }
         .crop-preview {
            border:1px solid #333;
            width: 244px;
            height: 203px;
            overflow: hidden;
        }

</style>