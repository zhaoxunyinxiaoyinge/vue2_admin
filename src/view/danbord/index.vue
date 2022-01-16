<template>
  <div class="carousel">
    <el-carousel :interval="2000" type="card" height="500px">
      <el-carousel-item v-for="(item, index) in carList" :key="index">
        <el-image class="img" :src="item.imgurl"></el-image>
      </el-carousel-item>
    </el-carousel> 
    <el-dialog :visible.sync="dialogVisible" class="video-wrap" >
          <video @ended="handleEnDed()"  width="100%" height="350" controls="controls"  autoplay>
             <source   src="@/assets/video/预览视频.mp4" type="video/mp4" />
          </video>
    </el-dialog>

  </div>
</template>
<script>
import { getImageList } from "./api";

export default {
  name: "danbord",
  data() {
    return {
      list: [],
      carList: [],
      dialogVisible:false
    };
  },

  mounted() {
    this.getList();
    this.getVido();
  },

  methods: {
    async getList() {
      let data = await getImageList();
      this.list = data.data.data.data;
      this.carList = data.data.data.data;
    },

    getVido(){
      setTimeout(()=>{
        this.dialogVisible=true;
      },2000)
    },
    handleEnDed(){
      this.dialogVisible=false
    }
  },
};
</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 100%;
}


.carousel {
  width: 100%;
}



.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  // line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
