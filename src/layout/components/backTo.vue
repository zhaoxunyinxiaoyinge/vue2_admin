<template>
  <div class="back">
    <el-backtop
      target=".el-scrollbar__view"
      :bottom="100"
      :right="60"
      >
      <span class="el-icon-caret-top icon"></span>
      <span class="back-txt">返回顶部</span>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "backTo",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
  .back {
    cursor: pointer;
    position: fixed;
    right:40px;
    bottom:50px;
    width: 50px;
    height: 50px;
    z-index: 20
  }
  .icon {
    font-size: 24px;
    vertical-align: middle;
  }

  .back-txt{
    color:blue;
    font-size: 16px;
  }

</style>
