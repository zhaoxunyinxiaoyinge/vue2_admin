<template>
  <div class="carousel">
    <el-carousel :interval="2000" type="card" height="500px">
      <el-carousel-item v-for="(item, index) in carList" :key="index">
        <el-image class="img" :src="item.imgurl"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>
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
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      let data = await getImageList();
      this.list = data.data.data.data;
      this.carList = data.data.data.data;
    },
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

.el-carousel__item {
  // width: 100%;
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
