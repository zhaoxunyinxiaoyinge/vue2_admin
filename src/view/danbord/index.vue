<template>
  <div class="carousel">
    <el-carousel :interval="2000" type="card">
      <el-carousel-item v-for="(item, index) in carList" :key="index">
        <el-image class="img" :src="item.imgurl"></el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="task-list">
      <div class="task-list-item ">javascript</div>
      <div class="task-list-item ">css3</div>
      <div class="task-list-item ">HTML5</div>
      <div class="task-list-item ">vue</div>
      <div class="task-list-item ">react</div>
      <div class="task-list-item ">小程序</div>
      <div class="task-list-item ">wepack</div>
      <div class="task-list-item ">eslint</div>
    </div>

    <el-dialog :visible.sync="dialogVisible" class="video-wrap">
      <video
        @ended="handleEnDed()"
        width="100%"
        height="350"
        controls="controls"
        autoplay
      >
        <source src="@/assets/video/预览视频.mp4" type="video/mp4" />
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
      dialogVisible: false,
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

    getVido() {
      setTimeout(() => {
        this.dialogVisible = true;
      }, 2000);
    },
    handleEnDed() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.img {
  display: block;
  width: 100%;
}

.el-carousel {
  width: auto;
  min-height: 150px;
  overflow: hidden;
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

.task-list {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-auto-rows: minmax(150px, auto);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.task-list-item {
  background: #409EFF;
  border-radius: 5px;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width:761px) and (max-width:991px) {
  .task-list {
     grid-template-columns: repeat(2,1fr);  
  }
}

@media screen and (max-width:761px) {
  .task-list {
     grid-template-columns: repeat(1,1fr);  
  }
}


</style>
