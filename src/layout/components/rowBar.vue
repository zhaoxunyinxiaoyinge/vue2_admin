<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">vue2后台</el-menu-item>
    <el-menu-item index="2">ecscript最新规范</el-menu-item>
    <el-menu-item index="3">常用数据库</el-menu-item>
    <el-menu-item index="4">HTML5规范</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },

  handleSelect(index){
    console.log(index)
  }

};
</script>

<style lang="scss" soped>
.el-menu-demo {
  .el-submenu__title:hover,
  .el-submenu__title:focus,
  .el-menu-item:focus,
  .el-menu-item:hover,
  .is-active
   {
    background-color: #fff !important;
  }
}
</style>
