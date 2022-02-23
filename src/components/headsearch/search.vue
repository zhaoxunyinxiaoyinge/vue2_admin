<template>
  <div :class="{ 'show': show }" class="headsearch-select">
    <svg-icon  :svgClass="'search'" :className="'search'"  @click.stop="change"></svg-icon>
    <el-select v-model="queryParams" ref="select-search" class="select-search" size="small">
      <el-option v-for="(item, index) in options" :key="index"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      show: false,
      queryParams: "",
      options: [],
    };
  },

  methods:{
    change(){
      this.show=!this.show;
    }
  }
};
</script>
 
<style lang="scss" scoped> 
.headsearch-select {
  display: flex;
  align-items: center;
  height: 24px;
.el-select {
  width: 0;
  transition:width 0.2s;
  overflow: hidden;
   ::v-deep .el-input__inner {
    padding: 0;
  }
}

.icon-search {
  font-size: 16px;
  height: 40px;
  width:25px;
  cursor: pointer;
 }
 &.show {
   .el-select {
     width: 230px;
     margin-left: 10px;
   }
 }
}





</style>
