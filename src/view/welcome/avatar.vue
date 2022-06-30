<template>
  <el-dialog :visible.sync="dialogVisible" width="50%" title="用户头像更改" :before-close="handleClose">
    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper ref="cropper" :autoCrop="true" :img="base64Image" :outputType="'jpg'" :full="true" @realTime="getPreview" />
        </div>

        <el-button size="small" @click="changePreview('add')" type="default">+放大</el-button>
        <el-button size="small"  @click="changePreview('scale')" type="default">-缩小</el-button>
      </section>
      <div :style="previewStyle1">
        <div :style="previews.div" v-if="previews">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>

    <el-button type="primary" @click="cropImage" style="margin-top:20px">
      裁剪</el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { getBase64 } from "./../../utils/comon.js"
export default {
  name: "avatar",
  data() {
    return {
      dialogVisible: false,
      imgSrc: require("./../../assets/1.jpg"),
      cropImg: "",
      previewStyle1: null,
      previews :null,
      base64Image: "data:image/jpeg;base64,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"
    };
  },

  components: { VueCropper },

  mounted() {
    this.getBase64s();
  },

  methods: {
    getBase64s() {
      getBase64(this.imgSrc, (res) => {
        console.log(res, 6666)
        // this.base64Image=res;
      })
    },

    handleShow(data) {
      this.dialogVisible = true;
    },

    handleClose() {
      this.dialogVisible = false;
    },

    handleOk() {
      this.dialogVisible = false;
    },

    cropImage() {
      // 获取截图的 base64 数据
      this.$refs.cropper.getCropData((res) => {
        this.cropImg = res;
      });
    },

    getPreview(data) {
      var previews = data
      var h = 1
      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      }

      this.previews=data;
    },

    changePreview(type){
      if(type=='add'){
       this.$refs.cropper.changeScale(1);
      }else{
         this.$refs.cropper.changeScale(-1); 
      }

    }
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  justify-content: space-evenly;

  .img-cropper {
    margin-bottom: 20px;
    height: 200px;
    width: 200px;
  }
}

.cropper-area {
  width: 300px;
}

.preview {
  width: 115px;
  height: 62px;
}

.crop-preview {
  border: 1px solid #333;
  width: 244px;
  height: 203px;
  overflow: hidden;
}
</style>
