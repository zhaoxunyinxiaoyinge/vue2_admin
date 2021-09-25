<template>
  <div>
    <el-submenu>
      <template slot="title"
        ><i class=""></i><span>4444</span></template
      >
      <!-- <side-bar></side-bar> -->
    </el-submenu>

    <el-menu-item > 
      <i class="icon"></i>
      <span slot="title">12233</span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: "sideBar",
  prop: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped ></style>
